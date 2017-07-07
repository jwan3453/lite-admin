import React, { Component } from 'react';
import { Table, Button, Modal, Spin } from 'antd';
import { connect } from 'react-redux';

import SearchForm from './SearchForm';
import TeacherInfo from '../../Common/TeacherInfo';
import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';

import { searchTeacher } from '../../../app/actions/teacher';

export class TeacherList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    teachers: React.PropTypes.object.isRequired,
    filters: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    teachers: {},
    filters: {},
  };

  state = {
    dialogVisible: false,
    currentTeacherId: null,
  };

  handleSearch = (filters) => {
    const { dispatch } = this.props;
    dispatch(searchTeacher(filters));
  };

  handleEdit = (record) => {
    console.log('handle edit action', record);
  };

  handleLock = (record) => {
    console.log('handle lock action', record);
  };

  handleGettingInfo = (teacherId) => {
    if (teacherId) {
      this.setState({
        dialogVisible: true,
        currentTeacherId: teacherId,
      });
    }
  };

  handleChange = (pagination) => {
    const { dispatch, filters, loading } = this.props;
    if (loading) return;
    Object.assign(filters, {
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
    dispatch(searchTeacher(filters));
  };

  render() {
    const { teachers } = this.props;
    const dataSource = teachers.result || [];
    const pageSize = teachers.pageSize || 10;
    const pagination = {
      total: teachers.total || 0,
      pageSize,
      current: teachers.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    console.log('loging...loading', this.props.loading);
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        render: (text, record, index) => (
          <a role="button" tabIndex={index} onClick={() => this.handleGettingInfo(record.id)}>{text}</a>
        ),
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '姓',
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: '名',
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: '课程级别',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: gender => ['', '男', '女'][gender],
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          const currentStatus = TEACHER_STATUS_MAP[status];
          return currentStatus.text;
        },
      },
      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
      },
      {
        title: '状态更改时间',
        dataIndex: 'statusChangeTime',
        key: 'statusChangeTime',
      },
      {
        title: '课时薪酬',
        dataIndex: 'salary',
        key: 'salary',
      },
      {
        title: '提现周期',
        dataIndex: 'billingtype',
        key: 'billingtype',
      },
      {
        title: '提现账号',
        dataIndex: 'billingaccount',
        key: 'billingaccount',
      },
      {
        title: '操作',
        key: 'actions',
        className: 'actions',
        render: (text, record) => (
          <Button
            icon="lock"
            size="default"
            onClick={() => this.handleLock(record)}
          />
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          pageSize={pageSize}
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
        <Modal
          visible={this.state.dialogVisible}
          title="老师信息"
          footer={null}
          onCancel={() => this.setState({ dialogVisible: false })}
          width={700}
        >
          <Spin spinning={this.props.loading}>
            <TeacherInfo
              teacherId={this.state.currentTeacherId}
            />
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { teacher } = state;
  const { search, loading } = teacher;
  return {
    loading,
    teachers: search.result,
    filters: search.filters,
  };
}

export default connect(mapStateToProps)(TeacherList);
