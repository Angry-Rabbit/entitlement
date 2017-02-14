export default {
  namespace: 'app',
  state: {
    login: false,
    siderCollapsed: false,
  },
  effects: {
    *switchSider({payload: collapsed}, {put}){
      yield put({
        type: 'handleSwitchSider',
        payload: collapsed,
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
  },
  subscriptions: {},
};
