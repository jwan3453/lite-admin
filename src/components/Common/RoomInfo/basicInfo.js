import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, Button, Row, Col, Message, Popconfirm, Modal } from 'antd';
import _ from 'lodash';

import {
  TEACHER_APPOINTMENT_FINISHED,
  TEACHER_APPOINTMENT_ABSENT,
  TEACHER_APPOINTMENT_SYSTEM_EXCEPTED,
  TEACHER_APPOINTMENT_TEACHER_EXCEPTED,
  updateTeacherReasons,
} from '../../../common/teacherAppointment';
import { validateIpv4, validateMultiIpv4 } from '../../../common/validator';

import TeacherSearchInput from '../../Common/TeacherSearchInput';

import { addRoom, updateSchedule } from '../../../app/actions/schedule';
import { fetchRooms, fetchRoom, updateRoom, deleteRoom, updateTeacher } from '../../../app/actions/room';
import { updateTeacherAppointment } from '../../../app/actions/teacherAppointment';

class RoomBasicInfo extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    roomInfo: React.PropTypes.object.isRequired,
    lessonName: React.PropTypes.string.isRequired,
    filters: React.PropTypes.object.isRequired,
    onHide: React.PropTypes.func.isRequired,
    onCopySchedule: React.PropTypes.func.isRequired,
    teachers: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    dispatch: () => {},
    roomInfo: {},
    lessonName: '',
    filters: {},
    onHide: () => {},
    onCopySchedule: () => {},
    teachers: [],
  };
  state = {
    updateTeacherVisible: false,
    teacherId: 0,
    reason: 0,
    ipVisible: false,
    ip: '',
    turnIpVisible: false,
    turnIp: '',
    skynetIpVisible: false,
    skynetIp: '',
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
  handleCopySchedule = () => {
    const { onCopySchedule, roomInfo } = this.props;
    if (!_.isEmpty(roomInfo.schedule)) {
      onCopySchedule(roomInfo.schedule);
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
  handleUpdateSchedule = () => {
    const { dispatch, roomInfo, filters } = this.props;
    if (!_.isEmpty(roomInfo.schedule)) {
      dispatch(updateSchedule(
        roomInfo.scheduleId,
        (roomInfo.schedule.isInternal ? 0 : 1),
      )).then(() => {
        dispatch(fetchRooms(filters));
        dispatch(fetchRoom(roomInfo.id));
      });
    }
  };
  handleSelectReason = (reason) => {
    this.setState({
      reason,
    });
  };
  handleSelectTeacher = (teacherId) => {
    this.setState({
      teacherId,
    });
  };
  handleApplyUpdateTeacher = () => {
    this.setState({
      updateTeacherVisible: true,
    });
  };
  handleUpdateTeacher = () => {
    const { dispatch, roomInfo, filters } = this.props;
    if (!this.state.teacherId) {
      Message.error('请选择老师');
    } else {
      dispatch(updateTeacher(
        roomInfo.id,
        this.state.teacherId,
        this.state.reason,
      )).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          this.setState({
            updateTeacherVisible: false,
            updateTeacherReasons: 0,
          });
          Message.success('设置老师成功');
          dispatch(fetchRoom(roomInfo.id));
          dispatch(fetchRooms(filters));
        }
      });
    }
  };
  handleEditIp = () => {
    const { dispatch, roomInfo } = this.props;
    const ip = _.trim(this.state.ip);
    if (validateIpv4(ip)) {
      dispatch(updateRoom(roomInfo.id, {
        ip,
      })).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          dispatch(fetchRoom(roomInfo.id));
          this.setState({
            ipVisible: false,
          });
        }
      });
    } else {
      Message.error('请输入有效的ip地址');
    }
  };
  handleEditTurnIp = () => {
    const { dispatch, roomInfo } = this.props;
    const turnIp = _.trim(this.state.turnIp);
    if (validateMultiIpv4(turnIp)) {
      dispatch(updateRoom(roomInfo.id, {
        turnIp,
      })).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          dispatch(fetchRoom(roomInfo.id));
          this.setState({
            turnIpVisible: false,
          });
        }
      });
    } else {
      Message.error('请输入有效的ip地址');
    }
  };
  handleEditSkynetIp = () => {
    const { dispatch, roomInfo } = this.props;
    const skynetIp = _.trim(this.state.skynetIp);
    if (validateIpv4(skynetIp)) {
      dispatch(updateRoom(roomInfo.id, {
        skynetIp,
      })).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          dispatch(fetchRoom(roomInfo.id));
          this.setState({
            skynetVisible: false,
          });
        }
      });
    } else {
      Message.error('请输入有效的ip地址');
    }
  };
  handleUpdateTeacherAppointment = (statusId) => {
    const { dispatch, roomInfo } = this.props;
    if (!_.isEmpty(roomInfo.teacherAppointment)) {
      dispatch(updateTeacherAppointment(roomInfo.teacherAppointment.id, statusId))
        .then((result) => {
          if (result.code) {
            Message.error(result.message);
          } else {
            Message.succees('标记状态成功');
          }
        });
    }
  };
  render() {
    const { roomInfo, lessonName, teachers } = this.props;
    const schedule = roomInfo.schedule || {};
    let teacher = '未分配';
    if (roomInfo.teacherId) {
      teacher = _.find(teachers, { id: roomInfo.teacherId }) || {};
      teacher = teacher.username || `Teacher:${roomInfo.teacherId}`;
    }
    const teacherOperationButtonProps = {
      size: 'small',
      disabled: Number(roomInfo.teacherId) === 0,
    };
    const labelSpan = 3;
    const itemSpan = 5;
    const rowProps = {
      type: 'flex',
      gutter: 12,
      style: {
        marginBottom: 10,
      },
    };
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const editButtonProps = {
      size: 'small',
      icon: 'edit',
      style: { marginLeft: 4 },
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
            <Button size="small" icon="folder-add" onClick={this.handleCopySchedule}>复制排课</Button>
          </Col>
          <Col>
            <Button
              size="small"
              icon={schedule.isInternal ? 'unlock' : 'lock'}
              onClick={this.handleUpdateSchedule}
            >
              {schedule.isInternal ? '设为公开课' : '设为内部课'}
            </Button>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col span={3}><div style={{ float: 'right' }}>老师操作</div></Col>
          <Col>
            <Popconfirm
              title="确认标记完成？"
              onConfirm={() => this.handleUpdateTeacherAppointment(TEACHER_APPOINTMENT_FINISHED)}
            >
              <Button {...teacherOperationButtonProps} icon="check">标记完成</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Popconfirm
              title="确认标记完成？"
              onConfirm={() =>
                this.handleUpdateTeacherAppointment(TEACHER_APPOINTMENT_SYSTEM_EXCEPTED)}
            >
              <Button {...teacherOperationButtonProps} icon="exception">系统异常</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Popconfirm
              title="确认标记完成？"
              onConfirm={() =>
                this.handleUpdateTeacherAppointment(TEACHER_APPOINTMENT_TEACHER_EXCEPTED)}
            >
              <Button {...teacherOperationButtonProps} icon="exception">老师异常</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Popconfirm
              title="确认标记完成？"
              onConfirm={() => this.handleUpdateTeacherAppointment(TEACHER_APPOINTMENT_ABSENT)}
            >
              <Button {...teacherOperationButtonProps} icon="cross">标记缺席</Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col span={labelSpan}>排课ID:</Col>
          <Col span={itemSpan}>{schedule.id}</Col>
          <Col span={labelSpan}>课程</Col>
          <Col span={itemSpan}>{lessonName}</Col>
          <Col span={labelSpan}>老师</Col>
          <Col span={itemSpan}>
            {teacher}
            <Button
              {...editButtonProps}
              onClick={this.handleApplyUpdateTeacher}
            />
          </Col>
          <Col span={labelSpan}>房间学生:</Col>
          <Col span={itemSpan}>
            {roomInfo.studentCount} / {roomInfo.maxStudentCount}
          </Col>
          <Col span={labelSpan}>ip:</Col>
          <Col span={itemSpan}>
            {roomInfo.ip}
            <Button
              {...editButtonProps}
              onClick={() => this.setState({ ipVisible: true })}
            />
          </Col>
          <Col span={labelSpan}>skynetIp:</Col>
          <Col span={itemSpan}>
            {roomInfo.skynetIp}
            <Button
              {...editButtonProps}
              onClick={() => this.setState({ skynetIpVisible: true })}
            />
          </Col>
          <Col span={labelSpan}>turnIp:</Col>
          <Col span={itemSpan * 2 + labelSpan}>
            {roomInfo.turnIp}
            <Button
              {...editButtonProps}
              onClick={() => this.setState({ turnIpVisible: true })}
            />
          </Col>
        </Row>
        <Modal
          title="设置老师"
          onCancel={() => this.setState({
            updateTeacherVisible: false,
          })}
          onOk={this.handleUpdateTeacher}
          visible={this.state.updateTeacherVisible}
        >
          <Form>
            {roomInfo.teacherId > 0 && <Form.Item
              label="更换原因"
              {...formItemLayout}
            >
              <Select defaultValue="2" onChange={this.handleSelectReason}>
                {updateTeacherReasons.map(reason =>
                  (<Select.Option key={String(reason.value)} value={String(reason.value)}>
                    {reason.text}
                  </Select.Option>))}
              </Select>
            </Form.Item>}
            <Form.Item
              label="老师"
              {...formItemLayout}
              style={{ marginBottom: 0 }}
            >
              <TeacherSearchInput
                onChange={this.handleSelectTeacher}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="设置房间IP"
          visible={this.state.ipVisible}
          onCancel={() => this.setState({ ipVisible: false })}
          onOk={this.handleEditIp}
        >
          <Form>
            <Form.Item>
              <Input
                defaultValue={roomInfo.ip}
                onChange={e => this.setState({ ip: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="设置turnIP"
          visible={this.state.turnIpVisible}
          onCancel={() => this.setState({ turnIpVisible: false })}
          onOk={this.handleEditTurnIp}
        >
          <Form>
            <Form.Item help="多个地址以逗号隔开">
              <Input
                defaultValue={roomInfo.turnIp}
                onChange={e => this.setState({ turnIp: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="设置skynetIP"
          visible={this.state.skynetIpVisible}
          onCancel={() => this.setState({ skynetIpVisible: false })}
          onOk={this.handleEditSkynetIp}
        >
          <Form>
            <Form.Item>
              <Input
                defaultValue={roomInfo.skynetIp}
                onChange={e => this.setState({ skynetIp: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => {
  const { schedule, room, teacher } = state;
  const { loading } = schedule;
  const { filters, roomInfo } = room;
  const { teachers } = teacher;
  return {
    loading,
    filters,
    roomInfo,
    teachers,
  };
})(RoomBasicInfo);
