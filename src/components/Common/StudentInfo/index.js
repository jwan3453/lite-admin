import React, { Component } from 'react';
import { Tabs } from 'antd';

import StudentBasicInfo from './basicInfo';
import Schedule from './schedule';
import EntrySurvey from './entrySurvey';
import LessonStatus from './lessonStatus';
import StudentProduct from './studentProduct';
import Scholarship from './scholarship';
import UserTicket from './userTicket';
import Crm from './CRM/index';

export default class StudentInfo extends Component {
  static propTypes = {
    studentId: React.PropTypes.number.isRequired,
  };
  render() {
    const { studentId } = this.props;
    return (
      <Tabs size="small" style={{ paddingBottom: '40px' }}>
        <Tabs.TabPane tab="基础信息" key="basic">
          <StudentBasicInfo studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="预约记录" key="user-schedule">
          <Schedule studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="入学问卷" key="entry-questionair">
          <EntrySurvey studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学习进度" key="user-progress">
          <LessonStatus studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="课时包" key="product">
          <StudentProduct studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="奖学金" key="scholarship">
          <Scholarship studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="工单" key="ticket">
          <UserTicket studentId={studentId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="CRM跟进" key="crm">
          <Crm />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
