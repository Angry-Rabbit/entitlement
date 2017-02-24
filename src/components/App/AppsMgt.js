import React from 'react';
import {connect} from 'dva';
import styles from './AppsMgt.css';
import {config} from '../../utils';
import {Table, Pagination, Popconfirm, Button, Switch} from 'antd';
import {routerRedux} from 'dva/router';
import AppModal from './AppModel';

function AppsMgt({dispatch, list, total, loading, page: current = 1}) {
  function deleteHandler(appID) {
    dispatch({
      type: 'apps/remove',
      payload: {appID}
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/apps',
      query: {page}
    }));
  }

  function editHandler(appID, index, values) {
    dispatch({
      type: 'apps/patch',
      payload: {appID, index, values}
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'apps/create',
      payload: {values}
    });
  }

  function changeAppLockedStatus(appID, index, lockStatus){
    editHandler(appID, index, {status: lockStatus});
  }

  function handlerRefreshAppToken(appID){
    return '=sdjasu2jJS(#Jdjd123452jJdfjasdfkKDSJiejjJJDfjjadf=================fsdjfajsjdfasd;,dfjjjjjjjjjjjjjjjjjasdfID*kJDFJJ=';
  }


  const columnsDef = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '应用名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '令牌',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: '接入状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '开', value: 'normal' },
        { text: '关', value: 'locked' },
      ],
      render: (text, record, index) => (<Switch checkedChildren={'开'} unCheckedChildren={'关'} checked={text==='locked' ? false : true} onChange={changeAppLockedStatus.bind(null, record.id, index)}/>),
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record, index) => (
        <span className={styles.operation}>
          <AppModal record={record} onOk={editHandler.bind(null, record.id, index)} refreshAppToken={handlerRefreshAppToken.bind(null, record.id)}>
            <a>编辑</a>
          </AppModal>
          <span className="ant-divider" />
          <Popconfirm title="确认删除?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <AppModal record={{}} onOk={createHandler} refreshAppToken={handlerRefreshAppToken}>
              <Button type="primary">接入新应用</Button>
          </AppModal>
        </div>

        <Table
          loading={loading}
          columns={columnsDef}
          dataSource={list}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={config.PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {list, page, total} = state.apps;
  return {
    list,
    page,
    total,
    loading: state.loading.models.apps,
  }
}

export default connect(mapStateToProps)(AppsMgt);
