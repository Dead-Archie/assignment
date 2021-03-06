const express = require('express');
const next = require('next');
const { parse } = require('url');
const { join } = require('path');
const compression = require('compression');
const { spawn } = require('child_process');
const device = require('express-device');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const graphQlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const { MACHINE_IP, PORT, IS_CACHE_ENABLED, NODE_ENV } = require('./config/appConfig');
// const { isStaticUrl, parseStaticUrl } = require('./utils/staticVersioning'); eslint-disable-line
const apiCacheMiddlewareObj = require('./middlewares/pageCache');

const {
  ENV_PRODUCTION,
  SERVICE_WORKER_FILE,
  API_PROXY_PATH,
  CLEAR_SERVICES_CACHE,
  HEALTH_CHECK,
  GET_CACHE_INDEX,
} = require('../isomorphic/constants');

const routes = require('./routes');
const apiProxy = require('./utils/apiProxy');
const requestTime = require('./utils/perfCalc');
const checkDirectory = require('./utils/checkDirectory');
const getPerfLoggerFactory = require('./utils/perfLogger');

const blackListUrls = [
  '/static/',
  '/fonts/',
  '/_next/',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  '/service-worker.js',
];

// Security level configurations using the helmet module
// TODO: Finalize on the list of configurations
const helmetConfig = {
  contentSecurityPolicy: false, // Temporary removing this policy
  noCache: false,
  ieNoOpen: false,
  noSniff: false,
  hidePoweredBy: true,
};

const app = next({
  dev: process.env.NODE_ENV !== ENV_PRODUCTION,
  dir: './app',
});

process.on('unhandledRejection', err => {
  /* eslint-disable-next-line no-console */
  console.log('Unhandled rejection:', err);
});

const cleanupPerfLogger = req => {
  if (req.perfLoggerEnabled) {
    req.perfLogger.log(
      'error',
      `[PERFLOG] [PAGE] Method: ${req.method} URL: ${req.url} Elapsed Time: ${Date.now() -
        req.startTime}ms`
    );

    req.perfLoggerEnabled = false;
    req.perfLogger.close();
    /* eslint-disable-next-line no-console */
    console.log(`[PERFLOGGER] - CLOSED - ${req.url}`);
  }
};

// Code for making the synchronous call to the session API to make
// sure there is no duplication for session IDs at the ATG layer
const handler = routes.getRequestHandler(app, async ({ req, res, route, query }) => {
  app
    .render(req, res, route.page, query)
    .then(() => {
      cleanupPerfLogger(req);
    })
    .catch(err => {
      /* eslint-disable-next-line no-console */
      console.log(err);
      cleanupPerfLogger(req);
    });
});

app.prepare().then(() => {
  const server = express();
  server.use(
    '/grpahql',
    graphQlHTTP({
      schema,
      graphiql: true,
    })
  );
  server
    // Parse cookies from request object
    .use(cookieParser())

    // Proxy the request to API_PROXY_PATH - to the actual domain
    .use(API_PROXY_PATH, apiProxy)

    // Add perflogger to request object in order to share the same instance
    .use((req, res, nextMiddleware) => {
      let isStaticPath = false;

      blackListUrls.forEach(path => {
        if (req.url.indexOf(path) !== -1) {
          isStaticPath = true;
        }
      });

      if (!isStaticPath) {
        /* eslint-disable-next-line no-console */
        console.log(`[PERFLOGGER] - OPEN - ${req.url}`);
        req.perfLoggerEnabled = true;
        req.perfLogger = getPerfLoggerFactory({ sessionId: req.cookies.JSESSIONID });
      }
      nextMiddleware();
    })

    // Request time calculation
    .use(requestTime)

    // Enable compression on response
    .use(compression())

    // Security configurations
    .use(helmet(helmetConfig))

    // Capture the device type
    .use(
      device.capture({
        unknownUserAgentDeviceType: 'desktop', // default to DESKTOP when user agent is unrecognized
      })
    );

  // Health check route for load balanacer
  server.get(HEALTH_CHECK, (req, res) => {
    res.send({
      success: true,
    });
  });

  server.get(GET_CACHE_INDEX, (req, res) => {
    apiCacheMiddlewareObj.getCacheIndex(res);
  });

  // Expose API to clear the cache for services configured
  server.get(`${CLEAR_SERVICES_CACHE}:target?`, (req, res) => {
    try {
      if (IS_CACHE_ENABLED) {
        apiCacheMiddlewareObj.bustPageCache(req.params.target);
      }
    } catch (err) {
      res.send({
        success: false,
        error: err,
      });
      return;
    }
    res.send({ success: true });
  });

  /**
   * Cache pages as per AppConfig
   */
  if (IS_CACHE_ENABLED && NODE_ENV === 'production') {
    apiCacheMiddlewareObj.excludeRequestsFromNodeCache(server);
    apiCacheMiddlewareObj.cachePages(server, handler);
  }

  // Handle all other requests as page / static requests
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);

    const { pathname } = parsedUrl;

    // remove build if static
    // if (isStaticUrl(req.url) && process.env.NODE_ENV === ENV_PRODUCTION) {
    //   [req.url] = parseStaticUrl(req.url).split('?');
    //   const filePath = join(__dirname, '../.next/dist', req.url);
    // eslint-disable-next-line
    //   res.sendFile(filePath);
    //   return;
    // }

    if (pathname === SERVICE_WORKER_FILE) {
      const filePath = join(__dirname, '../.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handler(req, res, parsedUrl);
    }
  });

  /* eslint-disable no-console */
  const serve = server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://${MACHINE_IP}:${PORT}`);

    if (process.argv.indexOf('--report') !== -1) {
      console.log('Lighthouse is analysing the app.....');
      checkDirectory('reports/lighthouse/', true);
      spawn(
        'node',
        [
          './node_modules/lighthouse/lighthouse-cli',
          `http://${MACHINE_IP}:${PORT}`,
          '--output-path=reports/lighthouse/report.html',
        ],
        { stdio: 'inherit' }
      ).on('exit', code => {
        console.log(`Lighthouse exited with code ${code.toString()}`);
        console.log(`Closing down app server on port ${PORT}`);
        serve.close('SIGTERM');
        process.exit(0);
      });
    }
  });
  /* eslint-enable no-console */
});
