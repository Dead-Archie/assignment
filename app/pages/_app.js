import React from 'react';
import App from 'next/app';

import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import initializeTrackerConfig from '../global/AnalyticsTracking';

initializeTrackerConfig();

// apollo client setup
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3002/grpahql',
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  // eslint-disable-next-line
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default MyApp;
