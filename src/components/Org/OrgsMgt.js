import React from 'react';
import styles from './OrgsMgt.less';
import OrgTree from './OrgTree';
import OrgDetail from './OrgDetail';
import {Row, Col} from 'antd';


function OrgsMgt() {
  return (
    <div className={styles.normal}>
      <Row gutter={16}>
        <Col span={4}>
          <OrgTree/>
        </Col>
        <Col span={20}>
          <OrgDetail/>
        </Col>
      </Row>
    </div>
  );
}

export default OrgsMgt;
