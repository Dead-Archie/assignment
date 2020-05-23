import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { Filter } from '../Filter';

const sampleProps = {
  className: 'withStyles-sc-4wveuc-0 lgzevM',
  query: {
    name: 'morty',
    origin: 'Earth (C-137)',
  },
  data: [
    {
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
  ],
};

const setUp = props => {
  return shallow(<Filter {...props} />);
};

describe('<Filter />', () => {
  let FilterComponent;
  beforeEach(() => {
    FilterComponent = setUp(sampleProps);
  });

  test('should render with out props correctly', () => {
    const wrapper = shallow(<Filter data={null} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly', () => {
    expect(FilterComponent).toMatchSnapshot();
  });
});
