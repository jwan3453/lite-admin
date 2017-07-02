import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
  Popover,
  Steps,
  Spin,
  Modal,
} from 'antd';

import _ from 'lodash';
import moment from 'moment';

import SearchForm from './SearchForm';
import TeacherInfo from '../../Common/TeacherInfo';
import * as CERT_STATUS from '../../../common/teacherCertStatus';

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class TeacherCerts extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
    certifications: React.PropTypes.object,
  };

  static defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0,
    certifications: {},
  }

  state = {
    teacherId: -1,
    teacherInfoModalVisible: false,
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

  render() {
    const {
      page,
      pageSize,
      total,
      loading,
      certifications,
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

    const dataSource = certifications.result || [];

    const columns = [
      {
        title: '资质名称',
        dataIndex: 'certTitle',
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
        title: '认证进度',
        key: 'progress',
        render: (record) => {
          const { status, steps } = record;
          const finishedSteps = _.filter(
            steps,
            item => item.status === CERT_STATUS.SUCCESSFUL,
          );

          const stepsStatusMap = {
            [CERT_STATUS.ASSIGNED]: 'process',
            [CERT_STATUS.IN_PROGRESS]: 'process',
            [CERT_STATUS.FAILED]: 'error',
            [CERT_STATUS.SUCCESSFUL]: 'finished',
          };

          const popoverContent = (
            <Steps
              size="small"
              direction="vertical"
              status={
                !stepsStatusMap[status]
                ? 'wait'
                : stepsStatusMap[status]
              }
              current={finishedSteps.length}
            >
              {
                steps.map(
                  step => (
                    <Steps.Step
                      key={step.id}
                      title={step.title}
                    />
                  ),
                )
              }
            </Steps>
          );

          return (
            <Popover
              title="认证进度"
              content={popoverContent}
            >{`${finishedSteps.length}/${steps.length}`}</Popover>
          );
        },
      },
      {
        title: '待处理培训',
        key: 'session',
        render: (record) => {
          const { steps } = record;
          console.log('progress', steps);
          return (
            <div>this is session</div>
          );
        },
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
        title: '认证获得时间',
        dataIndex: 'acquireAt',
        render: time => moment(time).format(DATE_FORMAT),
      },
      {
        title: '过期时间',
        dataIndex: 'expireAt',
        render: time => moment(time).format(DATE_FORMAT),
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
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    certifications: {
      result: [
        {
          certTitle: 'PracticeTest3',
          teacherId: 1,
          teacherName: 'peter',
          steps: [
            {
              id: 1,
              title: 'step 1',
              status: 10,
            },
            {
              id: 2,
              title: 'step 2',
              status: 30,
            },
            {
              id: 3,
              title: 'step 3',
              status: 20,
            },
            {
              id: 4,
              title: 'step 4',
              status: 40,
            },
          ],
          status: 30,
          acquireAt: 1497507794000,
          expireAt: 1505283794000,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(TeacherCerts);

