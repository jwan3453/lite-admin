import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button, Modal, Message } from 'antd';
import moment from 'moment';

import FindStudentModal from '../FindStudentModal';

import { addStudent } from '../../../app/actions/room';

class StudentAppointments extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    roomId: React.PropTypes.number.isRequired,
    studentAppointments: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    dispatch: () => {},
    roomId: 0,
    studentAppointments: [],
  };
  state = {
    findStudentModalVisible: false,
    selectedStudents: [],
  };
  handleApplyAddStudent = () => {
    this.setState({
      findStudentModalVisible: true,
    });
  };
  handleSelectedStudentsChange = (selectedStudents) => {
    this.setState({ selectedStudents });
  };
  handleAddStudent = () => {
    const { dispatch, roomId } = this.props;
    const { selectedStudents } = this.state;
    if (roomId && selectedStudents.length) {
      selectedStudents.map(studentId =>
        dispatch(addStudent(roomId, studentId)).then((result) => {
          if (result.code) {
            Message.error(result.message);
          }
        }),
      );
    }
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
      <div>
        <Row type="flex" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Button
              size="small"
              icon="plus"
              onClick={this.handleApplyAddStudent}
            >
              添加学生
            </Button>
          </Col>
          <Col>
            <Button size="small" icon="check">全部标记完成</Button>
          </Col>
          <Col>
            <Button size="small" icon="exception">全部标记异常</Button>
          </Col>
          <Col>
            <Button size="small" icon="notification">全部发送异常通知</Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={this.props.studentAppointments}
          rowKey="id"
          size="small"
        />
        <Modal
          title="添加学生"
          visible={this.state.findStudentModalVisible}
          onOk={this.handleAddStudent}
          onCancel={() => this.setState({ findStudentModalVisible: false })}
        >
          <FindStudentModal
            onSelectedRowsChange={this.handleSelectedStudentsChange}
          />
        </Modal>
      </div>
    );
  }
}

export default connect()(StudentAppointments);
