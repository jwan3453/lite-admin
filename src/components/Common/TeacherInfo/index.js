import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import BasicInfo from './BasicInfo/index';
import Certification from './Certification/index';
import Bill from '../TeacherBills';
import Bonus from './Bonus/index';
import Payment from './Payment/index';
import BankAccounts from './BankAccounts/index';

class TeacherInfo extends Component {
  static propTypes = {
    teacherId: React.PropTypes.number.isRequired,
  };

  render() {
    const { teacherId } = this.props;
    return (
      <Tabs
        size="small"
        style={{ paddingBottom: '40px' }}
      >
        <Tabs.TabPane tab="基础信息" key="basic">
          <BasicInfo teacherId={teacherId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="资质" key="qualification">
          <Certification teacherId={teacherId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="账单" key="bill">
          <Bill teacherId={teacherId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="奖金" key="bonus">
          <Bonus teacherId={teacherId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="提现" key="withdraw">
          <Payment teacherId={teacherId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="银行账号" key="bankAccount">
          <BankAccounts teacherId={teacherId} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default connect()(TeacherInfo);

