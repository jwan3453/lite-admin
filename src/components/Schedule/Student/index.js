import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Message,
  Modal,
  Spin,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import SearchForm from './SearchForm';
import ActionBar from './ActionBar';
import StudentInfo from '../../Common/StudentInfo';
import TeacherInfo from '../../Common/TeacherInfo';
import RoomInfo from '../../Common/RoomInfo';

import {
  STATUS_MAP as STUDENT_APPOINTMENT_STATUS_MAP,
} from '../../../common/studentAppointment';


import { fetchStudentAppointments, sendFeedbackReminder } from '../../../app/actions/studentAppointment';
import { fetchCourses } from '../../../app/actions/course';
import { fetchRoom } from '../../../app/actions/room';
import { fetchSimpleList, fetchMobile } from '../../../app/actions/student';

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class StudentAppointments extends React.Component {
  static propTypes = {
    filters: React.PropTypes.object,
    studentAppointments: React.PropTypes.object,
    courses: React.PropTypes.array,
    roomInfo: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired,
    coursesLoaded: React.PropTypes.bool,
    dispatch: React.PropTypes.func.isRequired,
    simpleList: React.PropTypes.array,
    mobile: React.PropTypes.object,
  };

  static defaultProps = {
    courses: [],
    roomInfo: {},
    filters: {},
    studentAppointments: {},
    coursesLoaded: false,
    simpleList: [],
    mobile: {},
  };

  state = {
    studentId: 0,
    studentInfoModalVisible: false,
    teacherId: 0,
    teacherInfoModalVisible: false,
    roomInfoDialogTitle: '',
    roomInfoDialogVisible: false,
    dataSource: [],
  };

  componentWillMount() {
    const {
      loading,
      dispatch,
      coursesLoaded,
    } = this.props;

    if (!coursesLoaded) dispatch(fetchCourses());
    if (!loading) {
      dispatch(fetchStudentAppointments()).then(this.getStudentSimpleList);
    }
  }

  getStudentSimpleList = () => {
    const studentIds = _.map(this.props.studentAppointments.result, 'studentId');
    const ids = _.join(studentIds, ',');
    this.props.dispatch(fetchSimpleList(ids)).then(() => {
      this.combineDataSource();
    });
  };

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

  combineDataSource = () => {
    const { simpleList, studentAppointments } = this.props;
    if (_.isEmpty(studentAppointments)) {
      return;
    }
    const combinedData = studentAppointments.result.map((appointment) => {
      const userSimpleInfo = _.find(simpleList, { id: appointment.studentId });
      return _.assign({}, appointment, { mobileSuffix: userSimpleInfo.mobileSuffix });
    });
    this.setState({ dataSource: combinedData });
  }

  handleSend = (id) => {
    const { dispatch } = this.props;
    dispatch(sendFeedbackReminder(id)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('重新发送提醒成功');
      }
    });
  };

  search = (filters) => {
    const { dispatch } = this.props;
    dispatch(fetchStudentAppointments(0, filters)).then(this.getStudentSimpleList);
  };

  showStudentInfo = (studentId) => {
    this.setState({
      studentId,
      studentInfoModalVisible: true,
    });
  };

  hideStudentInfo = () => {
    this.setState({
      studentId: 0,
      studentInfoModalVisible: false,
    });
  };

  showTeacherInfo = (teacherId) => {
    if (teacherId) {
      this.setState({
        teacherInfoModalVisible: true,
      });
    }
  };

  hideTeacherInfo = () => {
    this.setState({
      teacherId: 0,
      teacherInfoModalVisible: false,
    });
  };

  showRoomInfo = (room, record) => {
    const { dispatch } = this.props;
    const lessonShortName =
      this.getLessonShortName(record.schedule.courseId, record.schedule.lessonId);
    dispatch(fetchRoom(room.id));
    this.setState({
      roomInfoDialogTitle: `房间：${room.id} ${lessonShortName}`,
      roomInfoDialogVisible: true,
    });
  };

  hideRoomInfo = () => {
    //  todo
    this.setState({
      roomInfoDialogVisible: false,
    });
  };

  handleFetchMobile = (studentId) => {
    const { dispatch } = this.props;
    dispatch(fetchMobile(studentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        const { mobile } = this.props;
        Modal.info({
          content: `用户${mobile.studentId}手机号为: ${mobile.result}`,
        });
      }
    });
  };

  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      fetchStudentAppointments(0,
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    ).then(this.getStudentSimpleList);
  };

  render() {
    const {
      loading,
      courses,
      roomInfo,
      studentAppointments,
    } = this.props;

    const {
      studentId,
      studentInfoModalVisible,
      teacherId,
      teacherInfoModalVisible,
      roomInfoDialogTitle,
      roomInfoDialogVisible,
    } = this.state;

    const roomModalLessonName = this.getRoomModalLessonName();
    const dataSource = this.state.dataSource || [];

    const pageSize = studentAppointments.pageSize || 10;
    const pagination = {
      total: studentAppointments.total || 0,
      pageSize,
      current: studentAppointments.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };
    const columns = [
      {
        title: '学生',
        dataIndex: 'studentId',
        render: sid => (
          <a
            role="button"
            tabIndex="0"
            onClick={() => { this.showStudentInfo(sid); }}
          >{`[${sid}]`}</a>
        ),
      },
      {
        title: '手机尾号',
        dataIndex: 'mobileSuffix',
        render: (mobileSuffix, record) => (
          record.mobileSuffix
          ? <Button
            size="small"
            icon="mobile"
            onClick={() => this.handleFetchMobile(record.studentId)}
          >{record.mobileSuffix}</Button>
          : <span />
        ),
      },
      {
        title: '课程名称',
        dataIndex: 'schedule',
        render: schedule => this.getLessonShortName(schedule.courseId, schedule.lessonId),
      },
      {
        title: '上课老师',
        dataIndex: 'room.teacherId',
        render: tid => (
          <a
            role="button"
            tabIndex="0"
            onClick={() => { this.showTeacherInfo(tid); }}
          >{`[${tid}]`}</a>
        ),
      },
      {
        title: '上课时间',
        dataIndex: 'schedule.beginAt',
        render: begin => (begin ? moment.unix(begin).format(DATE_FORMAT) : '--'),
      },
      {
        title: '分配教室',
        dataIndex: 'room',
        render: (room, record) => (
          <a
            role="button"
            tabIndex="0"
            onClick={() => { this.showRoomInfo(room, record); }}
          >{`[${room.id}]`}</a>
        ),
      },
      {
        title: '班型',
        dataIndex: 'schedule.roomTypeName',
      },
      {
        title: '内部',
        dataIndex: 'schedule.isInternal',
        render: internal => (internal ? <span style={{ color: '#5cb85c' }}>是</span> : '否'),
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => STUDENT_APPOINTMENT_STATUS_MAP[status].text,
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <ActionBar
            sendFeedbackReminder={() => this.handleSend(record.id)}
          />
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          courses={courses}
          onSearch={this.search}
          pageSize={pageSize}
        />
        <Table
          rowKey="id"
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          onChange={this.handleChange}
          style={{ marginTop: 16 }}
        />
        <Modal
          visible={studentInfoModalVisible}
          title="学生信息"
          footer={null}
          onCancel={this.hideStudentInfo}
          width={700}
        >
          <Spin spinning={loading}>
            <StudentInfo studentId={studentId} />
          </Spin>
        </Modal>
        <Modal
          visible={teacherInfoModalVisible}
          title="老师信息"
          footer={null}
          onCancel={this.hideTeacherInfo}
          width={700}
        >
          <Spin spinning={loading}>
            <TeacherInfo teacherId={teacherId} />
          </Spin>
        </Modal>
        <Modal
          title={roomInfoDialogTitle}
          visible={roomInfoDialogVisible}
          onCancel={this.hideRoomInfo}
          width={700}
          footer={[
            <Button
              type="primary"
              size="large"
              onClick={this.hideRoomInfo}
              key="hide"
            >隐藏</Button>,
          ]}
        >
          <RoomInfo
            onCopySchedule={() => { Message.error('不能复制排课。'); }}
            roomInfo={roomInfo}
            lessonName={roomModalLessonName}
            onHide={this.hideRoomInfo}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { studentAppointment, course, room, student } = state;
  const { loading, studentAppointments } = studentAppointment;
  return {
    loading,
    courseLoaded: course.loaded,
    courses: course.courses,
    studentAppointments: studentAppointments.result,
    filters: studentAppointments.filters,
    roomInfo: room.roomInfo,
    simpleList: student.simpleList,
    mobile: student.mobile,
  };
}

export default connect(mapStateToProps)(StudentAppointments);

