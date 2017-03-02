import React from 'react';
import { connect } from 'dva';
import styles from './Error.css';

function Error() {
  return (
    <div className={styles.normal}>
      Route Component: Error
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Error);
