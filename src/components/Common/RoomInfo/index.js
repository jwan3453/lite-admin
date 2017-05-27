import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Button } from 'antd';

import RoomBasicInfo from './basicInfo';
import StudentAppointments from './studentAppointments';
import OperationLogs from './operationLogs';

class RoomInfo extends Component {
  static propTypes = {
    roomInfo: React.PropTypes.object.isRequired,
    lessonName: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    roomInfo: {},
    lessonName: '',
  };
  render() {
    const { roomInfo, lessonName } = this.props;
    const studentAppointments = roomInfo.studentAppointments || [];
    const operationLogs = roomInfo.operationLogs || [];
    return (
      <Tabs
        tabBarExtraContent={
          <Button size="small" icon="enter">进入房间</Button>
        }
      >
        <Tabs.TabPane tab="基础信息" key="basic">
          <RoomBasicInfo roomInfo={roomInfo} lessonName={lessonName} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学生预约" key="studentAppointments">
          <StudentAppointments roomId={roomInfo.id} studentAppointments={studentAppointments} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="操作记录" key="operationLogs">
          <OperationLogs operationLogs={operationLogs} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default connect()(RoomInfo);
