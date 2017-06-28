import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tooltip,
  Modal,
  Spin,
} from 'antd';

import moment from 'moment';

import SearchForm from './SearchForm';
import StudentInfo from '../../Common/StudentInfo';

import {
  TYPE_MAP as VERIFICATION_TYPE_MAP,
} from './verificationTypes';

import {
  fetchVerificationCode,
} from '../../../app/actions/verificationCode';

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class VerificationCodes extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    verificationCodeData: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    filters: {},
    verificationCodeData: {},
    loading: false,
  };

  state = {
    studentId: 0,
    studentInfoModalVisible: false,
  };

  handleSearch = (filters = {}) => {
    const { dispatch } = this.props;
    dispatch(fetchVerificationCode(filters));
  };

  showStudentInfo = (studentId) => {
    this.setState({
      studentId,
      studentInfoModalVisible: true,
    });
  };

  handlePaginationChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      fetchVerificationCode(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  render() {
    const {
      loading,
      verificationCodeData,
    } = this.props;

    const columns = [
      {
        title: '用户',
        dataIndex: 'userId',
        render: studentId => (
          <Tooltip title="用户信息" placement="top">
            <a
              role="button"
              tabIndex="0"
              onClick={() => { this.showStudentInfo(studentId); }}
            >{studentId}</a>
          </Tooltip>
        ),
      },
      {
        title: '验证类型',
        dataIndex: 'type',
        render: type => VERIFICATION_TYPE_MAP[type].text,
      },
      {
        title: '验证码',
        dataIndex: 'code',
      },
      {
        title: '验证时间',
        dataIndex: 'createdAt',
        render: ctime => moment.unix(ctime).format(DATE_FORMAT),
      },
      {
        title: '过期时间',
        dataIndex: 'expiresAt',
        render: expired => moment.unix(expired).format(DATE_FORMAT),
      },
    ];

    const pageSize = verificationCodeData.pageSize || 10;
    const pagination = {
      total: verificationCodeData.total || 0,
      pageSize,
      current: verificationCodeData.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = verificationCodeData.result || [];

    const {
      studentId,
      studentInfoModalVisible,
    } = this.state;

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
        />
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          pagination={pagination}
          dataSource={dataSource}
          onChange={this.handlePaginationChange}
          style={{ marginTop: 16 }}
        />
        <Modal
          visible={studentInfoModalVisible}
          title="学生信息"
          footer={null}
          onCancel={
            () => this.setState({ studentInfoModalVisible: false })
          }
          width={700}
        >
          <Spin spinning={loading}>
            <StudentInfo studentId={studentId} />
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { verificationCode } = state;
  return {
    loading: verificationCode.loading,
    verificationCodeData: verificationCode.result,
    filters: verificationCode.filters,
  };
}

export default connect(mapStateToProps)(VerificationCodes);

