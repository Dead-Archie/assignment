import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { FeatureBanner } from '../FeatureBanner';

const sampleProps = {
  className: 'withStyles-sc-4wveuc-0 lgzevM',
  heading: 'Heading Test',
  subheading: 'Sub Heading Test',
};
const setUp = props => {
  return shallow(<FeatureBanner {...props} />);
};

describe('<FeatureBanner />', () => {
  let FeatureBannerComponent;
  beforeEach(() => {
    FeatureBannerComponent = setUp(sampleProps);
  });

  test('should render correctly', () => {
    expect(FeatureBannerComponent).toMatchSnapshot();
  });
});
