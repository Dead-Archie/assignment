// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../Layout';
import HeadTag from '../../atoms/HeadTag';
import TopBanner from '../../molecules/TopBanner';
import ProductListing from '../../organisms/ProductListing';
import Filter from '../../organisms/Filter';
import withStyles from '../../../lib/withStyles';
import styles from './HomePage.style';
import { queryParamStr } from '../../../utils/utils';

const API = 'https://rickandmortyapi.com/api/character/';

const HomePage = ({ editorialData, globalData }: Props): Node => {
  const { title, subTitle } = editorialData;
  const { pageQuery } = globalData;
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const Router = useRouter();
  const { query } = Router;

  useEffect(() => {
    console.log(query);
    console.log(pageQuery);
    const qryParam = queryParamStr(pageQuery);
    axios(`${API}?${qryParam}`, {
      method: 'GET',
    })
      .then(res => res.data)
      .then(response => {
        setItems(response.results);
        setLoading(false);
      })
      .catch(() => {
        setItems('');
        setLoading(false);
      });
  }, [pageQuery]);

  return (
    <Layout title="home" className="row" id="content-wrapper">
      <HeadTag title="Product Listing Page" />
      <TopBanner title={title} subTitle={subTitle} />
      <section className="wrapper">
        {!isLoading && (
          <div className="inner">
            <div className="row">
              <div className="col-2 col-12-small">
                <Filter data={items} query={pageQuery} />
              </div>
              <div className="col-10 col-12-small">
                <ProductListing data={items} query={pageQuery} />
              </div>
            </div>
          </div>
        )}
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
