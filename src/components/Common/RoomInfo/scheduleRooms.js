import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';

class ScheduleRooms extends Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    roomId: React.PropTypes.number.isRequired,
    rooms: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  render() {
    const columns = [
      {
        title: '房间ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '预约人数',
        key: 'studentCount',
        render: room => (`${room.studentCount}/${room.maxStudentCount}`),
      },
      {
        title: '操作',
        key: 'operation',
        render: room => (<Button
          size="small"
          icon="swap"
          type="primary"
          ghost
          onClick={() => this.props.onChange(room.id)}
          disabled={this.props.roomId === room.id || room.studentCount >= room.maxStudentCount}
        />),
      },
    ];
    return (
      <Table
        loading={this.props.loading}
        columns={columns}
        dataSource={this.props.rooms}
        rowKey="id"
        size="small"
      />
    );
  }
}

export default connect((state) => {
  const { schedule, studentAppointment } = state;
  const { rooms } = schedule;
  const { loading } = studentAppointment;
  return {
    loading,
    rooms,
  };
})(ScheduleRooms);
