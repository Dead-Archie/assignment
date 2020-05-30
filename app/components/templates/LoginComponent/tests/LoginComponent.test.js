import React from 'react';
import { shallow } from 'enzyme';

import { LoginComponent } from '../LoginComponent';

jest.mock('next/router', () => ({ push: () => {} }));

const sampleProps = {
  className: 'withStyles-sc-4wveuc-0 lgzevM',
  isLoggedin: () => {},
};

const setUp = props => {
  return shallow(<LoginComponent {...props} />);
};

describe('<LoginComponent />', () => {
  let LoginComponentTest;
  beforeEach(() => {
    LoginComponentTest = setUp(sampleProps);
  });

  test('should render correctly', () => {
    expect(LoginComponentTest).toMatchSnapshot();
  });
  test('check state', () => {
    const wrapper = setUp();
    const checkState = wrapper.state('isRegistered');
    expect(checkState).toEqual(true);
  });
  test('email ref define  ', () => {
    const wrapper = setUp();
    expect(wrapper.instance().email).toEqual({ current: null });
  });
  test('password ref define  ', () => {
    const wrapper = setUp();
    expect(wrapper.instance().password).toEqual({ current: null });
  });

  test('onclick Button : login btn', () => {
    const wrapper = setUp();
    const LoginBtn = wrapper.find('.login-btn');

    wrapper.instance().email = {
      current: {
        value: null,
      },
    };
    wrapper.instance().password = {
      current: {
        value: null,
      },
    };
    LoginBtn.simulate('click');
    expect(wrapper.instance().email).toBeTruthy();
    expect(wrapper.instance().password).toBeTruthy();
  });

  test('onclick Button : registration btn', () => {
    const wrapper = setUp();

    wrapper.setState({ isRegistered: false });
    const registrationButton = wrapper.find('.registration-btn');
    expect(registrationButton).toHaveLength(1);
    wrapper.instance().email = {
      current: {
        value: null,
      },
    };
    wrapper.instance().password = {
      current: {
        value: null,
      },
    };
    registrationButton.simulate('click');
    expect(wrapper.instance().email).toBeTruthy();
    expect(wrapper.instance().password).toBeTruthy();
  });

  test('onclick Button : clear Data', () => {
    const wrapper = setUp();
    const clearData = wrapper.find('.txt2');

    wrapper.instance().email = {
      current: {
        value: null,
      },
    };
    wrapper.instance().password = {
      current: {
        value: null,
      },
    };
    clearData.simulate('click');
    expect(wrapper.instance().email).toBeTruthy();
    expect(wrapper.instance().password).toBeTruthy();
  });
});
