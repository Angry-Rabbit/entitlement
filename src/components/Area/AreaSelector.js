import React from 'react';
import styles from './AreaSelector.css';
import { Cascader, Icon } from 'antd';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }, {
      value: 'xiasha',
      label: 'Xia Sha',
      disabled: true,
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua men',
    }],
  }],
}];

function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
}

const AreaSelector = () => (
  <Cascader
    style={{ width: '100%'}}
    options={options}
    onChange={onChange}
    placeholder="请选择组织/机构区域..."
    showSearch
    icon="filter"
  />
);


export default  AreaSelector;
