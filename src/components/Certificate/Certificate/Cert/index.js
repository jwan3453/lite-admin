import React from 'react';
import {
  Tabs,
} from 'antd';

import BasicInfo from './BasicInfo';
import Steps from './Steps';

export default class Cert extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab="基础信息"
          key="1"
        >
          <BasicInfo />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="步骤"
          key="2"
        >
          <Steps />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

