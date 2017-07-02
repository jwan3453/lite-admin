import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
  Spin,
  Modal,
  Tooltip,
  Button,
} from 'antd';

import SearchForm from './SearchForm';
import TeacherInfo from '../../Common/TeacherInfo';
import VideoConferenceForm from '../../Common/VideoConferenceForm';
import * as CERT_STATUS from '../../../common/teacherCertStatus';

class SessionCerts extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
    certSteps: React.PropTypes.object,
  };

  static defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0,
    certSteps: {},
  }

  state = {
    teacherId: -1,
    teacherInfoModalVisible: false,
    conferenceDialogVisible: false,
  };

  search = (filters) => {
    //  todo
    console.log(filters);
  };

  showTeacherInfo = (teacherId) => {
    this.setState({
      teacherId,
      teacherInfoModalVisible: true,
    });
  };

  hideTeacherInfo = () => {
    this.setState({
      teacherId: -1,
      teacherInfoModalVisible: false,
    });
  };

  showConferenceDialog = () => {
    this.setState({
      conferenceDialogVisible: true,
    });
  };

  hideConferenceDialog = () => {
    this.setState({
      conferenceDialogVisible: false,
    });
  };

  render() {
    const {
      page,
      pageSize,
      total,
      loading,
      certSteps,
    } = this.props;

    const {
      teacherId,
      teacherInfoModalVisible,
    } = this.state;

    const pagination = {
      pageSize,
      current: page || 1,
      total: total || 0,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    const dataSource = certSteps.result || [];

    const columns = [
      {
        title: '资质名称',
        dataIndex: 'certTitle',
      },
      {
        title: '步骤名称',
        dataIndex: 'title',
      },
      {
        title: '老师',
        dataIndex: 'teacherName',
        render: (text, record) => (
          <a
            role="button"
            tabIndex="0"
            onClick={() => this.showTeacherInfo(record.teacherId)}
          >{`[${record.teacherId}] ${text}`}</a>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          const currentStatus = CERT_STATUS.STATUS_MAP[status];

          return (
            <Tag color={currentStatus.color}>{currentStatus.text}</Tag>
          );
        },
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <Tooltip title="编辑" placement="top">
            <Button
              icon="edit"
              onClick={
                () => { this.showConferenceDialog(record); }
              }
            />
          </Tooltip>
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          onSearch={this.search}
        />
        <Table
          rowKey="id"
          loading={loading}
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: 16 }}
        />
        <Modal
          visible={teacherInfoModalVisible}
          title="老师信息"
          footer={null}
          onCancel={this.hideTeacherInfo}
          width={700}
        >
          <Spin spinning={loading}>
            <TeacherInfo teacherId={teacherId} />
          </Spin>
        </Modal>
        <Modal
          title="待处理session"
          visible={this.state.conferenceDialogVisible}
          onOk={() => this.updateStepStatus()}
          onCancel={this.hideConferenceDialog}
        >
          <VideoConferenceForm
            ref={(node) => { this.videoConferenceForm = node; }}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    certSteps: {
      result: [
        {
          id: 1,
          teacherId: 1,
          teacherName: 'peter',
          title: 'step 1',
          certTitle: 'certification title',
          status: 20,
          type: 'session',
        },
        {
          id: 2,
          teacherId: 1,
          teacherName: 'peter',
          title: 'step 2',
          certTitle: 'certification title',
          status: 20,
          type: 'session',
        },
        {
          id: 3,
          teacherId: 1,
          teacherName: 'peter',
          title: 'step 3',
          certTitle: 'certification title',
          status: 20,
          type: 'session',
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(SessionCerts);

