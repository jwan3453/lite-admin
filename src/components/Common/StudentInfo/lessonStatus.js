import React from 'react';
import { connect } from 'react-redux';
import {
  Spin,
  Tag,
  Radio,
  Icon,
  Table,
  Modal,
} from 'antd';

import status from '../../../common/lessonStatus';

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
      color = 'lighter-gray';
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
    loading: React.PropTypes.bool,
    course: React.PropTypes.object,
    courses: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    course: {},
    courses: [],
  };

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

  render() {
    const {
      loading,
      course,
      courses,
    } = this.props;

    const dataSource = courses[0].chapters;

    const columns = [
      {
        title: 'chapter',
        key: 'name',
        dataIndex: 'name',
        render: (name, record) => (
          <a
            tabIndex="0"
            role="button"
            onClick={() => this.handleSkipChapter(record)}
          >{name}</a>
        ),
      },
      {
        title: 'lesson status',
        key: 'lessons',
        dataIndex: 'lessons',
        render: lessons => (
          <div>
            {
              lessons.map(lesson => (
                <Tag color={statusColors[lesson.status]}>{lesson.name}</Tag>
              ))
            }
          </div>
        ),
      },
    ];

    return (
      <Spin
        spinning={loading}
      >
        <div>
          <Radio.Group
            onChange={this.handleCourseChange}
            value={course.id}
            style={{ marginRight: 10 }}
          >
            {
              courses.map(item => (
                <Radio.Button
                  key={item.id}
                  value={item.id}
                >{item.name}
                </Radio.Button>
              ))
            }
          </Radio.Group>
          {
            statusTags.map(item => (
              <Tag color={item.color}>{item.name}</Tag>
            ))
          }
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
            <Icon type="info-circle" style={{ color: '#108ee9', marginRight: '8px' }} />{ '点击课时：未完成->跳过，预约->暂无处理，已完成->重学，跳过->未完成，重学->已完成' }</p>
          <p style={{ paddingLeft: 8 }}>
            <Icon type="info-circle" style={{ color: '#108ee9', marginRight: '8px' }} />{ '点击章节跳过整个章节，此操作不可逆' }</p>
        </div>
      </Spin>
    );
  }
}


function mapStateToProps() {
  return {
    loading: false,
    course: {
      id: 0,
    },
    courses: [
      {
        id: 0,
        name: 'G1',
        chapters: [
          {
            id: 0,
            name: 'My School',
            lessons: [
              {
                id: 0,
                name: '1-1',
                status: 10,
              },
              {
                id: 1,
                name: '1-2',
                status: 6,
              },
              {
                id: 2,
                name: '1-3',
                status: 4,
              },
              {
                id: 3,
                name: '1-4',
                status: 1,
              },
              {
                id: 4,
                name: '1-5',
                status: 0,
              },
              {
                id: 5,
                name: '1-6',
                status: 0,
              },
              {
                id: 6,
                name: '1-7',
                status: 0,
              },
              {
                id: 7,
                name: '1-8',
                status: 0,
              },
              {
                id: 8,
                name: '1-9',
                status: 0,
              },
            ],
          },
          {
            id: 1,
            name: 'My Home',
            lessons: [
              {
                id: 0,
                name: '2-1',
                status: 0,
              },
              {
                id: 1,
                name: '2-2',
                status: 0,
              },
              {
                id: 2,
                name: '2-3',
                status: 0,
              },
              {
                id: 3,
                name: '2-4',
                status: 0,
              },
              {
                id: 4,
                name: '2-5',
                status: 0,
              },
              {
                id: 5,
                name: '2-6',
                status: 0,
              },
              {
                id: 6,
                name: '2-7',
                status: 0,
              },
              {
                id: 7,
                name: '2-8',
                status: 0,
              },
              {
                id: 8,
                name: '2-9',
                status: 0,
              },
            ],
          },
          {
            id: 3,
            name: 'Toy Factory',
            lessons: [
              {
                id: 0,
                name: '3-1',
                status: 0,
              },
              {
                id: 1,
                name: '3-2',
                status: 0,
              },
              {
                id: 2,
                name: '3-3',
                status: 0,
              },
              {
                id: 3,
                name: '3-4',
                status: 0,
              },
              {
                id: 4,
                name: '3-5',
                status: 0,
              },
              {
                id: 5,
                name: '3-6',
                status: 0,
              },
              {
                id: 6,
                name: '3-7',
                status: 0,
              },
              {
                id: 7,
                name: '3-8',
                status: 0,
              },
            ],
          },
          {
            id: 4,
            name: 'Closthing Shop',
            lessons: [
              {
                id: 0,
                name: '4-1',
                status: 0,
              },
            ],
          },
          {
            id: 5,
            name: 'My House',
            lessons: [
              {
                id: 0,
                name: '5-1',
                status: 0,
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: 'G2',
        chapters: [
          {},
        ],
      },
      {
        id: 2,
        name: 'G3',
        chapters: [
          {},
        ],
      },
    ],
  };
}

export default connect(mapStateToProps)(LessonStatus);

