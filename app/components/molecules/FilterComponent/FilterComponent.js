import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { queryParamStr } from '../../../utils/utils';

// eslint-disable-next-line react/prefer-stateless-function
class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.queryString = [];
    this.state = {};
  }

  handleChangeCheckbox = event => {
    const { title, query } = this.props;
    const text = event.currentTarget.value;
    const isCheked = event.currentTarget.checked;

    if (isCheked && text) {
      query[title] = text;
    }
    // }
    const queryStr = queryParamStr(query);

    if (queryStr) {
      Router.push(`/?${queryStr}`);
    } else {
      Router.push(`/`);
    }
  };

  render() {
    const { data, title, query } = this.props;
    return (
      <div>
        <h4>{title}</h4>
        {data.map((item, index) => {
          return (
            <div className="filter-options">
              <input
                type="radio"
                id={`${title}_${index}`}
                value={item}
                onChange={event => this.handleChangeCheckbox(event)}
                checked={query[title] === item}
                name={title}
              />
              <label htmlFor={`${title}_${index}`}>{item}</label>
            </div>
          );
        })}
      </div>
    );
  }
}

FilterComponent.propTypes = {
  data: PropTypes.shape([]),
  title: PropTypes.string,
  query: PropTypes.shape({}),
};
FilterComponent.defaultProps = {
  data: [],
  title: '',
  query: {},
};

export default FilterComponent;
export { FilterComponent };
