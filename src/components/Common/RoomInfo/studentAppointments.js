import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button, Modal, Message, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import {
  STUDENT_APPOINTMENT_CREATED,
  STUDENT_APPOINTMENT_CONFIRMED,
  STUDENT_APPOINTMENT_FINISHED,
  STUDENT_APPOINTMENT_ABSENT,
  STUDENT_APPOINTMENT_EXCEPTED,
  studentAppointmentsStatus,
} from '../../../common/studentAppointment';

import StudentListModal from '../StudentListModal';
import ScheduleRooms from './scheduleRooms';

import { fetchScheduleRooms } from '../../../app/actions/schedule';
import { fetchRooms, fetchRoom, addStudent, removeStudent } from '../../../app/actions/room';
import { updateStudentAppointment, changeRoom } from '../../../app/actions/studentAppointment';
import { fetchSimpleList } from '../../../app/actions/student';

class StudentAppointments extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    scheduleId: React.PropTypes.number.isRequired,
    roomId: React.PropTypes.number.isRequired,
    studentAppointments: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    simpleList: React.PropTypes.array,
  };

  static defaultProps = {
    simpleList: [],
  };

  state = {
    findStudentModalVisible: false,
    selectedStudents: [],
    changeStudentAppointmentId: 0,
    changeRoomVisible: false,
    exceptionVisble: false,
    dataSource: [],
  };
  componentWillMount() {
    const { dispatch, scheduleId } = this.props;
    dispatch(fetchScheduleRooms(scheduleId));
    this.getStudentSimpleList(this.props.studentAppointments);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.studentAppointments !== nextProps.studentAppointments) {
      this.getStudentSimpleList(nextProps.studentAppointments);
    }
  }

  getStudentSimpleList = (studentAppointments) => {
    const studentIds = _.map(studentAppointments, 'studentId');
    const ids = _.join(studentIds, ',');
    this.props.dispatch(fetchSimpleList(ids)).then(() => {
      this.combineDataSource();
    });
  };

  combineDataSource = () => {
    const { simpleList, studentAppointments } = this.props;
    if (_.isEmpty(studentAppointments)) {
      return;
    }
    const combinedData = studentAppointments.map((appointment) => {
      const userSimpleInfo = _.find(simpleList, { id: appointment.studentId });
      return _.assign({}, appointment, { nickname: userSimpleInfo.nickname });
    });
    this.setState({ dataSource: combinedData });
  }

  handleApplyAddStudent = () => {
    this.setState({
      findStudentModalVisible: true,
    });
  };

  handleSelectedStudentsChange = (selectedStudents) => {
    this.setState({ selectedStudents });
  };

  handleRefresh = () => {
    const { dispatch, roomId, filters } = this.props;
    dispatch(fetchRooms(filters));
    dispatch(fetchRoom(roomId));
  };
  handleAddStudent = () => {
    const { dispatch, roomId } = this.props;
    const { selectedStudents } = this.state;
    if (roomId && selectedStudents.length) {
      const studentId = selectedStudents[0];
      dispatch(addStudent(roomId, studentId)).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          Message.success('添加成功');
          this.hideStudentListModal();
          this.handleRefresh();
        }
      });
    }
  };
  handleUpdateStudentAppointment = (studentAppointmentId, statusId) => {
    const { dispatch } = this.props;
    dispatch(updateStudentAppointment(studentAppointmentId, statusId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('标记成功');
        this.handleRefresh();
      }
    });
  };
  handleRemoveStudent = (studentId) => {
    const { dispatch, roomId } = this.props;
    dispatch(removeStudent(roomId, studentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('取消预约成功');
        this.handleRefresh();
      }
    });
  };
  handleUpdateAllStudentAppointments = (statusId) => {
    const { dispatch, studentAppointments } = this.props;
    const promises = [];
    studentAppointments.map(studentAppointment =>
      promises.push(dispatch(updateStudentAppointment(studentAppointment.id, statusId))),
    );
    global.Promise.all(promises).then(() => {
      Message.success('成功发起标记');
      this.handleRefresh();
    });
  };
  handleChangeRoom = (toRoomId) => {
    const { dispatch } = this.props;
    dispatch(changeRoom(this.state.changeStudentAppointmentId, toRoomId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        this.handleRefresh();
      }
    });
  };
  handleSendClassroomReview = () => {};
  handleSendException = () => {};
  hideStudentListModal = () => {
    this.setState({
      findStudentModalVisible: false,
    });
  };
  render() {
    const columns = [
      {
        title: '预约ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '学生ID',
        key: 'studentId',
        dataIndex: 'studentId',
      },
      {
        title: '学生昵称',
        key: 'nickname',
        dataIndex: 'nickname',
      },
      {
        title: '邀请人',
        key: 'inviterIds',
        dataIndex: 'inviterIds',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (statusId) => {
          const status = _.find(studentAppointmentsStatus, { value: Number(statusId) }) || {};
          return status.text || statusId;
        },
      },
      {
        title: '预约时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: createdAt => moment.unix(createdAt).format('Y-MM-DD HH:mm'),
      },
      {
        title: '操作',
        key: 'operation',
        render: (studentAppointment) => {
          const btnProps = {
            size: 'small',
            type: 'primary',
            ghost: true,
            disabled: (Number(studentAppointment.status) !== STUDENT_APPOINTMENT_CREATED &&
              studentAppointment.status !== STUDENT_APPOINTMENT_CONFIRMED
            ),
            shape: 'circle',
            style: { margin: '0 2px' },
          };
          return (<div>
            <Popconfirm
              title="确认修改？"
              onConfirm={() =>
                this.handleUpdateStudentAppointment(
                  studentAppointment.id,
                  STUDENT_APPOINTMENT_FINISHED,
                )}
            >
              <Tooltip title="标记完成">
                <Button {...btnProps} icon="check" />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              title="确认修改？"
              onConfirm={() =>
                this.handleUpdateStudentAppointment(
                  studentAppointment.id,
                  STUDENT_APPOINTMENT_ABSENT,
                )}
            >
              <Tooltip title="标记缺席">
                <Button {...btnProps} icon="cross" />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              title="确认修改？"
              onConfirm={() =>
                this.handleUpdateStudentAppointment(
                  studentAppointment.id,
                  STUDENT_APPOINTMENT_EXCEPTED,
                )}
            >
              <Tooltip title="标记异常">
                <Button {...btnProps} icon="exclamation" />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="更换房间">
              <Button
                {...btnProps}
                icon="swap"
                onClick={() => this.setState({
                  changeStudentAppointmentId: studentAppointment.id,
                  changeRoomVisible: true,
                })}
              />
            </Tooltip>
            <Popconfirm
              title="确认删除预约？"
              onConfirm={() =>
                this.handleRemoveStudent(
                  studentAppointment.studentId,
                )}
            >
              <Tooltip title="取消预约">
                <Button {...btnProps} icon="delete" />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="发送异常">
              <Button {...btnProps} icon="exception" />
            </Tooltip>
            <Popconfirm
              title="确认发送提醒？"
            >
              <Tooltip title="紧急提醒">
                <Button {...btnProps} icon="bell" />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              title="确认补发课后评价通知？"
            >
              <Tooltip title="补发评价">
                <Button {...btnProps} icon="file" />
              </Tooltip>
            </Popconfirm>
          </div>);
        },
      },
    ];
    const btnDisabled = this.props.studentAppointments.length === 0;
    return (
      <div>
        <Row type="flex" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Button
              size="small"
              icon="plus"
              onClick={this.handleApplyAddStudent}
            >
              添加学生
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title="确认全部标记完成？"
              onConfirm={() =>
                this.handleUpdateAllStudentAppointments(STUDENT_APPOINTMENT_FINISHED)}
            >
              <Button size="small" icon="check" disabled={btnDisabled}>全部标记完成</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Popconfirm
              title="确认全部标记完成？"
              onConfirm={() =>
                this.handleUpdateAllStudentAppointments(STUDENT_APPOINTMENT_EXCEPTED)}
            >
              <Button size="small" icon="exception" disabled={btnDisabled}>全部标记异常</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Button size="small" icon="notification" disabled={btnDisabled}>全部发送异常通知</Button>
          </Col>
        </Row>
        <Table
          loading={this.props.loading}
          columns={columns}
          dataSource={this.state.dataSource}
          rowKey="id"
          size="small"
        />
        <StudentListModal
          title="添加学生"
          visible={this.state.findStudentModalVisible}
          selectedRowKeys={this.state.selectedStudents}
          onOk={this.handleAddStudent}
          onCancel={this.hideStudentListModal}
          onSelectedRowsChange={this.handleSelectedStudentsChange}
        />
        <Modal
          title="更换房间"
          visible={this.state.changeRoomVisible}
          onCancel={() => this.setState({ changeRoomVisible: false })}
          footer={null}
        >
          <ScheduleRooms
            roomId={this.props.roomId}
            onChange={this.handleChangeRoom}
          />
        </Modal>
      </div>
    );
  }
}

export default connect((state) => {
  const { room, student } = state;
  const { loading, filters } = room;
  return {
    loading,
    filters,
    simpleList: student.simpleList,
  };
})(StudentAppointments);
