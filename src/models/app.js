import {logout} from '../services/app';

export default {
  namespace: 'app',
  state: {
    login: false,
    siderCollapsed: false,
    user: {
      name: 'HeFan',
    },
  },
  effects: {
    *switchSider({payload: collapsed}, {put}){
      yield put({
        type: 'handleSwitchSider',
        payload: collapsed,
      });
    },
    *logout({call, put}){
      yield call(logout);
      yield put({
        type: 'logoutSuccess',
      });
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
        login: false,
        user: null,
      }
    },
  },

  subscriptions: {},
};
