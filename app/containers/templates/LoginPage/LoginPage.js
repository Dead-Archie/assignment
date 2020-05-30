import React from 'react';
import enhance from '../../../lib/dynamicStore';
import LoginComponent from '../../../components/templates/LoginComponent';
import { setLoginStatus } from './LoginPage.actions';
import reducer from './LoginPage.reducer';

const LoginPage = props => <LoginComponent {...props} />;

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  isLoggedin: payload => {
    dispatch(setLoginStatus(payload));
  },
});

export default enhance(LoginPage, {
  mapStateToProps,
  mapDispatchToProps,
  reducer,
  key: 'LoginPage',
});
