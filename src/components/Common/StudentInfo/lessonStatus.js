import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Spin, Tag, Select, Icon, Table, Modal, Message, Checkbox } from 'antd';

import status from '../../../common/lessonStatus';
import { fetchCourses, fetchUserCourse, updateUserLessonStatus, fetchUserCourseActive, updateUserCourseActive } from '../../../app/actions/course';

const mapStatusToColor = (value) => {
  let color = '';
  switch (value) {
    case 'booked':
      color = 'yellow';
      break;
    case 'done':
      color = 'green';
      break;
    case 'skipped':
      color = 'gray';
      break;
    case 'reset':
      color = 'orange';
      break;
    default:
      color = '';
      break;
  }
  return color;
};

const statusTags = status.map((item) => {
  const { value, name } = item;
  const color = mapStatusToColor(value);
  return {
    value,
    name,
    color,
  };
});

const allowedOptions = [
  { currentStatus: 'none', ToStatus: 'skipped' },
  { currentStatus: 'skipped', ToStatus: 'none' },
  { currentStatus: 'done', ToStatus: 'reset' },
  { currentStatus: 'reset', ToStatus: 'done' },
];

const statusColors = {};
status.forEach((item) => {
  statusColors[item.value] = mapStatusToColor(item.value);
});

class LessonStatus extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    courseLoaded: React.PropTypes.bool.isRequired,
    courses: React.PropTypes.array,
    userCourse: React.PropTypes.object,
    studentId: React.PropTypes.number.isRequired,
    userActiveCourseIds: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    courses: [],
    userCourse: {},
    userActiveCourseIds: [],
  };

  state = {
    selectedCourseId: null,
  };

  componentWillMount() {
    const { dispatch, courseLoaded, studentId } = this.props;
    if (!courseLoaded) dispatch(fetchCourses());
    this.setState({ selectedCourseId: null });
    dispatch(fetchUserCourseActive(studentId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId, courseLoaded } = this.props;
    if (!courseLoaded) dispatch(fetchCourses());
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      this.setState({ selectedCourseId: null });
      dispatch(fetchUserCourseActive(nextProps.studentId));
    }
  }

  getLessonStatus = (lessonId) => {
    const { userCourse } = this.props;
    if (_.isEmpty(userCourse)) {
      return 'none';
    }

    const lesson = _.assign({ status: 'none' }, _.find(userCourse, { lessonId }));
    return lesson.status;
  };

  handleCourseChange = (value) => {
    this.setState({ selectedCourseId: value });
    const { dispatch, studentId } = this.props;

    dispatch(fetchUserCourse(studentId, value)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      }
    });
  };

  handleToggleLessonStatus = (lesson) => {
    const { dispatch, studentId } = this.props;
    const { selectedCourseId } = this.state;
    const currentStatus = this.getLessonStatus(lesson.id);
    const operation = _.find(allowedOptions, { currentStatus });
    if (operation === undefined) { return; }
    dispatch(updateUserLessonStatus(studentId, this.state.selectedCourseId, lesson.id,
      { status: operation.ToStatus })).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          Message.success('更改状态成功');
          dispatch(fetchUserCourse(studentId, selectedCourseId));
        }
      });
  };

  handleSkipChapter = (record) => {
    const { dispatch, studentId } = this.props;
    const { selectedCourseId } = this.state;
    const getLessonStatus = lessonId => this.getLessonStatus(lessonId);

    Modal.confirm({
      title: 'Confirm',
      content: '此操作不可逆，确定要跳过整个章节？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        let hasError = false;
        const promises = [];

        record.lessons.forEach((lesson) => {
          const currentStatus = getLessonStatus(lesson.id);
          if (currentStatus !== 'none') {
            hasError = true;
            return;
          }

          const operation = _.find(allowedOptions, { currentStatus });
          if (operation === undefined) { return; }
          promises.push(dispatch(updateUserLessonStatus(studentId, selectedCourseId, lesson.id,
            { status: operation.ToStatus })));
        });
        global.Promise.all(promises).then((values) => {
          values.forEach((result) => {
            if (result.code) {
              hasError = true;
              Message.error(result.message);
            }
          });
          if (!hasError) {
            Message.success('更改状态成功');
          }
          dispatch(fetchUserCourse(studentId, selectedCourseId));
        });
      },
    });
  };

  handleActiveChange = (e) => {
    const { dispatch, studentId } = this.props;
    const { selectedCourseId } = this.state;
    dispatch(updateUserCourseActive(studentId, selectedCourseId,
      { active: e.target.checked })).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          Message.success('更改状态成功');
          dispatch(fetchUserCourseActive(studentId));
        }
      });
  }

  isCourseActive = () => {
    const { userActiveCourseIds } = this.props;
    const { selectedCourseId } = this.state;
    return _.isEmpty(userActiveCourseIds) ?
      false : userActiveCourseIds.includes(selectedCourseId);
  }

  render() {
    const { loading, courses } = this.props;
    const { selectedCourseId } = this.state;
    const course = _.find(courses, c => c.id === selectedCourseId) || {};

    const columns = [
      {
        title: '课程单元',
        key: 'name',
        dataIndex: 'name',
        render: (name, record) => (
          <a
            tabIndex="0"
            role="button"
            onClick={() => this.handleSkipChapter(record)}
          >
            {name}
          </a>
        ),
      },
      {
        title: '学习进度',
        key: 'lessons',
        dataIndex: 'lessons',
        render: lessons => (
          <div>
            {lessons.map(lesson => (
              <Tag
                color={statusColors[this.getLessonStatus(lesson.id)]}
                style={{ minWidth: 40, textAlign: 'center' }}
                onClick={() => this.handleToggleLessonStatus(lesson)}
                key={lesson.id}
              >
                {lesson.name}
              </Tag>
            ))}
          </div>
        ),
      },
    ];

    return (
      <Spin spinning={loading}>
        <div>
          <Select
            size="small"
            onChange={this.handleCourseChange}
            style={{ marginRight: 10, width: 200 }}
          >
            {courses && courses.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          {statusTags.map(item => <Tag color={item.color} key={item.name}>{item.name}</Tag>)}
          <Checkbox
            size="small"
            onChange={this.handleActiveChange}
            checked={this.isCourseActive()}
          >在学</Checkbox>
        </div>
        <div>
          <Table
            size="small"
            rowKey="id"
            pagination={false}
            columns={columns}
            dataSource={course.chapters}
            style={{ marginTop: 16, marginBottom: 16 }}
          />
        </div>
        <div>
          <p style={{ paddingLeft: 8 }}>
            <Icon
              type="info-circle"
              style={{ color: '#108ee9', marginRight: '8px' }}
            />
            {'点击课时：未完成<->跳过，已完成<->重学'}
          </p>
          <p style={{ paddingLeft: 8 }}>
            <Icon
              type="info-circle"
              style={{ color: '#108ee9', marginRight: '8px' }}
            />
            {'点击章节：跳过整个章节(不可逆)'}
          </p>
        </div>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  const { course } = state;
  const { loaded, courses, userCourse, userActiveCourseIds } = course;
  return {
    courseLoaded: loaded,
    courses,
    userCourse,
    userActiveCourseIds,
  };
}

export default connect(mapStateToProps)(LessonStatus);
