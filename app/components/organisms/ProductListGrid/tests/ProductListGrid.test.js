import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { ProductListGrid } from '../ProductListGrid';

const sampleProps = {
  className: 'withStyles-sc-4wveuc-0 lgzevM',
  queryOrigin: '',
  product: {
    gender: 'male',
    name: 'Morty Smith',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    species: 'Human',
    status: 'Alive',
    type: '',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
  },
};
const setUp = props => {
  return shallow(<ProductListGrid {...props} />);
};

describe('<ProductListGrid />', () => {
  let ProductListGridPageComponent;
  beforeEach(() => {
    ProductListGridPageComponent = setUp(sampleProps);
  });

  test('should render correctly', () => {
    expect(ProductListGridPageComponent).toMatchSnapshot();
  });
});
