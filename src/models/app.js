import {logout, login} from '../services/app';
import {message} from 'antd';

export default {
  namespace: 'app',
  state: {
    isLogin: false,
    siderCollapsed: false,
    captchaSrc: null,
    isNeedCaptcha: false,
    loading: false,
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
      const {account, password, captcha} = payload;
      try {
        yield put({type: 'showLoginButtonLoading'});
        const {data} = yield call(login, account, password, captcha);
        if (data) {
          yield put({
            type: 'loginSuccess',
            payload: data
          });
        }
      } catch (error) {
        const {data} = yield error.response.json().then(data => ({data}));
        message.error(data['message'], 5);

        var captchaSrc = data['captcha.api'];
        const isNeedCaptcha = !!captchaSrc;
        yield put({
          type: 'authFailure',
          payload: {
            isNeedCaptcha,
            captchaSrc: captchaSrc + '?' + new Date().getTime(),
          }
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
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      return {
        ...state,
        isLogin: true,
        loginButtonLoading: false,
      }
    },
    authFailure(state, {payload}){
      const {isNeedCaptcha, captchaSrc} = payload;
      return {
        ...state,
        isNeedCaptcha,
        captchaSrc,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
  },

  subscriptions: {},
};
