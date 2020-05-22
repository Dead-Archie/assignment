import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { ProductListing } from '../ProductListing';

jest.mock('next/router', () => ({ push: () => {} }));

const sampleProps = {
  className: 'withStyles-sc-4wveuc-0 lgzevM',
  query: {
    name: 'morty',
    origin: 'Earth (C-137)',
  },
  data: [
    {
      name: 'Morty Smith',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortya' },
      species: 'Human',
      status: 'Alive',
      type: '',
    },
  ],
};

const setUp = props => {
  return shallow(<ProductListing {...props} />);
};

describe('<ProductListing />', () => {
  let ProductListingPageComponent;
  beforeEach(() => {
    ProductListingPageComponent = setUp(sampleProps);
  });

  test('should render with out props correctly', () => {
    const wrapper = shallow(<ProductListing />);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly', () => {
    expect(ProductListingPageComponent).toMatchSnapshot();
  });
  test('check state', () => {
    const wrapper = setUp();
    const checkState = wrapper.state('productList');
    expect(checkState).toEqual([]);
  });
  test('search ref define  ', () => {
    const wrapper = setUp();
    expect(wrapper.instance().searchRef).toEqual({ current: null });
  });
  test('sort ref define  ', () => {
    const wrapper = setUp();
    expect(wrapper.instance().sortRef).toEqual({ current: null });
  });

  test('onclick Button ', () => {
    const wrapper = setUp();
    const searchButton = wrapper.find('.search-btn');
    wrapper.instance().searchRef = {
      current: {
        value: null,
      },
    };
    searchButton.simulate('click');
    expect(wrapper.instance().searchRef).toBeTruthy();
  });

  test('onchange sort Button ', () => {
    const wrapper = setUp();
    const sortButton = wrapper.find('.sort-selector');
    wrapper.instance().sortRef = {
      current: {
        value: null,
      },
    };
    sortButton.simulate('change');
    expect(wrapper.instance().sortRef).toBeTruthy();
  });

  test('if ProductList has values', () => {
    const wrapper = setUp();
    const ProductListGridComp = wrapper.find('ProductListGrid');
    expect(ProductListGridComp).toHaveLength(0);
  });

  test('onclick removePils Button ', () => {
    const wrapper = setUp();
    const removePils = wrapper.find('.filter-pills');
    expect(removePils).toHaveLength(1);
    removePils.simulate('click');
  });
});
