import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import moment from 'moment';

class OperationLogs extends Component {
  static propTypes = {
    operationLogs: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    operationLogs: [],
  };
  render() {
    const columns = [
      {
        title: '记录时间',
        key: 'ctime',
        dataIndex: 'createdAt',
        render: createdAt => moment.unix(createdAt).format('Y-MM-DD HH:mm:ss'),
      },
      {
        title: '记录描述',
        key: 'description',
        dataIndex: 'description',
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.props.operationLogs}
        rowKey="id"
        size="small"
      />
    );
  }
}

export default connect()(OperationLogs);
