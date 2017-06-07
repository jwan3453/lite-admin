import React from 'react';
import { connect } from 'react-redux';
import { Spin, Tag, Select, Icon, Table, Modal } from 'antd';

import status from '../../../common/lessonStatus';
import { fetchCourses } from '../../../app/actions/course';

const mapStatusToColor = (value) => {
  let color = '';
  switch (value) {
    case 1:
      color = 'yellow';
      break;
    case 4:
      color = 'green';
      break;
    case 6:
      color = 'gray';
      break;
    case 10:
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
  };

  static defaultProps = {
    loading: false,
    courses: [],
  };

  componentWillMount() {
    const { dispatch, courseLoaded } = this.props;
    if (!courseLoaded) dispatch(fetchCourses());
  }

  handleCourseChange = () => {
    //  todo handle course change
  };

  handleSkipChapter = () => {
    Modal.confirm({
      title: 'Confirm',
      content: '此操作不可逆，确定要跳过整个章节？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log('skip all lessons of this chapter');
      },
    });
  };

  handleToggleLessonStatus = (lesson) => {
    console.log(lesson);
  };

  render() {
    const { loading, courses } = this.props;

    const dataSource = courses[1] === undefined ? [] : courses[1].chapters;

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
                color={statusColors[lesson.status]}
                style={{ minWidth: 40, textAlign: 'center' }}
                onClick={() => this.handleToggleLessonStatus(lesson)}
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
            {courses.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          {statusTags.map(item => <Tag color={item.color}>{item.name}</Tag>)}
        </div>
        <div>
          <Table
            size="small"
            rowKey="id"
            pagination={false}
            columns={columns}
            dataSource={dataSource}
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
  const { loaded, courses } = course;
  return {
    courseLoaded: loaded,
    courses,
  };
}

export default connect(mapStateToProps)(LessonStatus);
