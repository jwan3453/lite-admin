import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Spin,
} from 'antd';
import moment from 'moment';

class StudentBasicInfo extends Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    studentInfo: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    loading: false,
    studentInfo: {},
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

    return (
      <Spin spinning={loading}>
        <Row style={{ lineHeight: '30px', padding: '0 16px' }}>
          <Col {...labelProps}>用户编号：</Col>
          <Col {...contentProps}>{studentInfo.id}</Col>
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
          <Col {...contentProps}>{studentInfo.crm.status}</Col>
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
          <Col {...contentProps}>{studentInfo.hours.available.toFixed(1)}</Col>
          <Col {...labelProps}>总奖学金：</Col>
          <Col {...contentProps}>{studentInfo.scholarship.sum}</Col>
          <Col {...labelProps}>可用奖学金：</Col>
          <Col {...contentProps}>{studentInfo.scholarship.available}</Col>
        </Row>
      </Spin>
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
