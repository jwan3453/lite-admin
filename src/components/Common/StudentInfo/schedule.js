import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table,
  Button,
  Popconfirm,
  Tooltip,
  Modal,
} from 'antd';

import RoomInfo from '../RoomInfo/';

class Schedule extends Component {
  static propTypes = {
    schedules: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    schedules: {},
  };

  state = {
    roomId: 0,
    roomInfoDialogTitle: '',
    roomInfoDialogVisible: false,
  };

  handleSend = () => {
    //  todo 补发课后评价消息
  };

  handleHideRoomDialog = () => {
    //  todo
    this.setState({
      roomInfoDialogVisible: false,
    });
  };

  handleRoomClick = (room, lesson) => {
    //  todo 分配教室
    this.setState({
      roomInfoDialogTitle: `房间：${room.id} ${lesson.course.name} ${lesson.name}`,
      roomInfoDialogVisible: true,
    });
  };

  render() {
    const { schedules, loading } = this.props;
    const dataSource = schedules.result || [];
    const pageSize = schedules.pageSize || 10;
    const pagination = {
      total: schedules.total || 0,
      pageSize,
      current: schedules.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: '排课ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '课程名称',
        key: 'lesson',
        dataIndex: 'lesson',
        render: lesson => `${lesson.course.name} ${lesson.name}`,
      },
      {
        title: '上课老师',
        key: 'teacher',
        dataIndex: 'teacher',
        render: teacher => teacher.nickname || '--',
      },
      {
        title: '上课时间',
        key: 'beginAt',
        dataIndex: 'beginAt',
        render: begin => (begin ? moment(new Date(begin)).format('YYYY-MM-DD hh:mm:ss') : '--'),
      },
      {
        title: '分配教室',
        key: 'roomId',
        dataIndex: 'room',
        render: (room, record) => (
          <a
            role="button"
            tabIndex={0}
            onClick={() => this.handleRoomClick(room, record.lesson)}
          >{room.id}</a>
        ),
      },
      {
        title: '班型',
        key: 'roomType',
        dataIndex: 'room',
        render: room => room.type,
      },
      {
        title: '内部课程',
        key: 'internal',
        dataIndex: 'internal',
        render: internal => (internal ? <span style={{ color: '#5cb85c' }}>是</span> : '否'),
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: () => '上课完成',
      },
      {
        title: '操作',
        key: 'operation',
        render: record => (
          <Popconfirm
            title="操作不可逆，确认继续？"
            onConfirm={() => this.handleSend(record)}
          >
            <Tooltip
              title="补发课后评价消息"
            >
              <Button icon="notification" />
            </Tooltip>
          </Popconfirm>
        ),
      },
    ];

    return (
      <div>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
        <Modal
          title={this.state.roomInfoDialogTitle}
          visible={this.state.roomInfoDialogVisible}
          onCancel={this.handleHideRoomDialog}
          footer={[
            <Button
              type="primary"
              size="large"
              onClick={this.handleHideRoomDialog}
            >隐藏</Button>,
          ]}
        >
          <RoomInfo />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    schedules: {
      result: [
        {
          id: 99,
          room: {
            id: 71,
            type: '4人班',
          },
          lesson: {
            id: 0,
            name: '1-7',
            course: {
              id: 0,
              name: 'G1',
            },
          },
          teacher: {
            id: 0,
            nickname: 'Megan',
          },
          beginAt: 1496397430283,
          internal: true,
          status: 1,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(Schedule);

