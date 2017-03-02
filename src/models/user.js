import * as userService from '../services/user';

export default {
  namespace: 'user',
  state: {
    list: [],
    total: null,
    page: null,
    area: null,
  },
  effects: {
    *fetch({payload: {page}}, {call, put}){
      const {data, total} = yield call(userService.list, page);
      put({
        type: 'save',
        payload: {data, page, total}
      });
    },


    *create({payload: {values}}, {call, put}){
      yield call(userService.create, values);
      put({type: 'reload'});
    },

    *patch({payload: {uid, index: rowIndex, values}}, {call, put}){
      yield call(userService.edit, uid, values);
      const {data} = yield call(userService.get, uid)
      yield put({type: 'modifiedSuccess', payload: {rowIndex, data}})
    },

    *remove({payload: {uid}}, {call, put}){
      yield call(userService.delele, uid);
      put({type: 'reload'});
    },

    *reload(action, {put}){
      const page = yield select(state => state.user.page);
      yield put({type: 'fetch', payload: {page}});
    }
  },
  reducers: {
    save(state, {payload: {data: list, total, page}}){
      return {
        ...state,
        list,
        page,
        total,
      }
    },

    modifiedSuccess(state, {payload: {rowIndex, data}}){
      const {list} = state;
      list[rowIndex] = data;
      return {
        ...state,
        list,
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/users') {
          dispatch({type: 'list', payload: query});
        }
      });
    },
  },
};
