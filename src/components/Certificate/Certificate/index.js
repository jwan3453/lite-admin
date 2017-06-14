import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Modal,
} from 'antd';

import SearchForm from './SearchForm';
import ActionBar from './ActionBar';
import Cert from './Cert';

import {
  TYPE_MAP as CERT_TYPE_MAP,
} from '../../../common/certificationTypes';

import * as CERT_STATUS from '../../../common/certificationStatus';

class Certifications extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    certifications: React.PropTypes.array,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };

  static defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0,
    certifications: [],
  };

  state = {
    certDialogVisible: false,
    teachersDialogVisible: false,
    currentCert: null,
  };

  showCertDialog = (cert) => {
    this.setState({
      certDialogVisible: true,
      currentCert: cert,
    });
  };

  hideCertDialog = () => {
    this.setState({
      certDialogVisible: false,
      currentCert: null,
    });
  }

  showTeachersDialog = () => {
    this.setState({
      teachersDialogVisible: true,
    });
  };

  hideTeachersDialog = () => {
    this.setState({
      teachersDialogVisible: false,
    });
  };

  activate = (cert) => {
    //  todo set certification status to 1
    console.log(cert);
  };

  deactivate = (cert) => {
    //  todo set certification status to 0
    console.log(cert);
  };

  createCert = () => {
    //  todo create a new certification
  };

  invite = () => {
    //  todo invite a teacher to do this certification
  };

  render() {
    const {
      page,
      pageSize,
      total,
      loading,
      certifications,
    } = this.props;

    const pagination = {
      total: total || 0,
      pageSize,
      current: page || 1,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    const columns = [
      {
        title: '名称',
        key: 'title',
        dataIndex: 'title',
      },
      {
        title: '是否必须',
        key: 'required',
        dataIndex: 'required',
        render: required => (!required ? '否' : '是'),
      },
      {
        title: '报酬／单位',
        key: 'reward',
        dataIndex: 'reward',
      },
      {
        title: '有效期',
        key: 'validDays',
        dataIndex: 'validDays',
      },
      {
        title: '认证类型',
        key: 'type',
        dataIndex: 'type',
        render: type => CERT_TYPE_MAP[type].text,
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => CERT_STATUS.STATUS_MAP[status].text,
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, cert) => (
          <ActionBar
            isCertActivated={cert.status === CERT_STATUS.ACTIVATED}
            deleteCert={() => { this.deleteCert(cert); }}
            deactivateCert={() => { this.deactivateCert(cert); }}
            activateCert={() => { this.activateCert(cert); }}
            showTeachersDialog={this.showTeachersDialog}
            showCertDialog={() => { this.showCertDialog(cert); }}
            hideTeachersDialog={this.hideTeachersDialog}
            hideCertDialog={this.hideCertDialog}
          />
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          showCertDialog={this.showCertDialog}
        />
        <Table
          loading={loading}
          pagination={pagination}
          columns={columns}
          dataSource={certifications}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="创建资质"
          width={700}
          visible={this.state.certDialogVisible}
          onOk={this.createCert}
          onCancel={() => { this.setState({ certDialogVisible: false }); }}
        >
          <Cert />
        </Modal>
        <Modal
          title="选择老师"
          width={700}
          visible={this.state.teachersDialogVisible}
          onOk={this.invite}
          onCancel={() => { this.setState({ teachersDialogVisible: false }); }}
        >
          this is new teachers dialog
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    page: 1,
    pageSize: 10,
    total: 10,
    certifications: [
      {
        id: 0,
        title: '通用',
        required: true,
        reward: '0 / USD',
        validDays: 90,
        status: 0,
        type: 0,
      },
      {
        id: 1,
        title: 'ACTIVITY',
        required: true,
        reward: '0 / USD',
        validDays: 90,
        status: 1,
        type: 'App\\Models\\ActivityTemplate',
      },
      {
        id: 2,
        title: 'LESSON',
        required: true,
        reward: '0 / USD',
        validDays: 90,
        status: 1,
        type: 'App\\Models\\Lesson',
      },
    ],
  };
}

export default connect(mapStateToProps)(Certifications);

