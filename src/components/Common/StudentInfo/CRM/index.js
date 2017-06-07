import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Switch,
  Popconfirm,
  Modal,
  Select,
  Spin,
  Icon,
  Pagination,
  Timeline,
} from 'antd';

import CreateCommentForm from './crmCommentForm';
import crmStatus from '../../../../common/crmStatus';

class Crm extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    crmData: React.PropTypes.array,
    loading: React.PropTypes.bool,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };

  static defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
    user: {},
    crmData: [],
  };

  state = {
    dialogVisible: false,
    showLessonReview: false,
  };

  fetchCrmData = () => {
    //  todo
  };

  removeComment = () => {
    //  todo
  };

  showDialog = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  createComment = () => {
    //  todo
  };

  toggleLessonReview = () => {
    this.setState({
      showLessonReview: !this.state.showLessonReview,
    });
  };

  updateCrmStatus = () => {
    //  todo
  };

  render() {
    const {
      user,
      crmData,
      loading,
      page,
      pageSize,
      total,
    } = this.props;

    return (
      <div>
        <div>
          <Select
            style={{ width: '100%', marginBottom: 10 }}
            value={user.crmStatus}
            onChange={() => this.updateCrmStatus()}
          >
            {
              crmStatus.map(item => (
                <Select.Option
                  key={item.value}
                  value={item.value}
                >{item.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <div>
          <Button
            onClick={this.showDialog}
            type="primary"
            style={{ marginRight: 8 }}
          >新增备注</Button>
          <Switch
            checked={this.state.showLessonReview}
            onChange={this.toggleLessonReview}
            checkedChildren="显示"
            unCheckedChildren="隐藏"
          />
          <span>课后评价</span>
        </div>
        <Spin spinning={loading}>
          <Timeline
            style={{ marginTop: 15 }}
          >
            {
              crmData.map(item => (
                <Timeline.Item
                  dot={<Icon type="message" />}
                >
                  <div
                    style={{ marginBottom: 16 }}
                  >
                    {`${item.assignee.name} ${moment(new Date(item.ctime)).format('YYYY-MM-DD hh:mm:ss')}`}
                    <Popconfirm
                      okText="删除"
                      cancelText="取消"
                      title="真的要删掉这条备注吗？"
                      placement="right"
                      onConfirm={() => this.removeComment(item)}
                    >
                      <Button
                        icon="delete"
                        size="small"
                        type="primary"
                        style={{ marginLeft: 8 }}
                      >删除</Button>
                    </Popconfirm>
                  </div>
                  <div
                    style={{ marginBottom: 16 }}
                  >{item.comment}</div>
                </Timeline.Item>
              ))
            }
          </Timeline>
        </Spin>
        <div>
          <Pagination
            showQuickJumper
            current={page}
            pageSize={pageSize}
            onChange={this.fetchCrmData}
            total={total}
            showTotal={all => `共 ${all} 条`}
            size="small"
          />
        </div>
        <Modal
          title="添加备注"
          okText="添加"
          cancelText="取消"
          visible={this.state.dialogVisible}
          onOk={() => { this.createComment(); }}
          onCancel={() => { this.setState({ dialogVisible: false }); }}
        >
          <CreateCommentForm />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    user: {
      id: 0,
      crmStatus: 4,
    },
    page: 1,
    pageSize: 10,
    total: 3,
    crmData: [
      {
        id: 0,
        assignee: {
          id: 0,
          name: '未知管理员',
        },
        comment: '测试comment',
        ctime: 1496744026822,
      },
      {
        id: 1,
        assignee: {
          id: 0,
          name: '未知管理员',
        },
        comment: '测试comment',
        ctime: 1496744026822,
      },
      {
        id: 2,
        assignee: {
          id: 0,
          name: '未知管理员',
        },
        comment: '测试comment',
        ctime: 1496744026822,
      },
      {
        id: 3,
        assignee: {
          id: 0,
          name: '未知管理员',
        },
        comment: '测试comment',
        ctime: 1496744026822,
      },
      {
        id: 4,
        assignee: {
          id: 0,
          name: '未知管理员',
        },
        comment: '测试comment',
        ctime: 1496744026822,
      },
    ],
  };
}

export default connect(mapStateToProps)(Crm);

