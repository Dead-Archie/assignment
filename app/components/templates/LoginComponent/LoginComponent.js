import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import withStyles from '../../../lib/withStyles';
import styles from './LoginComponent.style';

class LoginComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();

    this.state = {
      isRegistered: true,
    };
  }

  checkValidUser = () => {
    const { isLoggedin } = this.props;
    const { value: email } = this.email.current;
    const { value: password } = this.password.current;
    if (email && password) {
      const storedEmail = localStorage.getItem('email', email);
      const storedPassword = localStorage.getItem('password', password);
      if (email === storedEmail && password === storedPassword) {
        isLoggedin(true);
        Router.push(`/dashboard`);
      } else {
        alert('invalid Credentials');
      }
    } else {
      alert('email & password is mandetory');
    }
  };

  clearData = () => {
    this.setState({ isRegistered: false });
    this.email.current.value = '';
    this.password.current.value = '';
  };

  registerData = () => {
    const { value: email } = this.email.current;
    const { value: password } = this.password.current;
    if (email && password) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      alert(' You are sucessfuly Registered, Please login now.');
      this.setState({ isRegistered: true });
      this.email.current.value = '';
      this.password.current.value = '';
    } else {
      alert('email & password is mandetory');
    }
  };

  render() {
    const { className } = this.props;
    const { isRegistered } = this.state;
    return (
      <div className={className}>
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="wrap-input100 ">
              <input
                className="input100"
                placeholder="Email"
                type="text"
                name="email"
                ref={this.email}
              />
            </div>

            <div className="wrap-input100 ">
              <input
                className="input100"
                placeholder="Password "
                type="password"
                name="pass"
                ref={this.password}
              />
            </div>
            {isRegistered && (
              <div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn" onClick={() => this.checkValidUser()}>
                      Login
                    </button>
                  </div>
                </div>

                <div className="text-center p-t-115">
                  <span className="txt1">Don’t have an account?</span>

                  <button className="txt2" onClick={() => this.clearData()}>
                    Sign Up
                  </button>
                </div>
              </div>
            )}
            {!isRegistered && (
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn" onClick={() => this.registerData()}>
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  className: PropTypes.string,
  isLoggedin: PropTypes.func,
};
LoginComponent.defaultProps = {
  className: '',
  isLoggedin: () => {},
};

export default withStyles(LoginComponent, styles);
export { LoginComponent };
