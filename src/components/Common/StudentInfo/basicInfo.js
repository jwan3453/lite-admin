import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Spin,
  Button,
  Tooltip,
  Popconfirm,
  Modal,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import crmStatus from '../../../common/crmStatus';
import BasicProfileForm from './basicProfileForm';

class StudentBasicInfo extends Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    studentInfo: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    loading: false,
    studentInfo: {},
  };

  state = {
    giftDialogVisible: false,
    profileDialogVisible: false,
  };

  handleChangeProfile = () => {
    // todo update user profile
  };

  handlePasswordResetConfirm = () => {
    // todo reset user password
  };

  render() {
    const { studentInfo, loading } = this.props;

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

    const currentCrmStatus = _.find(crmStatus, item => item.value === studentInfo.crm.status);

    return (
      <div>
        <Spin spinning={loading}>
          <Row style={{ lineHeight: '30px', padding: '0 16px' }}>
            <Col {...labelProps}>用户编号：</Col>
            <Col {...contentProps}>{studentInfo.id}
              <Popconfirm
                title="操作不可逆，确定继续？"
                onConfirm={this.handlePasswordResetConfirm}
              >
                <Tooltip title="重置密码">
                  <Button
                    icon="lock"
                    size="small"
                    style={{ marginLeft: 5 }}
                  />
                </Tooltip>
              </Popconfirm>
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
            <Col {...contentProps}>{studentInfo.nickname || '--'}</Col>
            <Col {...labelProps}>性别：</Col>
            <Col {...contentProps}>{studentInfo.gender || '--'}</Col>
            <Col {...labelProps}>手机号码：</Col>
            <Col {...contentProps}>{studentInfo.phone || '--'}</Col>
            <Col {...labelProps}>所属组：</Col>
            <Col {...contentProps}>{studentInfo.group || '--'}</Col>
            <Col {...labelProps}>出生日期：</Col>
            <Col {...contentProps}>{studentInfo.birthDay ? moment(new Date(studentInfo.birthDay)).format('YYYY-MM-DD') : '--'}</Col>
            <Col {...labelProps}>所在地区：</Col>
            <Col {...contentProps}>{studentInfo.contact.address || '--'}</Col>
            <Col {...labelProps}>所属助教：</Col>
            <Col {...contentProps}>{studentInfo.assistant.nickname}</Col>
            <Col {...labelProps}>CRM状态：</Col>
            <Col {...contentProps}>{currentCrmStatus.name}</Col>
            <Col {...labelProps}>来源渠道：</Col>
            <Col {...contentProps}>{studentInfo.funnel || '--'}</Col>
            <Col {...labelProps}>课程级别：</Col>
            <Col {...contentProps}>{studentInfo.level || '--'}</Col>
            <Col {...labelProps}>沟通类型：</Col>
            <Col {...contentProps}>{studentInfo.contact.type || '--'}</Col>
            <Col {...labelProps}>联系IM：</Col>
            <Col {...contentProps}>{studentInfo.contact.im || '--'}</Col>
            <Col {...labelProps}>累计购买：</Col>
            <Col {...contentProps}>{studentInfo.hours.sum.toFixed(1)}</Col>
            <Col {...labelProps}>剩余可用：</Col>
            <Col {...contentProps}>{studentInfo.hours.available.toFixed(1)}
              <Tooltip
                title="赠送课时"
              >
                <Button
                  icon="credit-card"
                  style={{ marginLeft: 5 }}
                  onClick={() => this.setState({ giftDialogVisible: true })}
                />
              </Tooltip>
            </Col>
            <Col {...labelProps}>总奖学金：</Col>
            <Col {...contentProps}>{studentInfo.scholarship.sum}</Col>
            <Col {...labelProps}>可用奖学金：</Col>
            <Col {...contentProps}>{studentInfo.scholarship.available}</Col>
          </Row>
        </Spin>
        <Modal
          title="修改信息"
          visible={this.state.profileDialogVisible}
          onOk={this.handleChangeProfile}
          onCancel={() => this.setState({ profileDialogVisible: false })}
        >
          <BasicProfileForm />
        </Modal>
        <Modal
          title="赠送课程"
          visible={this.state.giftDialogVisible}
          onOk={this.handleSendGift}
          onCancel={() => this.setState({ giftDialogVisible: false })}
        >gift form here</Modal>
      </div>
    );
  }
}

export default connect(() => ({
  loading: false,
  studentInfo: {
    id: 200,
    nickname: '',
    gender: '',
    phone: 15060731122,
    group: [''],
    birthDay: 1496369892291,
    assistant: {
      id: 2000,
      nickname: 'lgchen',
    },
    crm: {
      status: 0,
    },
    funnel: 0,
    level: '',
    wechat: {
      id: '',
      status: 0,
    },
    contact: {
      type: '',
      im: '',
      address: '',
    },
    hours: {
      sum: 100,
      available: 100,
    },
    scholarship: {
      sum: 0,
      available: 0,
    },
  },
}))(StudentBasicInfo);
