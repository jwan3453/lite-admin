import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table,
  Button,
  Popconfirm,
  Tooltip,
  Modal,
} from 'antd';
import _ from 'lodash';

import RoomInfo from '../RoomInfo/';
import { fetchStudentAppointments } from '../../../app/actions/studentAppointment';
import { studentAppointmentsStatus } from '../../../common/studentAppointment';
import { fetchCourses } from '../../../app/actions/course';
import { fetchRoom } from '../../../app/actions/room';

class Schedule extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    studentAppointments: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object,
    studentId: React.PropTypes.number.isRequired,
    courseLoaded: React.PropTypes.bool.isRequired,
    courses: React.PropTypes.array,
    roomInfo: React.PropTypes.object,
  };
  static defaultProps = {
    studentAppointments: {},
    courses: [],
    filters: {},
    roomInfo: {},
  };

  state = {
    roomId: 0,
    roomInfoDialogTitle: '',
    roomInfoDialogVisible: false,
  };

  componentWillMount() {
    const { dispatch, loading, courseLoaded, studentId } = this.props;
    if (!courseLoaded) dispatch(fetchCourses());

    if (!loading) {
      dispatch(fetchStudentAppointments(studentId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchStudentAppointments(nextProps.studentId));
    }
  }

  getLessonShortName = (courseId, lessonId) => {
    const { courses } = this.props;
    const course = _.find(courses, { id: courseId }) || {};
    let lesson = {};
    if (_.isArray(course.chapters)) {
      course.chapters.map((chapter) => {
        if (_.isEmpty(lesson) && _.isArray(chapter.lessons)) {
          lesson = _.find(chapter.lessons, { id: lessonId });
        }
        return null;
      });
    }
    let name = courseId;
    if (course.name) {
      name = course.name;
      const match = /^.*(L\d).*$/.exec(course.name);
      if (match[1]) {
        name = match[1];
      }
    }
    return `${name}-${lesson.name || lessonId}`;
  };

  getRoomModalLessonName = () => {
    const { roomInfo } = this.props;
    if (!_.isEmpty(roomInfo.schedule)) {
      return this.getLessonShortName(roomInfo.schedule.courseId, roomInfo.schedule.lessonId);
    }
    return '';
  };

  handleHideRoomDialog = () => {
    //  todo
    this.setState({
      roomInfoDialogVisible: false,
    });
  };

  handleSend = () => {
    //  todo 补发课后评价消息
  };

  handleRoomClick = (room, record) => {
    const { dispatch } = this.props;
    //  todo 分配教室
    const lessonShortName =
      this.getLessonShortName(record.schedule.courseId, record.schedule.lessonId);
    dispatch(fetchRoom(room.id));
    this.setState({
      roomInfoDialogTitle: `房间：${room.id} ${lessonShortName}`,
      roomInfoDialogVisible: true,
    });
  };

  render() {
    const { studentAppointments, loading, filters, roomInfo } = this.props;
    const dataSource = studentAppointments.result || [];
    const pageSize = filters.pageSize || 10;
    const pagination = {
      total: filters.total || 0,
      pageSize,
      current: filters.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };
    const roomModalLessonName = this.getRoomModalLessonName();

    const columns = [
      {
        title: '排课ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '课程名称',
        key: 'lesson',
        dataIndex: 'schedule',
        render: schedule => this.getLessonShortName(schedule.courseId, schedule.lessonId),
      },
      {
        title: '上课老师',
        key: 'teacher',
        dataIndex: 'room.teacherId',
      },
      {
        title: '上课时间',
        key: 'beginAt',
        dataIndex: 'schedule.beginAt',
        render: begin => (begin ? moment.unix(begin).format('YYYY-MM-DD hh:mm:ss') : '--'),
      },
      {
        title: '分配教室',
        key: 'roomId',
        dataIndex: 'room',
        render: (room, record) => (
          <a
            role="button"
            tabIndex={0}
            onClick={() => this.handleRoomClick(room, record)}
          >{room.id}</a>
        ),
      },
      {
        title: '班型',
        key: 'roomType',
        dataIndex: 'schedule.roomTypeName',
      },
      {
        title: '内部课程',
        key: 'internal',
        dataIndex: 'schedule.isInternal',
        render: internal => (internal ? <span style={{ color: '#5cb85c' }}>是</span> : '否'),
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
        title: '操作',
        key: 'operation',
        render: record => (
          <Popconfirm
            title="操作不可逆，确认继续？"
            onConfirm={() => this.handleSend(record)}
          >
            <Tooltip
              title="补发课后评价消息"
            >
              <Button icon="notification" />
            </Tooltip>
          </Popconfirm>
        ),
      },
    ];

    return (
      <div>
        <Table
          size="small"
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
        <Modal
          title={this.state.roomInfoDialogTitle}
          visible={this.state.roomInfoDialogVisible}
          onCancel={this.handleHideRoomDialog}
          footer={[
            <Button
              type="primary"
              size="large"
              onClick={this.handleHideRoomDialog}
            >隐藏</Button>,
          ]}
        >
          <RoomInfo
            onCopySchedule={() => {}}
            roomInfo={roomInfo}
            lessonName={roomModalLessonName}
            onHide={this.handleHideRoomDialog}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { studentAppointment, course, room } = state;
  const { loading, studentAppointments } = studentAppointment;
  return {
    loading,
    courseLoaded: course.loaded,
    courses: course.courses,
    studentAppointments: studentAppointments.result,
    filters: studentAppointments.filters,
    roomInfo: room.roomInfo,
  };
}

export default connect(mapStateToProps)(Schedule);

