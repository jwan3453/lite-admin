import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import BasicInfo from './BasicInfo/index';
import Certification from './Certification/index';
import Bill from './Bill/index';
import Bonus from './Bonus/index';

class TeacherInfo extends Component {
  render() {
    return (
      <Tabs
        size="small"
        style={{ paddingBottom: '40px' }}
      >
        <Tabs.TabPane tab="基础信息" key="basic">
          <BasicInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="资质" key="qualification">
          <Certification />
        </Tabs.TabPane>
        <Tabs.TabPane tab="账单" key="bill">
          <Bill />
        </Tabs.TabPane>
        <Tabs.TabPane tab="奖金" key="bonus">
          <Bonus />
        </Tabs.TabPane>
        <Tabs.TabPane tab="提现" key="withdraw">
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

