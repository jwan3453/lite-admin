import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

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
        title: '记录ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: 'operatorType',
        key: 'operatorType',
        dataIndex: 'operatorType',
      },
      {
        title: 'operatorId',
        key: 'operatorId',
        dataIndex: 'operatorId',
      },
      {
        title: 'description',
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
