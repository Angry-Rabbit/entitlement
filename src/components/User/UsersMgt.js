import React from 'react';
import styles from './UsersMgt.less';
import {Tabs, Row, Col, Affix} from 'antd';
import OrgTree from '../../components/Org/OrgTree'
import RoleTree from '../../components/Role/RoleTree'
import AreaSelector from '../../components/Area/AreaSelector'
import UserList from '../../components/User/UserList'
import {classnames} from '../../utils';
const TabPane = Tabs.TabPane;

function UsersMgt() {
  return (
    <div className={styles.normal}>
      <Row gutter={16}>
        <Col span={4}>
          <div className="org-tree">
            <div className='card-container'>
              <Tabs type="card">
                <TabPane tab="按组织查看" key="1" className='scrollable-container'>
                  <div style={{background: '#f7f7f7'}}>
                    <AreaSelector/>
                  </div>
                  <OrgTree/>
                </TabPane>
                <TabPane tab="按角色查看" key="2" className='scrollable-container'>
                  <RoleTree />
                </TabPane>
                <TabPane tab="按用户组查看" key="3" className='scrollable-container'>Content of Tab Pane 3</TabPane>
              </Tabs>
            </div>
          </div>
        </Col>
        <Col span={20}>
          <UserList />
        </Col>
      </Row>
    </div>
  );
}

export default UsersMgt;
