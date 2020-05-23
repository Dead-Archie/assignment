/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import FilterComponent from '../../molecules/FilterComponent';

class Filter extends React.Component {
  getSpecies = () => {
    const { data } = this.props;
    const speciesObj = {};
    // eslint-disable-next-line array-callback-return
    data.map(value => {
      const { species } = value;
      if (!speciesObj[species]) {
        speciesObj[species] = '';
      }
    });
    return Object.keys(speciesObj);
  };

  getOrigin = () => {
    const { data } = this.props;
    const originObj = {};
    // eslint-disable-next-line array-callback-return
    data.map(value => {
      const {
        origin: { name },
      } = value;
      if (!originObj[name]) {
        originObj[name] = '';
      }
    });
    return Object.keys(originObj);
  };

  render() {
    const { data } = this.props;
    if (!data) return null;
    const speciesMap = this.getSpecies();
    const originMap = this.getOrigin();
    const { query } = this.props;
    return (
      <div>
        <h3>Filters</h3>
        {speciesMap && <FilterComponent data={speciesMap} title="species" query={query} />}
        <FilterComponent data={['male', 'female']} title="gender" query={query} />
        {originMap && <FilterComponent data={originMap} title="origin" query={query} />}
      </div>
    );
  }
}

Filter.propTypes = {
  data: PropTypes.shape([]),
  query: PropTypes.shape({}),
};
Filter.defaultProps = {
  data: [],
  query: {},
};

export default Filter;
export { Filter };
