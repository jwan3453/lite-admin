import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Message, Popconfirm } from 'antd';

import { addRoom } from '../../../app/actions/schedule';
import { fetchRooms, deleteRoom } from '../../../app/actions/room';

class RoomBasicInfo extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    roomInfo: React.PropTypes.object.isRequired,
    lessonName: React.PropTypes.string.isRequired,
    filters: React.PropTypes.object.isRequired,
    onHide: React.PropTypes.func.isRequired,
    // onCopySchedule: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    dispatch: () => {},
    roomInfo: {},
    lessonName: '',
    filters: {},
    onHide: () => {},
    onCopySchedule: () => {},
  };
  handleAddRoom = () => {
    const { dispatch, roomInfo, filters } = this.props;
    if (roomInfo.scheduleId) {
      dispatch(addRoom(roomInfo.scheduleId)).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          Message.success('添加房间成功');
          dispatch(fetchRooms(filters));
        }
      });
    }
  };
  handleDeleteRoom = () => {
    const { dispatch, roomInfo, filters, onHide } = this.props;
    if (roomInfo.id) {
      dispatch(deleteRoom(roomInfo.id)).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          Message.success('删除房间成功');
          dispatch(fetchRooms(filters));
          onHide();
        }
      });
    }
  };
  render() {
    const { roomInfo, lessonName } = this.props;
    const schedule = roomInfo.schedule || {};
    const labelSpan = 3;
    const itemSpan = 5;
    const rowProps = {
      type: 'flex',
      gutter: 16,
      style: {
        marginBottom: 10,
      },
    };
    return (
      <div>
        <Row {...rowProps}>
          <Col span={3}><div style={{ float: 'right' }}>房间操作</div></Col>
          <Col>
            <Popconfirm title="确认增加房间？" onConfirm={this.handleAddRoom}>
              <Button size="small" icon="file-add">增加房间</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Popconfirm title="确认删除房间？" onConfirm={this.handleDeleteRoom}>
              <Button size="small" icon="delete">删除房间</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Button size="small" icon="folder-add">复制排课</Button>
          </Col>
          <Col>
            <Button size="small" icon={schedule.isInternal ? 'unlock' : 'lock'}>
              {schedule.isInternal ? '设为公开课' : '设为内部课'}
            </Button>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col span={3}><div style={{ float: 'right' }}>老师操作</div></Col>
          <Col>
            <Button size="small" icon="check">标记完成</Button>
          </Col>
          <Col>
            <Button size="small" icon="exception">系统异常</Button>
          </Col>
          <Col>
            <Button size="small" icon="exception">老师异常</Button>
          </Col>
          <Col>
            <Button size="small" icon="cross">标记缺席</Button>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col span={labelSpan}>排课ID:</Col>
          <Col span={itemSpan}>{schedule.id}</Col>
          <Col span={labelSpan}>课程:</Col>
          <Col span={itemSpan}>{lessonName}</Col>
          <Col span={labelSpan}>老师:</Col>
          <Col span={itemSpan}>{roomInfo.teacherId}</Col>
          <Col span={labelSpan}>IP:</Col>
          <Col span={itemSpan}>{roomInfo.ip}</Col>
          <Col span={labelSpan}>turnIP:</Col>
          <Col span={itemSpan}>{roomInfo.turnIp}</Col>
          <Col span={labelSpan}>skynetIP:</Col>
          <Col span={itemSpan}>{roomInfo.skynetIp}</Col>
          <Col span={labelSpan}>房间学生:</Col>
          <Col span={itemSpan}>
            {roomInfo.studentCount} / {roomInfo.maxStudentCount}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => {
  const { schedule, room } = state;
  const { loading } = schedule;
  const { filters, roomInfo } = room;
  return {
    loading,
    filters,
    roomInfo,
  };
})(RoomBasicInfo);
