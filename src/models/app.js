import {logout, login} from '../services/app';
import {message} from 'antd';

export default {
  namespace: 'app',
  state: {
    isLogin: false,
    siderCollapsed: false,
    user: {
      name: 'HeFan',
      permissions: [],
      menus: []
    },
  },
  effects: {
    *switchSider({payload: collapsed}, {put}){
      yield put({
        type: 'handleSwitchSider',
        payload: collapsed,
      });
    },
    *logout(action, {call, put}){
      yield call(logout);
      yield put({
        type: 'logoutSuccess',
      });
    },
    *login({payload}, {call, put}){
      const {account, password, jcaptcha} = payload;
      const {data} = yield call(login, account, password, jcaptcha);
      if (!!data) {
        yield put({
          type: 'loginSuccess',
          payload: data
        });
      }
    }
  },
  reducers: {
    handleSwitchSider (state, {payload: collapsed}) {
      localStorage.setItem('antdAdminSiderFold', collapsed)
      return {
        ...state,
        siderCollapsed: collapsed
      }
    },
    logoutSuccess (state){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      return {
        ...state,
        isLogin: false,
        user: null,
      }
    },
    loginSuccess(state, {payload}){
      const {userInfo, access_token, refresh_token} = payload;
      debugger;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      return {
        ...state,
        isLogin: true
      }
    }
  },

  subscriptions: {},
};
