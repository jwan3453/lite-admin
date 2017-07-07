import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Progress,
  Button,
  Tooltip,
} from 'antd';

import * as TASK_STATUS from './status';

class TaskList extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    tasks: React.PropTypes.object,
  };

  static defaultProps = {
    tasks: {},
  };

  render() {
    const {
      loading,
      tasks,
    } = this.props;

    const pageSize = tasks.pageSize || 10;
    const pagination = {
      total: tasks.total || 0,
      pageSize,
      current: tasks.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        render: tags => tags.join(', '),
      },
      {
        title: '学生总数',
        dataIndex: 'studentCount',
      },
      {
        title: '已经发送',
        dataIndex: 'sent',
      },
      {
        title: '进度',
        key: 'progress',
        render: (text, record) => {
          const progress = Math.min(
            Math.floor(100 * record.sent / record.studentCount),
            100,
          );

          return (
            <Progress
              percent={progress}
            />
          );
        },
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => {
          const progress = Math.min(
            Math.floor(100 * record.sent / record.studentCount),
            100,
          );

          const currentStatus = record.status;

          return (
            progress !== 100
            ? (
              <Tooltip
                title={
                  currentStatus !== TASK_STATUS.PAUSED
                  ? '停止任务'
                  : '开始任务'
                }
                placement="top"
              >
                <Button
                  icon={
                    currentStatus !== TASK_STATUS.PAUSED
                    ? 'pause-circle'
                    : 'play-circle'
                  }
                />
              </Tooltip>
            ) : null
          );
        },
      },
    ];

    const dataSource = tasks.result || [];

    return (
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        pagination={pagination}
        dataSource={dataSource}
      />
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    tasks: {
      result: [
        {
          id: 1,
          tags: [
            'tag 1',
            'tag 2',
            'tag 3',
            'tag 4',
            'tag 5',
            'tag 6',
          ],
          studentCount: 100,
          sent: 45,
          status: 1,
        },
        {
          id: 2,
          tags: [
            'tag 1',
            'tag 3',
            'tag 5',
            'tag 6',
          ],
          studentCount: 47,
          sent: 1,
          status: 2,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(TaskList);

