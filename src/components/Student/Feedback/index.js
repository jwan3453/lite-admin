import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Modal,
  Tag,
  Tooltip,
} from 'antd';

import moment from 'moment';

import ActionBar from './ActionBar';
import SearchForm from './SearchForm';
import ReplyForm from './ReplyForm';
import TicketForm from '../../Common/TicketForm';
import StudentInfo from '../../Common/StudentInfo';

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
    loading: React.PropTypes.bool.isRequired,
    feedbacks: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    feedbacks: [],
  };

  state = {
    replyDialogVisible: false,
    studentDialogVisible: false,
    currentFeedback: {},
    currentStudent: {
      id: -1,
    },
  };

  showStudentInfo = (currentStudent) => {
    this.setState({
      studentDialogVisible: true,
      currentStudent,
    });
  };

  hideStudentInfo = () => {
    this.setState({
      studentDialogVisible: false,
      currentStudent: { id: -1 },
    });
  };

  showClassRoomInfo = () => {
    //  todo
  };

  hideClassRoomInfo = () => {
    //  todo
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

    me.replyForm.validateFields((err, values) => {
      if (!err) {
        //  todo submit replay message
        console.log('replay messages', values, currentFeedback);
        me.hideReplyDialog();
      }
    });
  };

  createTicket = () => {
    //  todo
    const ticket = this.ticketForm.getFieldsValue();
    console.log('createTicket', ticket);
  };

  render() {
    const {
      loading,
      feedbacks,
    } = this.props;

    const {
      currentFeedback,
      currentStudent,
    } = this.state;

    const columns = [
      {
        title: '用户',
        dataIndex: 'student',
        render: student => (
          <Tooltip title="查看用户信息" placement="top">
            <a
              role="button"
              tabIndex="0"
              onClick={() => { this.showStudentInfo(student); }}
            >{`[${student.id}] ${student.nickname}`}</a>
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
        dataIndex: 'teacher',
        render: teacher => `[${teacher.id}] ${teacher.nickname}`,
      },
      {
        title: '教室',
        dataIndex: 'classRoom',
        render: classRoom => (
          <Tooltip title="课堂详情" placement="top">
            <a
              role="button"
              tabIndex="0"
              onClick={() => { this.showClassRoomInfo(classRoom); }}
            >{classRoom.id}</a>
          </Tooltip>
        ),
      },
      {
        title: '各项评分',
        dataIndex: 'rating',
        render: rating => (
          <div>
            <p>综合评分：{rating.average}分</p>
            <p>教师评分：{rating.teacher}分</p>
            <p>系统评分：{rating.system}分</p>
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
        render: (status, record) => {
          const useful = USEFUL_STATUS_MAP[record.isUseful];
          const progress = PROGRESS_STATUS_MAP[status.progress];
          const follow = FOLLOW_STATUS_MAP[status.follow];

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
        dataIndex: 'assignee',
        render: assignee => `[${assignee.id}] ${assignee.nickname}`,
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
          />
        ),
      },
    ];

    return (
      <div>
        <SearchForm />
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={feedbacks}
          style={{ marginTop: 16 }}
        />
        <Modal
          key={`student-feedback-reply-${new Date()}`}
          title="回复用户反馈"
          maskClosable={false}
          visible={this.state.replyDialogVisible}
          onOk={this.reply}
          onCancel={this.hideReplyDialog}
        >
          <ReplyForm
            ref={(node) => { this.replyForm = node; }}
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
          onOk={this.createTicket}
          onCancel={this.hideTicketDialog}
        >
          <TicketForm
            ref={(node) => { this.ticketForm = node; }}
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
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    feedbacks: [
      {
        id: 1,
        student: {
          id: 0,
          nickname: 'user 1',
        },
        beginAt: 1498096330482,
        teacher: {
          id: 0,
          nickname: 'peter',
        },
        classRoom: {
          id: 0,
        },
        rating: {
          average: 5,
          teacher: 5,
          system: 5,
        },
        review: '反馈内容',
        status: {
          progress: 10,
          follow: 0,
        },
        isUseful: 1,
        assignee: {
          id: 0,
          nickname: 'ylc',
        },
        result: '',
      },
    ],
  };
}

export default connect(mapStateToProps)(Feedback);

