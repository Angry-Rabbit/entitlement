import React from 'react';
import {connect} from 'dva';
import styles from './App.less';
import {Layout} from 'antd';
import Menus from '../components/Layout/Menus';
import Bread from '../components/Layout/Bread';
import Header from '../components/Layout/Header'
import config from '../utils/config';
import Login from './Login';
const {Content, Footer, Sider} = Layout;

function App({children, location, dispatch, app}) {
  const {siderCollapsed, user, loading, loginButtonLoading, isLogin, isNeedCaptcha, captchaSrc} = app;
  const loginProps = {
    isNeedCaptcha,
    captchaSrc,
    loading,
    loginButtonLoading,
    onOk(data){
      dispatch({type: 'app/login', payload: data})
    },
  }


  const headerProps = {
    user,
    logout () {
      dispatch({type: 'app/logout'})
    }
  };

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
      {!isLogin ? <Login {...loginProps}/> :
        <Layout className={styles.ant_layout}>
          <Sider collapsible onCollapse={onCollapse} collapsed={siderCollapsed}>
            <div className={styles.logo}>
              <img src={config.logoSrc}/>
              {siderCollapsed ? '' : <span>{config.logoText}</span>}
            </div>
            <Menus {...siderProps} />
          </Sider>
          <Layout>
            <Header {...headerProps} />
            <Content style={{margin: '0 16px'}}>
              <Bread location={location}/>
              <div style={{padding: 8, background: '#fff', minHeight: 360}}>
                {children}
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              {config.copyright}
            </Footer>
          </Layout>
        </Layout>}
    </div>
  );
}


export default connect(({app}) => ({app}))(App);
