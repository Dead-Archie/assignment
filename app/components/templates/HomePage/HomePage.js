// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../Layout';
import HeadTag from '../../atoms/HeadTag';
import TopBanner from '../../molecules/TopBanner';
import ProductListing from '../../organisms/ProductListing';
import Filter from '../../organisms/Filter';
import withStyles from '../../../lib/withStyles';
import styles from './HomePage.style';
import { queryParamStr } from '../../../utils/utils';

const HomePage = ({ editorialData, globalData, loginData }: Props): Node => {
  const { title, subTitle } = editorialData;
  const { pageQuery } = globalData;
  const { isLoggedIn } = loginData || '';
  const [urlParams, setUrlParams] = useState('');
  const getUsersParamQuery = gql`
    {
      usersWithParams(params: "${urlParams}") {
        id
        name
        species
        gender
        type
        image
        status
        origin {
          name
          url
        }
        location {
          name
        }
      }
    }
  `;

  const { data } = useQuery(getUsersParamQuery);
  const { usersWithParams } = data || '';

  const Router = useRouter();
  const { query } = Router;

  useEffect(() => {
    console.log(query);
    console.log(pageQuery);
    const qryParam = queryParamStr(pageQuery);

    setUrlParams(qryParam);
    if (!isLoggedIn) {
      Router.push(`/`);
    }
  }, [pageQuery]);

  return (
    <Layout title="home" className="row" id="content-wrapper">
      <HeadTag title="Product Listing Page" />
      <TopBanner title={title} subTitle={subTitle} />
      <section className="wrapper">
        <div className="inner">
          <div className="row">
            <div className="col-2 col-12-small">
              <Filter data={usersWithParams} query={pageQuery} />
            </div>
            <div className="col-10 col-12-small">
              <ProductListing data={usersWithParams} query={pageQuery} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

HomePage.defaultProps = {
  seoData: {
    description: 'Product Listing Page',
    title: 'Product Listing',
  },
  editorialData: {},
  globalData: {},
};

export default withStyles(HomePage, styles);
export { HomePage };
