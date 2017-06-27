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
import crmStatus from '../../../../common/crmStatus';
import BasicProfileForm from './ProfileForm';

import { fetchStudent, fetchMobile } from '../../../../app/actions/student';

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
    const currentCrmStatus = _.find(crmStatus, item =>
        item.value === studentInfo.crmStatus) || {};
    const assistant = _.find(adminUsers,
      admin => Number(admin.id) === Number(studentInfo.crmAssistantId)) || {};

    const labelProps = {
      span: 8,
      style: {
        color: '#999',
        textAlign: 'right',
      },
    };

    const contentProps = {
      span: 16,
    };

    return (
      <div>
        <Spin spinning={loading}>
          <Row style={{ lineHeight: '30px', padding: '0 16px' }}>
            <Col span={8}>
              <Row>
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
              </Row>
              <Row>
                <Col {...labelProps}>手机号码：</Col>
                <Col>
                  {
                    studentInfo.mobileSuffix
                    && <Button
                      size="small"
                      icon="mobile"
                      onClick={this.handleFetchMobile}
                    >{studentInfo.mobileSuffix}</Button>
                  }
                </Col>
              </Row>
              <Row>
                <Col {...labelProps}>所在地区：</Col>
                <Col>{studentInfo.places || '--'}</Col>
              </Row>
              <Row>
                <Col {...labelProps}>来源渠道：</Col>
                <Col>{studentInfo.source}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col {...labelProps}>昵称：</Col>
                <Col>{studentInfo.nickname || '--'}</Col>
              </Row>
              <Row>
                <Col {...labelProps}>所属组：</Col>
                <Col>{studentInfo.group || '--'}</Col>
              </Row>
              <Row>
                <Col {...labelProps}>所属助教：</Col>
                <Col>{assistant.nickname}</Col>
              </Row>
              <Row>
                <Col {...labelProps}>课程级别：</Col>
                <Col>{studentInfo.level || '未分级'}</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col {...labelProps}>性别：</Col>
                <Col>{['', '男', '女'][studentInfo.gender]}</Col>
              </Row>
              <Row>
                <Col {...labelProps}>年龄：</Col>
                <Col>{studentInfo.age}</Col>
              </Row>
              <Row>
                <Col {...labelProps}>CRM状态：</Col>
                <Col>{currentCrmStatus.name}</Col>
              </Row>
            </Col>
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
