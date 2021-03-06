import React, { Component } from 'react';
import { Tabs, Button } from 'antd';

import RoomBasicInfo from './basicInfo';
import StudentAppointments from './studentAppointments';
import OperationLogs from './operationLogs';

import nativeHandler from '../../../common/nativeHandler';

export default class RoomInfo extends Component {
  static propTypes = {
    roomInfo: React.PropTypes.object.isRequired,
    lessonName: React.PropTypes.string.isRequired,
    onHide: React.PropTypes.func.isRequired,
    onCopySchedule: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
  };
  handleEnterClassRoom = () => {
    const { roomInfo } = this.props;
    nativeHandler.enterClassRoom(roomInfo.id);
  }
  render() {
    const { roomInfo, lessonName, onHide, onCopySchedule } = this.props;
    const studentAppointments = roomInfo.studentAppointments || [];
    const operationLogs = roomInfo.operationLogs || [];
    return (
      <Tabs
        size="small"
        tabBarExtraContent={
          <Button size="small" icon="enter" onClick={this.handleEnterClassRoom}>进入房间</Button>
        }
      >
        <Tabs.TabPane tab="基础信息" key="basic">
          <RoomBasicInfo
            roomInfo={roomInfo}
            lessonName={lessonName}
            onHide={onHide}
            onCopySchedule={onCopySchedule}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="学生预约" key="studentAppointments">
          <StudentAppointments
            scheduleId={roomInfo.scheduleId}
            roomId={roomInfo.id}
            studentAppointments={studentAppointments}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="操作记录" key="operationLogs">
          <OperationLogs operationLogs={operationLogs} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
