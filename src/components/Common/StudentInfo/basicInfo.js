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
  Message,
} from 'antd';
import _ from 'lodash';
import crmStatus from '../../../common/crmStatus';

import GiftForm from './giftForm';
import BasicProfileForm from './basicProfileForm';

import { fetchStudent, fetchMobile } from '../../../app/actions/student';

class StudentBasicInfo extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    studentId: React.PropTypes.number.isRequired,
    studentInfo: React.PropTypes.object.isRequired,
    mobile: React.PropTypes.object.isRequired,
    adminUsers: React.PropTypes.array.isRequired,
  };

  state = {
    giftDialogVisible: false,
    profileDialogVisible: false,
  };

  componentWillMount() {
    const { dispatch, studentId } = this.props;
    if (studentId > 0) {
      dispatch(fetchStudent(studentId));
    }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchStudent(nextProps.studentId));
    }
  }
  handleChangeProfile = () => {
    // todo update user profile
  };

  handlePasswordResetConfirm = () => {
    // todo reset user password
  };

  handleFetchMobile = () => {
    const { dispatch, studentId } = this.props;
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
    const { studentInfo, loading, adminUsers } = this.props;

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

    const currentCrmStatus = _.find(crmStatus, item =>
        item.value === studentInfo.crmStatus) || {};
    const assistant = _.find(adminUsers,
      admin => _.toInteger(admin.id) === studentInfo.crmAssistantId) || {};

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
            <Col {...contentProps}>{['', '男', '女'][studentInfo.gender]}</Col>
            <Col {...labelProps}>手机号码：</Col>
            <Col {...contentProps}>
              {studentInfo.mobileSuffix && <Button
                size="small"
                icon="mobile"
                onClick={this.handleFetchMobile}
              >{studentInfo.mobileSuffix}</Button>}
            </Col>
            <Col {...labelProps}>所属组：</Col>
            <Col {...contentProps}>{studentInfo.group || '--'}</Col>
            <Col {...labelProps}>年龄：</Col>
            <Col {...contentProps}>{studentInfo.age}</Col>
            <Col {...labelProps}>所在地区：</Col>
            <Col {...contentProps}>{studentInfo.places || '--'}</Col>
            <Col {...labelProps}>所属助教：</Col>
            <Col {...contentProps}>{assistant.nickname}</Col>
            <Col {...labelProps}>CRM状态：</Col>
            <Col {...contentProps}>{currentCrmStatus.name}</Col>
            <Col {...labelProps}>来源渠道：</Col>
            <Col {...contentProps}>{studentInfo.source}</Col>
            <Col {...labelProps}>课程级别：</Col>
            <Col {...contentProps}>{studentInfo.level || '未分级'}</Col>
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
        ><GiftForm /></Modal>
      </div>
    );
  }
}

export default connect((state) => {
  const { student, admin } = state;
  const { loading, studentInfo, mobile } = student;
  const { result } = studentInfo;
  return {
    loading,
    studentInfo: result,
    mobile,
    adminUsers: admin.users,
  };
})(StudentBasicInfo);
