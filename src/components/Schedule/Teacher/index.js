import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tooltip,
  Button,
  Modal,
  Spin,
  Message,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';

import SearchForm from './SearchForm';
import AppointmentStatusForm from './StatusForm';
import TeacherInfo from '../../Common/TeacherInfo';

import {
  TEACHER_APPOINTMENT_CREATED,
  TEACHER_APPOINTMENT_STATUS_MAP,
} from '../../../common/teacherAppointment';

import { fetchCourses } from '../../../app/actions/course';
import { fetchTeacherAppointments, updateTeacherAppointment } from '../../../app/actions/teacherAppointment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class TeacherAppointments extends React.Component {
  static propTypes = {
    courses: React.PropTypes.array,
    coursesLoaded: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    teacherAppointmentData: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    courses: [],
    filters: {},
    loading: false,
    teacherAppointmentData: {},
  };

  state = {
    appointmentStatus: TEACHER_APPOINTMENT_CREATED,
    appointmentStatusDialogVisible: false,
    teacherId: -1,
    teacherInfoDialogVisible: false,
    currentAppointmentId: -1,
  };

  componentDidMount() {
    const {
      dispatch,
      coursesLoaded,
    } = this.props;

    if (!coursesLoaded) dispatch(fetchCourses());
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

  search = (filters) => {
    const { dispatch } = this.props;
    dispatch(fetchTeacherAppointments(filters));
  };

  updateAppointmentStatus = (status) => {
    const { dispatch } = this.props;
    const { currentAppointmentId } = this.state;
    dispatch(updateTeacherAppointment(currentAppointmentId, status)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.info('更改成功');
        dispatch(fetchTeacherAppointments(this.props.filters));
      }
    });
    this.setState({
      appointmentStatusDialogVisible: false,
    });
  };

  showStatusDialog = (appointment) => {
    this.setState({
      appointmentStatus: appointment.status,
      appointmentStatusDialogVisible: true,
      currentAppointmentId: appointment.id,
    });
  };

  hideStatusDialog = () => {
    this.setState({
      appointmentStatusDialogVisible: false,
    });
  };

  showTeacherInfo = (teacherId) => {
    this.setState({
      teacherInfoDialogVisible: true,
      teacherId,
    });
  };

  hideTeacherInfo = () => {
    this.setState({
      teacherInfoDialogVisible: false,
    });
  };

  handlePaginationChange = (pagination) => {
    const { dispatch, filters, loading } = this.props;
    if (loading) return;
    Object.assign(filters, {
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
    dispatch(fetchTeacherAppointments(filters));
  };

  render() {
    const { loading, teacherAppointmentData } = this.props;
    const {
      appointmentStatus,
      appointmentStatusDialogVisible,
      teacherInfoDialogVisible,
      teacherId,
    } = this.state;

    const columns = [
      {
        title: '老师',
        key: 'teacher',
        render: (text, record) => (
          <a
            role="button"
            tabIndex="0"
            onClick={
              () => { this.showTeacherInfo(record.teacherId); }
            }
          >{`[${record.teacherId}]`}</a>
        ),
      },
      {
        title: '排课ID',
        dataIndex: 'schedule.id',
      },
      {
        title: '分配教室',
        dataIndex: 'room.id',
      },
      {
        title: '课程',
        dataIndex: 'schedule',
        render: schedule => this.getLessonShortName(schedule.courseId, schedule.lessonId),
      },
      {
        title: '上课时间',
        dataIndex: 'schedule.beginAt',
        render: begin => (begin ? moment.unix(begin).format(DATE_FORMAT) : '--'),
      },
      {
        title: '内部课时',
        dataIndex: 'schedule.isInternal',
        render: internal => (internal ? <span style={{ color: '#5cb85c' }}>是</span> : '否'),
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => TEACHER_APPOINTMENT_STATUS_MAP[status].text,
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <Tooltip title="修改状态" placement="top">
            <Button
              icon="edit"
              onClick={() => { this.showStatusDialog(record); }}
            />
          </Tooltip>
        ),
      },
    ];

    const pageSize = teacherAppointmentData.pageSize || 10;
    const pagination = {
      total: teacherAppointmentData.total || 0,
      pageSize,
      current: teacherAppointmentData.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = teacherAppointmentData.result || [];

    return (
      <div>
        <SearchForm
          onSearch={this.search}
        />
        <Table
          rowKey="id"
          loading={loading}
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: 16 }}
          onChange={this.handlePaginationChange}
        />
        <Modal
          title="修改老师上课状态"
          visible={appointmentStatusDialogVisible}
          footer={null}
          onCancel={this.hideStatusDialog}
        >
          <AppointmentStatusForm
            status={appointmentStatus}
            onSubmit={this.updateAppointmentStatus}
          />
        </Modal>
        <Modal
          visible={teacherInfoDialogVisible}
          title="老师信息"
          footer={null}
          onCancel={this.hideTeacherInfo}
          width={740}
        >
          <Spin spinning={loading}>
            <TeacherInfo teacherId={teacherId} />
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { course, teacherAppointment, courseLoading } = state;
  const { courses, loaded: coursesLoaded } = course;
  const {
    filters,
    result: teacherAppointmentData,
    loading: appointmentLoading,
  } = teacherAppointment;

  return {
    loading: courseLoading || appointmentLoading,
    filters,
    courses,
    coursesLoaded,
    teacherAppointmentData,
  };
}

export default connect(mapStateToProps)(TeacherAppointments);

