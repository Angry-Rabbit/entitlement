import React from 'react';
import styles from './AreaSelector.css';
import {Cascader, Icon} from 'antd';

const options = [{
  value: '110000',
  label: '北京市',
  children: [{
    value: '110101',
    label: '东城区'
  }, {
    value: '110102',
    label: '西城区'
  }, {
    value: '110103',
    label: '朝阳区'
  }, {
    value: '110104',
    label: '丰台区'
  }],
}, {
  value: '120000',
  label: '天津市',
  children: [{
    value: '120101',
    label: '和平区'
  }, {
    value: '120102',
    label: '河东区'
  }, {
    value: '120103',
    label: '河西区'
  }, {
    value: '120104',
    label: '南开区'
  }],
}];

function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
}

const AreaSelector = () => (
  <Cascader
    style={{width: '100%'}}
    options={options}
    onChange={onChange}
    placeholder="过滤：选择要显示的组织/机构区域"
    showSearch
    icon="filter"
  />
);


export default  AreaSelector;
