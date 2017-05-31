import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import BasicInfo from './basicinfo';

class TeacherInfo extends Component {
  render() {
    return (
      <Tabs size="small">
        <Tabs.TabPane tab="基础信息" key="basic">
          <BasicInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="资质" key="qualification">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="账单" key="bill">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="奖金" key="bonus">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="提现" key="withdraw">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="资质培训" key="training">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="银行账号" key="bankAccount">
          todo
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default connect()(TeacherInfo);
