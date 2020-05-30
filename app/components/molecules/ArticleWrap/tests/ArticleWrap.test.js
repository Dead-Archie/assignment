import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { ArticleWrap } from '../ArticleWrap';

const sampleProps = {
  title: 'test',
  children: [],
  isLeft: true,
  subtitle: 'test',
};
const setUp = props => {
  return shallow(<ArticleWrap {...props} />);
};

describe('<ArticleWrap />', () => {
  let ArticleWrapComponent;
  beforeEach(() => {
    ArticleWrapComponent = setUp(sampleProps);
  });

  test('should render correctly', () => {
    expect(ArticleWrapComponent).toMatchSnapshot();
  });
});
