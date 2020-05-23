import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { FilterComponent } from '../FilterComponent';

jest.mock('next/router', () => ({ push: () => {} }));

const sampleProps = {
  className: 'withStyles-sc-4wveuc-0 lgzevM',
  query: { gender: 'male', name: 'morty', species: 'Human' },
  title: 'origin',
  data: ['Earth (C-137)', 'unknown', 'Eric Stoltz Mask Eart'],
};

const setUp = props => {
  return shallow(<FilterComponent {...props} />);
};

describe('<FilterComponent />', () => {
  let FilterComponentPage;
  beforeEach(() => {
    FilterComponentPage = setUp(sampleProps);
  });

  test('should render correctly', () => {
    expect(FilterComponentPage).toMatchSnapshot();
  });

  test('cases for rendering filter options', () => {
    const wrapper = setUp(sampleProps);
    const filterOptions = wrapper.find('.filter-options');
    expect(filterOptions).toHaveLength(sampleProps.data.length);
  });
  test('cases for selecting check boxes', () => {
    const wrapper = setUp(sampleProps);
    const event = {
      currentTarget: {
        value: 'Earth (C-137)',
        checked: true,
      },
    };

    const checkBox = wrapper.find('input');
    console.log(checkBox);
    checkBox.map(item => item.simulate('change', event));
  });
});
