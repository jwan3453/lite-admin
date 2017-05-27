import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button } from 'antd';
import moment from 'moment';

class StudentAppointments extends Component {
  static propTypes = {
    // roomId: React.PropTypes.number.isRequired,
    studentAppointments: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    // roomId: 0,
    studentAppointments: [],
  };
  render() {
    const columns = [
      {
        title: '预约ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '学生ID',
        key: 'studentId',
        dataIndex: 'studentId',
      },
      {
        title: '邀请人',
        key: 'inviterIds',
        dataIndex: 'inviterIds',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: '预约时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: createdAt => moment(createdAt * 1000).format('Y-MM-DD HH:mm'),
      },
      {
        title: '操作',
        key: 'operation',
        render: () => <div />,
      },
    ];
    return (
      <Table
        title={() => (
          <Row type="flex" gutter={16}>
            <Col>
              <Button size="small" icon="plus">添加学生</Button>
            </Col>
            <Col>
              <Button size="small" icon="check">全部标记完成</Button>
            </Col>
            <Col>
              <Button size="small" icon="exception">全部标记异常</Button>
            </Col>
            <Col>
              <Button size="small"icon="notification">全部发送异常通知</Button>
            </Col>
          </Row>
          )}
        columns={columns}
        dataSource={this.props.studentAppointments}
        rowKey="id"
        size="small"
      />
    );
  }
}

export default connect()(StudentAppointments);
