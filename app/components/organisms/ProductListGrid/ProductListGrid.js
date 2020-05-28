import React from 'react';
import PropTypes from 'prop-types';
import { ImageVanilla as Image } from '@xt-pagesource/atomic-react-pattern-lib';
import withStyles from '../../../lib/withStyles';
import styles from './ProductListGrid.style';

class ProductListGrid extends React.Component {
  renderSections = (key, values) => {
    return (
      <div className="product-row">
        <div className="product-key">{key}</div>
        <div className="product-value">{values}</div>
      </div>
    );
  };

  render() {
    const { product, className, queryOrigin } = this.props;
    const { id, name, status, species, gender, origin, location, image } = product;
    const productArry = [
      { Status: status },
      { Species: species },
      { Gender: gender },
      { Origin: origin.name || '' },
      { 'Last Location': location.name || '' },
    ];

    if (queryOrigin && queryOrigin !== origin.name) {
      return false;
    }
    return (
      <div className={`${className} col-6-small`}>
        <div className="container-Background">
          <div className="image-container">
            <Image src={image} className="product-image" />
            <div className="product-name">
              <div className="product-title">{name}</div>
              <span>{`ID :${id}`}</span>
            </div>
          </div>
          <div className="info-container">
            {productArry.map(item => {
              return (
                <div className="product-container">
                  {this.renderSections(Object.keys(item)[0], item[Object.keys(item)[0]])}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ProductListGrid.propTypes = {
  product: PropTypes.shape([]),
  className: PropTypes.string,
  queryOrigin: PropTypes.string,
};

ProductListGrid.defaultProps = {
  product: [],
  className: '',
  queryOrigin: '',
};

export default withStyles(ProductListGrid, styles);
export { ProductListGrid };
