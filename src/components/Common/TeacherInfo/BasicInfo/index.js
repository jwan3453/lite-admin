import React from 'react';
import { connect } from 'react-redux';
import {
  Spin,
  Row,
  Col,
  Tooltip,
  Button,
  Modal,
} from 'antd';
import _ from 'lodash';

import ProfileForm from './profileForm';
import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../../common/teacherStatus';
import level from '../../../../common/levels';
import {
  CYCLE_MAP as BILLING_CYCLE_MAP,
} from '../../../../common/teacherBillingCycle';

const CURRENCIES = [
  {
    value: 0,
    name: '美元',
  },
];

const COUNTRIES = [
  {
    value: 1,
    name: '美国',
  },
  {
    value: 2,
    name: '加拿大',
  },
];

class BasicInfo extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    teacherInfo: React.PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    teacherInfo: {},
  };

  state = {
    profileDialogVisible: false,
  };

  handleUpdateProfile = () => {};

  render() {
    const {
      loading,
      teacherInfo,
    } = this.props;

    const labelProps = {
      span: 3,
      offset: 0,
      style: {
        color: '#999',
        textAlign: 'right',
      },
    };

    const contentProps = {
      span: 5,
    };

    const currentStatus = TEACHER_STATUS_MAP[teacherInfo.status];

    const currentCurrency = _.find(
      CURRENCIES
      , item => item.value === teacherInfo.salary.currency.id);

    const currentLevel = _.find(
      level
      , item => item.value === teacherInfo.level);

    const currentBillingCycle = BILLING_CYCLE_MAP[teacherInfo.salary.billingCycle];

    const currentNationality = _.find(
      COUNTRIES
      , item => item.value === teacherInfo.nationality.id);

    const currentCountry = _.find(
      COUNTRIES
      , item => item.value === teacherInfo.country.id);

    return (
      <div>
        <Spin spinning={loading}>
          <Row
            style={{ lineHeight: '30px', padding: '0 16px' }}
          >
            <Col {...labelProps}>老师编号：</Col>
            <Col {...contentProps}>{teacherInfo.id}
              <Tooltip title="修改信息">
                <Button
                  icon="edit"
                  size="small"
                  style={{ marginLeft: 5 }}
                  onClick={() => this.setState({ profileDialogVisible: true })}
                />
              </Tooltip>
            </Col>
            <Col {...labelProps}>昵称：</Col>
            <Col {...contentProps}>{teacherInfo.nickname || '--'}</Col>
            <Col {...labelProps}>性别：</Col>
            <Col {...contentProps}>{['', '男', '女'][teacherInfo.gender]}</Col>
            <Col {...labelProps}>状态：</Col>
            <Col {...contentProps}>{`${currentStatus.value}-${currentStatus.text}`}</Col>
            <Col {...labelProps}>级别：</Col>
            <Col {...contentProps}>{currentLevel.name}</Col>
            <Col {...labelProps}>邮箱：</Col>
            <Col {...contentProps}>
              {
                teacherInfo.contact.email.length > 0
                ? teacherInfo.contact.email
                : '--'
              }
            </Col>
            <Col {...labelProps}>手机号码：</Col>
            <Col {...contentProps}>
              {
                teacherInfo.contact.phone.length > 0
                ? teacherInfo.contact.phone
                : '--'
              }
            </Col>
            <Col {...labelProps}>联系方式：</Col>
            <Col {...contentProps}>
              {
                teacherInfo.contact.im.length > 0
                ? teacherInfo.contact.im
                : '--'
              }
            </Col>
            <Col {...labelProps}>课时薪酬：</Col>
            <Col {...contentProps}>{teacherInfo.salary.amount}</Col>
            <Col {...labelProps}>薪酬币种：</Col>
            <Col {...contentProps}>{currentCurrency.name || '--'}</Col>
            <Col {...labelProps}>提现周期：</Col>
            <Col {...contentProps}>{currentBillingCycle.name || '--'}</Col>
            <Col {...labelProps}>国籍：</Col>
            <Col {...contentProps}>{currentNationality.name || '--'}</Col>
            <Col {...labelProps}>所在国家：</Col>
            <Col {...contentProps}>{currentCountry.name || '--'}</Col>
            <Col {...labelProps}>联系地址：</Col>
            <Col {...contentProps}>{teacherInfo.address || '--'}</Col>
          </Row>
        </Spin>
        <Modal
          title="修改信息"
          visible={this.state.profileDialogVisible}
          onOk={this.handleUpdateProfile}
          onCancel={() => this.setState({ profileDialogVisible: false })}
        >
          <ProfileForm />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    teacherInfo: {
      id: 100,
      nickname: 'lcr',
      status: 1,
      level: 1,
      comment: '',
      gender: 1,
      contact: {
        im: '467756187',
        phone: '19867157278',
        email: '',
      },
      nationality: {
        id: 1,
      },
      address: '',
      country: {
        id: 1,
      },
      salary: {
        amount: 8,
        currency: {
          id: 0,
        },
        billingCycle: 1,
      },
    },
  };
}

export default connect(mapStateToProps)(BasicInfo);

