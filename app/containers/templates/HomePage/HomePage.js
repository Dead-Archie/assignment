// @flow

import get from 'lodash/get';
import enhance from '../../../lib/dynamicStore';
import initialActions from './HomePage.actions';
import saga from './HomePage.saga';
import reducer from './HomePage.reducer';

import HomePage from '../../../components/templates/HomePage';

const mapStateToProps = state => ({
  editorialData: get(state, ['homePage', 'layout', 'editorialData']),
  globalData: get(state, ['global', 'globalData']),
  loginData: get(state, ['LoginPage', 'loginReducer']),
});

export default enhance(HomePage, {
  mapStateToProps,
  saga,
  reducer,
  key: 'homePage',
  initialActions,
});
