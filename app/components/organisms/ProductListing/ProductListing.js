import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import ProductListGrid from '../ProductListGrid';
import { queryParamStr } from '../../../utils/utils';
import withStyles from '../../../lib/withStyles';
import styles from './ProductListing.style';

// eslint-disable-next-line react/prefer-stateless-function
class ProductListing extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.sortRef = React.createRef();
    this.state = {
      productList: props.data,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { data: currentData } = this.props;
    const { productList } = prevState;
    const { value } = this.sortRef.current;

    if (productList !== currentData && currentData) {
      if (value === 'dsnd') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          productList: currentData.sort((a, b) => b.id - a.id),
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          productList: currentData.sort((a, b) => a.id - b.id),
        });
      }
    }
  }

  removePils = name => {
    const { query } = this.props;
    delete query[name];
    const queryStr = queryParamStr(query);

    Router.push(`/dashboard?${queryStr}`);
  };

  filterPils = name => {
    if (name === 'name') {
      return false;
    }
    const { query } = this.props;
    const filterPill = query[name];
    return (
      <button className="filter-pills" onClick={() => this.removePils(name)}>
        {filterPill}
      </button>
    );
  };

  getSortedValue = () => {
    const { value } = this.sortRef.current;
    const { productList } = this.state;
    if (value === 'dsnd') {
      this.setState({
        productList: productList.sort((a, b) => b.id - a.id),
      });
    } else {
      this.setState({
        productList: productList.sort((a, b) => a.id - b.id),
      });
    }
  };

  getValue = () => {
    const { query } = this.props;
    const { value } = this.searchRef.current;
    if (value) {
      query.name = value;
    }
    const queryStr = queryParamStr(query);

    Router.push(`/dashboard?${queryStr}`);
  };

  render() {
    const { query, className } = this.props;
    const { productList } = this.state;
    return (
      <div className={`${className} row`}>
        <div className="col-12">
          <h3>Selected Filters</h3>
          {query &&
            Object.keys(query).map(filter => {
              return this.filterPils(filter);
            })}
        </div>
        <div className="row" style={{ width: '100%' }}>
          <div className="col-9 col-12-small">
            <input
              type="text"
              placeholder="Search by Name"
              ref={this.searchRef}
              className="search-Box"
            />
            <button className="search-btn" onClick={this.getValue}>
              Search
            </button>
          </div>
          <div className="col-3 col-12-small">
            <select className="sort-selector" ref={this.sortRef} onChange={this.getSortedValue}>
              <option value="">Sort By ID</option>
              <option value="asnd">Ascesnding</option>
              <option value="dsnd">Descending</option>
            </select>
          </div>
        </div>
        <div className="row">
          {productList &&
            productList.map(item => {
              return <ProductListGrid key={item.id} product={item} queryOrigin={query.origin} />;
            })}
          {!productList && <div>NO results found.</div>}
        </div>
      </div>
    );
  }
}

ProductListing.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape([]),
  query: PropTypes.shape({
    name: PropTypes.string,
    origin: PropTypes.string,
  }),
};
ProductListing.defaultProps = {
  className: '',
  data: [],
  query: {
    name: '',
    origin: '',
  },
};

export default withStyles(ProductListing, styles);
export { ProductListing };
