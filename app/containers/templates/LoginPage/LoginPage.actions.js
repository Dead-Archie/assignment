import { SET_LOGGED_IN } from './LoginPage.constants';

// eslint-disable-next-line import/prefer-default-export
export const setLoginStatus = payload => {
  return {
    type: SET_LOGGED_IN,
    payload,
  };
};
