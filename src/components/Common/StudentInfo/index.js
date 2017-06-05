import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import StudentBasicInfo from './basicInfo';
import Schedule from './schedule';
import Question from './question';
import LessonStatus from './lessonStatus';
import UserProduct from './userProduct';

class StudentInfo extends Component {
  render() {
    return (
      <Tabs size="small" style={{ paddingBottom: '40px' }}>
        <Tabs.TabPane tab="基础信息" key="basic">
          <StudentBasicInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="预约记录" key="user-schedule">
          <Schedule />
        </Tabs.TabPane>
        <Tabs.TabPane tab="入学问卷" key="entry-questionair">
          <Question />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学习进度" key="user-progress">
          <LessonStatus />
        </Tabs.TabPane>
        <Tabs.TabPane tab="课时包" key="product">
          <UserProduct />
        </Tabs.TabPane>
        <Tabs.TabPane tab="奖学金" key="scholarship">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="工单" key="ticket">
          todo
        </Tabs.TabPane>
        <Tabs.TabPane tab="CRM跟进" key="crm">
          todo
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default connect()(StudentInfo);

