import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
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

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class VerificationCodes extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    codes: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    filters: {},
    codes: {},
    loading: false,
  };

  state = {
    studentId: 0,
    studentInfoModalVisible: false,
  };

  componentWillMount() {
    //  todo fetch verification codes
    const { filters } = this.props;
    console.log(filters);
  }

  handleSearch = (filters) => {
    //  todo
    console.log(filters);
  };

  handleChange = () => {};

  handleFetchMobile = () => {
    //  todo fetch mobile phone number
  };

  showStudentInfo = (studentId) => {
    console.log(studentId);
    this.setState({
      studentId,
      studentInfoModalVisible: true,
    });
  };

  render() {
    const {
      loading,
      codes,
    } = this.props;

    const columns = [
      {
        title: '用户',
        dataIndex: 'studentId',
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
        title: '手机尾号',
        dataIndex: 'mobileSuffix',
        render(mobileSuffix) {
          return (
            <Button
              size="small"
              icon="mobile"
              onClick={() => { this.handleFetchMobile(); }}
            >{mobileSuffix}</Button>
          );
        },
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
        dataIndex: 'ctime',
        render: ctime => moment(ctime).format(DATE_FORMAT),
      },
      {
        title: '过期时间',
        dataIndex: 'expired',
        render: expired => moment(expired).format(DATE_FORMAT),
      },
    ];

    const pageSize = codes.pageSize || 10;
    const pagination = {
      total: codes.total || 0,
      pageSize,
      current: codes.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = codes.result || [];

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

function mapStateToProps() {
  return {
    loading: false,
    filters: {},
    codes: {
      page: 1,
      total: 10,
      result: [
        {
          id: 1,
          studentId: 200,
          mobileSuffix: '1122',
          type: 0,
          code: 2033,
          ctime: 1498552174917,
          expired: 1498552174917,
        },
        {
          id: 2,
          studentId: 199,
          mobileSuffix: '8132',
          type: 1,
          code: 2033,
          ctime: 1498552174917,
          expired: 1498552174917,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(VerificationCodes);

