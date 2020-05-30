import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';

import * as nextRouter from 'next/router';
import { HomePage } from '../HomePage';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

jest.mock('next/router', () => ({ push: () => {} }));

const MY_QUERY = gql(`
    {
      usersWithParams(params: "") {
        id
        name
        species
        gender
        type
        image
        status
        origin {
          name
          url
        }
        location {
          name
        }
      }
    }
  `);

const MOCKS = [
  {
    request: {
      query: MY_QUERY,
      // variables,
    },
    // result,
  },
];

const sampleProps = {
  editorialData: {
    title: 'Test Title',
    banner: 'Test Banner',
  },
  globalData: {
    activeRegion: '',
    deviceType: 'desktop',
    isTablet: false,
    pageOrigin: 'http://localhost:3002',
    pageQuery: {},
    pageUrl: '/',
    route: '/dashboard',
    labels: {
      title: 'Universal React',
      subTitle: 'Boilerplate for for universal React Applications.',
    },
  },
  loginData: {
    isLoggedIn: true,
  },
};

const setUp = props => {
  return shallow(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <HomePage {...props} />
    </MockedProvider>
  );
};

describe('HomePage component', () => {
  let homePageComponent;
  beforeEach(() => {
    homePageComponent = setUp(sampleProps);
  });
  test('should render correctly', () => {
    expect(homePageComponent).toMatchSnapshot();
  });
});
