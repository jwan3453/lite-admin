import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tooltip,
  Button,
  Modal,
  Spin,
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

import {
  CYCLE_MAP as TEACHER_BILLING_CYCLE_MAP,
} from '../../../common/teacherBillingCycle';

import { fetchCourses } from '../../../app/actions/course';

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class TeacherAppointments extends React.Component {
  static propTypes = {
    courses: React.PropTypes.array,
    coursesLoaded: React.PropTypes.bool.isRequired,
    teachers: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    courses: [],
    filters: {},
    teachers: {},
  };

  state = {
    appointmentStatus: TEACHER_APPOINTMENT_CREATED,
    appointmentStatusDialogVisible: false,
    teacherId: -1,
    teacherInfoDialogVisible: false,
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
    //  todo
    console.log(filters);
  };

  updateAppointmentStatus = () => {
    //  todo
  };

  showStatusDialog = (appointmentStatus) => {
    this.setState({
      appointmentStatus,
      appointmentStatusDialogVisible: true,
    });
  };

  hideStatusDialog = () => {
    this.setState({
      appointmentStatusDialogVisible: false,
    });
  };

  showTeacherInfo = (teacherId) => {
    //  todo
    console.log(teacherId);
    this.setState({
      teacherInfoDialogVisible: true,
    });
  };

  hideTeacherInfo = () => {
    this.setState({
      teacherInfoDialogVisible: false,
    });
  };

  render() {
    const { loading, teachers } = this.props;
    const {
      appointmentStatus,
      appointmentStatusDialogVisible,
      teacherInfoDialogVisible,
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
          >{`[${record.teacherId}] - ${record.teacherName}`}</a>
        ),
      },
      {
        title: '提现周期',
        dataIndex: 'billingCycle',
        render: cycle => TEACHER_BILLING_CYCLE_MAP[cycle].name,
      },
      {
        title: '排课ID',
        dataIndex: 'schedule.id',
      },
      {
        title: '分配教室',
        dataIndex: 'schedule.roomId',
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
              onClick={() => { this.showStatusDialog(record.status); }}
            />
          </Tooltip>
        ),
      },
    ];

    const pageSize = teachers.pageSize || 10;
    const pagination = {
      total: teachers.total || 0,
      pageSize,
      current: teachers.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = teachers.result || [];

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
        />
        <Modal
          title="修改老师上课状态"
          visible={appointmentStatusDialogVisible}
          onOk={this.updateAppointmentStatus}
          onCancel={this.hideStatusDialog}
        >
          <AppointmentStatusForm status={appointmentStatus} />
        </Modal>
        <Modal
          visible={teacherInfoDialogVisible}
          title="老师信息"
          footer={null}
          onCancel={this.hideTeacherInfo}
          width={700}
        >
          <Spin spinning={loading}>
            <TeacherInfo />
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { course } = state;
  const { courses, loaded: coursesLoaded } = course;

  return {
    loading: false,
    filters: {},
    courses,
    coursesLoaded,
    teachers: {
      page: 1,
      pageSize: 10,
      total: 100,
      result: [
        {
          id: 0,
          teacherId: 0,
          teacherName: 'peter',
          billingCycle: 1,
          schedule: {
            id: 890,
            roomId: 737,
            courseId: 0,
            lessonId: 0,
            beginAt: 1498734824219,
            isInternal: true,
          },
          status: 0,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(TeacherAppointments);

