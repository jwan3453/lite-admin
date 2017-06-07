import React, { Component } from 'react';
import { Table, Modal, Spin, Button, Message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import SearchForm from './SearchForm';
import StudentInfo from '../../Common/StudentInfo';

import crmStatus from '../../../common/crmStatus';
import { manageStudent, fetchMobile } from '../../../app/actions/student';

class StudentList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    adminUsers: React.PropTypes.array.isRequired,
    filters: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
    mobile: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    adminUsers: [],
    filters: {},
    students: {},
  };
  state = {
    studentId: 0,
    studentInfoModalVisible: false,
  };
  componentWillMount() {
    const { dispatch, filters } = this.props;
    dispatch(manageStudent(filters));
  }
  handleSearch = (filters) => {
    const { dispatch } = this.props;
    dispatch(manageStudent(filters));
  };
  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      manageStudent(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };
  handleShowStudentInfo = (studentId) => {
    this.setState({
      studentId,
      studentInfoModalVisible: true,
    });
  };

  handleFetchMobile = (studentId) => {
    const { dispatch } = this.props;
    dispatch(fetchMobile(studentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        const { mobile } = this.props;
        Modal.info({
          content: `用户${mobile.studentId}手机号为: ${mobile.result}`,
        });
      }
    });
  };

  render() {
    const { students } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        render: studentId => (
          <a
            role="button"
            tabIndex={studentId}
            onClick={() => this.handleShowStudentInfo(studentId)}
          >
            {studentId}
          </a>
        ),
      },
      {
        title: '手机尾号',
        key: 'mobileSuffix',
        width: 80,
        render: student => (student.mobileSuffix ? <Button
          size="small"
          icon="mobile"
          onClick={() => this.handleFetchMobile(student.id)}
        >
          {student.mobileSuffix}
        </Button> : <span />),
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 100,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 60,
        render: gender => ['', '男', '女'][gender],
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 60,
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        width: 80,
      },
      {
        title: '所属组',
        dataIndex: 'groupName',
        key: 'groupName',
        width: 100,
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
        render: (crmStatusId) => {
          const status = _.find(crmStatus, { value: Number(crmStatusId) });
          if (status) {
            return status.name;
          }
          return '';
        },
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
        render: registerAt => moment.unix(registerAt).format('Y-MM-DD HH:mm'),
      },
    ];

    const pageSize = students.pageSize || 10;
    const pagination = {
      total: students.total || 0,
      pageSize,
      current: students.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = students.result || [];
    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          assistants={this.props.adminUsers}
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
          visible={this.state.studentInfoModalVisible}
          title="学生信息"
          footer={null}
          onCancel={() => this.setState({ studentInfoModalVisible: false })}
          width={700}
        >
          <Spin spinning={this.props.loading}>
            <StudentInfo studentId={this.state.studentId} />
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { student, admin } = state;
  const { loading, manage, mobile } = student;
  const { filters, result } = manage;

  return {
    loading,
    filters,
    students: result,
    adminUsers: admin.users,
    mobile,
  };
}

export default connect(mapStateToProps)(StudentList);
