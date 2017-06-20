import React from 'react';
import {
  Icon,
  Table,
} from 'antd';

const STATUS = {
  IGNORE: 0,
  SENT: 1,
};

export default class GroupMessageResult extends React.Component {
  render() {
    const results = [
      {
        nickname: 'user 1',
        status: 0,
      },
      {
        nickname: 'user 2',
        status: 1,
      },
      {
        nickname: 'user 3',
        status: 1,
      },
      {
        nickname: 'user 4',
        status: 0,
      },
      {
        nickname: 'user 5',
        status: 1,
      },
      {
        nickname: 'user 6',
        status: 0,
      },
    ];

    const columns = [
      {
        title: '学生',
        dataIndex: 'nickname',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          const isMessageSent = status === STATUS.SENT;

          return (
            <span>
              <Icon
                type={
                  isMessageSent
                  ? 'check'
                  : 'info'
                }
                style={{
                  color: isMessageSent ? 'green' : 'grey',
                  marginRight: 8,
                }}
              />{ isMessageSent ? '发送成功' : '忽略' }
            </span>
          );
        },
      },
    ];

    return (
      <Table
        size="small"
        loading={false}
        pagination={false}
        columns={columns}
        dataSource={results}
      />
    );
  }
}

