import React from 'react';
import {connect} from 'dva';
import styles from './App.less';
import {Layout, Menu, Breadcrumb, Icon, Affix} from 'antd';
import Menus from '../components/Layout/Menus';
import Bread from '../components/Layout/Bread';
import config from '../utils/config';
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

function App({children, location, dispatch, app}) {
  const {siderCollapsed} = app;
  const siderProps = {
    location: location,
    siderFold: siderCollapsed,
  };

  function onCollapse(collapsed) {
    dispatch({
      type: 'app/switchSider',
      payload: collapsed,
    });
  }


  return (
    <div className={styles.normal}>
      <Layout className={styles.ant_layout}>
        <Sider collapsible onCollapse={onCollapse} collapsed={siderCollapsed}>
          <div className={styles.logo}>
            <img src={config.logoSrc}/>
            {siderCollapsed ? '' : <span>{config.logoText}</span>}
          </div>
          <Menus {...siderProps} />
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}/>
          <Content style={{margin: '0 16px'}}>
            <Bread location={location}/>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              {children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}


export default connect(({app}) => ({app}))(App);
