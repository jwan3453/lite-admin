import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Modal,
  Tag,
  Tooltip,
  Message,
  Spin,
} from 'antd';

import moment from 'moment';

import ActionBar from './ActionBar';
import SearchForm from './SearchForm';
import ReplyForm from './ReplyForm';
import TicketForm from '../../Common/TicketForm';
import StudentInfo from '../../Common/StudentInfo';
import RoomInfo from '../../Common/RoomInfo';

import { fetchStudentFeedback, updateStudentFeedback } from '../../../app/actions/studentFeedback';
import { createTicket } from '../../../app/actions/ticket';
import { fetchRoom } from '../../../app/actions/room';

import {
  STATUS_MAP as PROGRESS_STATUS_MAP,
} from './progressStatus';

import {
  STATUS_MAP as FOLLOW_STATUS_MAP,
} from './followStatus';

import {
  STATUS_MAP as USEFUL_STATUS_MAP,
} from './usefulStatus';

class Feedback extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    feedbackResult: React.PropTypes.object,
    currentClassRoom: React.PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    feedbackResult: {},
    currentClassRoom: {},
  };

  state = {
    replyDialogVisible: false,
    studentDialogVisible: false,
    currentFeedback: null,
    currentStudent: {
      id: -1,
    },
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchStudentFeedback());
  }


  showStudentInfo = (studentId) => {
    this.setState({
      studentDialogVisible: true,
      currentStudent: { id: studentId },
    });
  };

  hideStudentInfo = () => {
    this.setState({
      studentDialogVisible: false,
      currentStudent: { id: -1 },
    });
  };

  showClassRoomInfo = (roomId) => {
    const { dispatch } = this.props;
    if (roomId) {
      dispatch(fetchRoom(roomId));
      this.setState({
        classRoomDialogVisible: true,
      });
    }
  };

  hideClassRoomInfo = () => {
    this.setState({
      classRoomDialogVisible: false,
      currentClassRoom: { id: -1 },
    });
  };

  showReplyDialog = (currentFeedback) => {
    this.setState({
      replyDialogVisible: true,
      currentFeedback,
    });
  };

  hideReplyDialog = () => {
    this.setState({
      replyDialogVisible: false,
      currentFeedback: null,
    });
  };

  showTicketDialog = (currentFeedback) => {
    this.setState({
      ticketDialogVisible: true,
      currentFeedback,
    });
  };

  hideTicketDialog = () => {
    this.setState({
      ticketDialogVisible: false,
      currentFeedback: null,
    });
  };

  reply = () => {
    const me = this;
    const { currentFeedback } = me.state;
    const { dispatch } = this.props;

    me.replyForm.validateFields((err, values) => {
      if (!err) {
        const data = {};
        if (values.reply) {
          data.result = values.reply;
        }

        if (values.wechatNotice) {
          data.isSendWxMessage = values.wechatNotice;
        }

        dispatch(updateStudentFeedback(currentFeedback.id, data)).then((result) => {
          if (result.code) {
            Message.error(result.message);
          } else {
            Message.success('回复成功');
            me.hideReplyDialog();

            dispatch(fetchStudentFeedback());
          }
        });
      }
    });
  };

  handleCreateTicket = (ticket) => {
    const { dispatch } = this.props;
    const {
      currentFeedback,
    } = this.state;
    dispatch(createTicket({ ...ticket }, currentFeedback.studentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        dispatch(updateStudentFeedback(currentFeedback.id, { ticketId: result.response.id }))
          .then((updateResult) => {
            if (updateResult.code) {
              Message.error(updateResult.message);
            } else {
              this.hideTicketDialog();
              Message.success('创建工单成功');
            }
          });
      }
    });
  };

  handleSearch = (data) => {
    const { dispatch } = this.props;
    dispatch(fetchStudentFeedback(data));
  };

  handleSetUseful = (ticket) => {
    const { dispatch } = this.props;
    dispatch(updateStudentFeedback(ticket.id, { isUseful: true })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('设置成功');
        dispatch(fetchStudentFeedback());
      }
    });
  };

  handleChangeFollowStatus = (feedback, statusKey) => {
    const { dispatch } = this.props;
    dispatch(updateStudentFeedback(feedback.id, { followStatus: statusKey })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('跟进状态修改成功');
        dispatch(fetchStudentFeedback());
      }
    });
  };

  render() {
    const {
      loading,
      feedbackResult,
      currentClassRoom,
    } = this.props;

    const {
      currentFeedback,
      currentStudent,
    } = this.state;

    const pageSize = feedbackResult.pageSize || 10;
    const dataSource = feedbackResult.result || [];
    const pagination = {
      total: feedbackResult.total || 0,
      pageSize,
      current: feedbackResult.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: '用户',
        dataIndex: 'studentId',
        render: studentId => (
          <Tooltip title="查看用户信息" placement="top">
            <a
              role="button"
              tabIndex="0"
              onClick={() => { this.showStudentInfo(studentId); }}
            >{`[${studentId}]`}</a>
          </Tooltip>
        ),
      },
      {
        title: '上课时间',
        dataIndex: 'beginAt',
        render: beginAt => moment(beginAt).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '老师',
        dataIndex: 'teacherId',
        render: teacherId => `[${teacherId}]`,
      },
      {
        title: '教室',
        dataIndex: 'roomId',
        render: roomId => (
          <Tooltip title="课堂详情" placement="top">
            <a
              role="button"
              tabIndex="0"
              onClick={() => { this.showClassRoomInfo(roomId); }}
            >{roomId}</a>
          </Tooltip>
        ),
      },
      {
        title: '各项评分',
        dataIndex: 'rating',
        render: (rating, feedback) => (
          <div>
            <p>综合评分：{feedback.rating}分</p>
            <p>教师评分：{feedback.teacherRating}分</p>
            <p>系统评分：{feedback.systemRating}分</p>
          </div>
        ),
      },
      {
        title: '反馈内容',
        dataIndex: 'review',
      },
      {
        title: '处理/跟进/有效状态',
        dataIndex: 'status',
        render: (status, feedback) => {
          const useful = USEFUL_STATUS_MAP[feedback.isUseful];
          const progress = PROGRESS_STATUS_MAP[feedback.status];
          const follow = FOLLOW_STATUS_MAP[feedback.followStatus];

          return (
            <div>
              <Tag color={progress.color}>{progress.text}</Tag>
              <Tag color={follow.color}>{follow.text}</Tag>
              <Tag color={useful.color}>{useful.text}</Tag>
            </div>
          );
        },
      },
      {
        title: '处理人',
        dataIndex: 'adminId',
        render: adminId => `[${adminId}]`,
      },
      {
        title: '处理结果',
        dataIndex: 'result',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, feedback) => (
          <ActionBar
            showReplyDialog={() => { this.showReplyDialog(feedback); }}
            showTicketDialog={() => { this.showTicketDialog(feedback); }}
            setUserful={() => { this.handleSetUseful(feedback); }}
            onFollowStatusChanged={
              (newStatus) => { this.handleChangeFollowStatus(feedback, newStatus); }}
          />
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          search={this.handleSearch}
        />
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
        <Modal
          key={`student-feedback-reply-${new Date()}`}
          title="回复用户反馈"
          maskClosable={false}
          visible={this.state.replyDialogVisible}
          footer={null}
          onCancel={this.hideReplyDialog}
        >
          <ReplyForm
            ref={(node) => { this.replyForm = node; }}
            onSubmit={this.reply}
          />
        </Modal>
        <Modal
          key={
            `student-feedback-ticket-${
              !currentFeedback
                ? 'empty'
                : currentFeedback.id
            }`
          }
          title="新建工单"
          maskClosable={false}
          visible={this.state.ticketDialogVisible}
          onCancel={this.hideTicketDialog}
          footer={null}
        >
          <TicketForm
            studentInputDisabled
            ticket={
              TicketForm.getEmptyTicket({
                studentId: !currentFeedback ? null : currentFeedback.studentId,
              })
            }
            ref={(node) => { this.ticketForm = node; }}
            onSubmit={this.handleCreateTicket}
          />
        </Modal>
        <Modal
          width={700}
          key={
            `student-feedback-studentInfo-${
              !currentStudent
                ? 'empty'
                : currentStudent.id
            }`
          }
          title="学生信息"
          maskClosable={false}
          visible={this.state.studentDialogVisible}
          onOk={this.hideStudentInfo}
          onCancel={this.hideStudentInfo}
        >
          <StudentInfo studentId={currentStudent.id} />
        </Modal>
        <Modal
          width={700}
          key={
            `student-feedback-classRoomInfo-${
              !currentClassRoom
                ? 'empty'
                : currentClassRoom.id
            }`
          }
          title="课堂详情"
          maskClosable={false}
          visible={this.state.classRoomDialogVisible}
          onOk={this.hideClassRoomInfo}
          onCancel={this.hideClassRoomInfo}
        >
          <Spin spinning={this.props.loading}>
            <RoomInfo
              roomInfo={currentClassRoom}
            />
          </Spin>
        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { studentFeedback, room } = state;
  const { roomInfo } = room;
  return {
    loading: studentFeedback.loading || room.loading,
    feedbackResult: studentFeedback.result,
    filters: studentFeedback.filters,
    adminUsers: [],
    currentClassRoom: roomInfo,
  };
}

export default connect(mapStateToProps)(Feedback);

