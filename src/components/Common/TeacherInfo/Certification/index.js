import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Tag,
  Modal,
  Popover,
  Steps,
  Timeline,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import * as CERTIFICATION_STATUS from './status';
import AssignCertificationForm from './assignCertificationForm';

const TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class Certification extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    certifications: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    certifications: [],
  };

  state = {
    dialogVisible: false,
  };

  render() {
    const {
      loading,
      certifications,
    } = this.props;

    const columns = [
      {
        title: '资质名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '认证进度',
        key: 'progress',
        dataIndex: 'steps',
        render: (steps) => {
          const finishedSteps = _.filter(
            steps
            , item => item.status === CERTIFICATION_STATUS.SUCCESSFUL);

          return (
            <Popover
              title="认证进度"
              content={
                <Steps
                  size="small"
                  direction="vertical"
                  current={finishedSteps.length}
                >
                  {
                    steps.map(item => (
                      <Steps.Step
                        key={item.id}
                        title={item.title}
                      />
                    ))
                  }
                </Steps>
              }
            ><a>{`${finishedSteps.length}/${steps.length}`}</a></Popover>
          );
        },
      },
      {
        title: '认证记录',
        key: 'steps',
        dataIndex: 'steps',
        render: (steps) => {
          const statistics = _.countBy(steps, 'status');
          const list = (
            <ul>
              {
                _.map(
                  _.filter(
                    CERTIFICATION_STATUS.STATUS
                    , item => item.value > 0)
                  , item => (
                    <li
                      style={{ color: item.color }}
                    >{`${statistics[item.value] || 0} ${item.text}`}</li>
                  ))
              }
            </ul>
          );
          const showPopover = _.some(steps, item => item.status > 0);

          return (
            !showPopover ?
              list
              : <Popover
                content={
                  <Timeline size="small">
                    {
                      steps.map((step) => {
                        const S = _.filter(
                          CERTIFICATION_STATUS.STATUS
                          , item => item.value === step.status);

                        return (
                          <Timeline.Item
                            key={step.id}
                            color={S.color}
                          >
                            <h3>{step.title}</h3>
                            {step.score > 0 && <p>分数：{step.score}</p>}
                          </Timeline.Item>
                        );
                      })
                    }
                  </Timeline>
                }
              >{list}</Popover>
          );
        },
      },
      {
        title: '待处理培训',
        key: 'session',
        render: () => '--',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (status, record) => {
          const expiration = record.expiration;
          const statusValue = expiration && moment().isAfter(expiration)
            ? CERTIFICATION_STATUS.EXPIRED
            : status;

          const currentStatus = _.find(
            CERTIFICATION_STATUS.STATUS
            , item => item.value === statusValue);

          return (
            <Tag color={currentStatus.color}>{currentStatus.text}</Tag>
          );
        },
      },
      {
        title: '认证获得时间',
        key: 'start',
        dataIndex: 'start',
        render: start => moment(new Date(start)).format(TIME_FORMAT),
      },
      {
        title: '过期时间',
        key: 'expiration',
        dataIndex: 'expiration',
        render: expiration => moment(new Date(expiration)).format(TIME_FORMAT),
      },
    ];

    return (
      <div>
        <Button
          type="primary"
          onClick={() => { this.setState({ dialogVisible: true }); }}
        >分配资质</Button>
        <Table
          rowKey="id"
          size="small"
          pagination={false}
          loading={loading}
          columns={columns}
          dataSource={certifications}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="分配资质"
          visible={this.state.dialogVisible}
          onOk={() => { this.assignCertification(); }}
          onCancel={() => { this.setState({ dialogVisible: false }); }}
        >
          <AssignCertificationForm />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    certifications: [
      {
        id: 0,
        name: 'PracticeTest1',
        steps: [
          {
            id: 0,
            title: 'step 1',
            type: 'ppt',
            status: 40,
            score: 0,
          },
          {
            id: 1,
            title: 'step 2',
            type: 'video',
            status: 20,
            score: 0,
          },
          {
            id: 2,
            title: 'step 3',
            type: 'session',
            status: 0,
            score: 0,
          },
          {
            id: 3,
            title: 'step 4',
            type: 'practice',
            status: 0,
            score: 0,
          },
        ],
        session: '',
        status: 10,
        start: 1481328000000,
        expiration: 1496822719505,
      },
    ],
  };
}

export default connect(mapStateToProps)(Certification);

