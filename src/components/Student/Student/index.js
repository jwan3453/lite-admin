import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';

import { fetchAdmins } from '../../../app/actions/admin';

class StudentList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    adminUsers: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    adminUsers: [],
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchAdmins());
  }
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '手机号',
        dataIndex: 'mobileSuffix',
        key: 'mobileSuffix',
        width: 100,
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '所属组',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '助教',
        dataIndex: 'assistantName',
        key: 'assistantName',
      },
      {
        title: '跟进类型',
        dataIndex: 'crmType',
        key: 'crmType',
      },
      {
        title: '课程级别',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '注册渠道',
        dataIndex: 'source',
        key: 'source',
      },
      {
        title: '注册时间',
        dataIndex: 'registerAt',
        key: 'registerAt',
      },
    ];

    const dataSource = [];
    return (
      <div>
        <SearchForm
          onSearch={filters => console.log(filters)}
          assistants={this.props.adminUsers}
        />
        <Table
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={false}
          bordered
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { student, admin } = state;

  return {
    loading: student.loading,
    adminUsers: admin.users,
  };
}

export default connect(mapStateToProps)(StudentList);
