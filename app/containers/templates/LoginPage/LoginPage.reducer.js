import { combineReducers } from 'redux';
import { SET_LOGGED_IN } from './LoginPage.constants';

const initialState = {};

export const loginReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_LOGGED_IN:
      // return state.set('isLoggedIn', payload);
      return {
        ...state,
        isLoggedIn: payload,
      };
    default:
      return state;
  }
};

export default combineReducers({ loginReducer });
