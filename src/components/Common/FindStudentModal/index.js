import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import SearchForm from './SearchForm';

import crmStatus from '../../../common/crmStatus';
import { fetchAdmins } from '../../../app/actions/admin';
import { fetchStudents } from '../../../app/actions/student';

class StudentList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    adminUsers: React.PropTypes.array.isRequired,
    filters: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    adminUsers: [],
    filters: {},
    students: {},
  };
  componentWillMount() {
    const { dispatch, filters } = this.props;
    dispatch(fetchAdmins());
    dispatch(fetchStudents(filters));
  }
  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(fetchStudents(Object.assign(filters, {
      page: pagination.current,
      pageSize: pagination.pageSize,
    })));
  }
  render() {
    const { students } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '手机尾号',
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
        dataIndex: 'gender',
        key: 'gender',
        render: gender => (['', '男', '女'][gender]),
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
        dataIndex: 'crmAssistantId',
        key: 'crmAssistantId',
      },
      {
        title: '跟进类型',
        dataIndex: 'crmStatus',
        key: 'crmType',
        render: crmStatusId => crmStatus[crmStatusId],
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
        render: registerAt => moment(registerAt * 1000).format('Y-MM-DD HH:mm'),
      },
    ];

    const pagination = {
      total: students.total || 0,
      pageSize: students.pageSize || 10,
      current: students.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = students.result || [];
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
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { student, admin } = state;
  const { loading, manage } = student;
  const { filters, result } = manage;

  return {
    loading,
    filters,
    students: result,
    adminUsers: admin.users,
  };
}

export default connect(mapStateToProps)(StudentList);
