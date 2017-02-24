import * as appsService from '../services/apps';

export default {
  namespace: 'apps',
  state: {
    total: null,
    page: null,
    list: [],
  },
  effects: {
    *fetch({payload: {appID}}, {call, put}){
      const {data} = yield call(appsService.fetch, {appID});
      yield put({
        type: 'save',
        payload: {
          data,
          total,
          page,
        }
      });
    },

    *list({payload: {page = 1}}, {call, put}){
      const {data} = yield call(appsService.list, {page});
      yield put({
        type: 'save',
        payload: {
          data: data.data,
          total: parseInt(data.total, 10),
          page: parseInt(page, 10),
        }
      });
    },

    *create({payload: {appInfo}}, {call, put}){
      yield put({type: 'reload'});
    },

    *patch({payload: {appID, index, values}}, {call, put}){
      yield call(appsService.patch, appID, values);
      const {data} = yield call(appsService.fetch, appID);
      yield put({type: 'modifySuccess', payload: {index, data}});
    },

    *remove({payload: {appID}}, {call, put}){
      yield call(appsService.remove, appID);
      yield put({type: 'reload'});
    },

    *reload(action, {select, put}){
      const page = yield select(state => state.apps.page);
      yield put({type: 'list', payload: {page}});
    },
  },
  reducers: {
    save(state, {payload: {data:list, total, page}}){
      return {
        ...state,
        list,
        total,
        page
      }
    },
    modifySuccess(state, {payload: {index, data}}){
      const {list} = state;
      list[index] = data;
      return {
        ...state,
        list
      }
    }

  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/apps') {
          dispatch({type: 'list', payload: query});
        }
      });
    },
  },
};
