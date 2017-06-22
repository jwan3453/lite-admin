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
  };

  showStudentInfo = () => {
    //  todo
  };

  hideStudentInfo = () => {
    //  todo
  };

  showClassRoomInfo = () => {
    //  todo
  };

  hideClassRoomInfo = () => {
    //  todo
  };

  showReplyDialog = () => {
    this.setState({
      replyDialogVisible: true,
    });
  };

  hideReplyDialog = () => {
    this.setState({
      replyDialogVisible: false,
    });
  };

  reply = () => {
    const me = this;
    me.replyForm.validateFields((err, values) => {
      if (!err) {
        //  todo submit replay message
        console.log('replay messages', values);
        me.hideReplyDialog();
      }
    });
  };

  render() {
    const {
      loading,
      feedbacks,
    } = this.props;

    const columns = [
      {
        title: '用户',
        dataIndex: 'user',
        render: user => (
          <Tooltip title="查看用户信息" placement="top">
            <a
              role="button"
              tabIndex="0"
              onClick={() => { this.showStudentInfo(user); }}
            >{`[${user.id}] ${user.nickname}`}</a>
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
        render: () => (
          <ActionBar
            showReplyDialog={this.showReplyDialog}
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
          key={`open-${new Date()}`}
          title="回复用户反馈"
          visible={this.state.replyDialogVisible}
          onOk={this.reply}
          onCancel={this.hideReplyDialog}
        >
          <ReplyForm
            ref={(node) => { this.replyForm = node; }}
          />
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
        id: 0,
        user: {
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

