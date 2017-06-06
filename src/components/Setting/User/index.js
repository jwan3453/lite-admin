import React, { Component } from 'react';
import {
  Table,
  Button,
  Icon,
  Modal,
  Message,
  Switch,
  Popconfirm,
  Tooltip,
} from 'antd';
import { connect } from 'react-redux';

import {
  createAdmin,
  manageAdmins,
  updateAdminPassword,
  updateAdminNonce,
  enableAdmin,
} from '../../../app/actions/admin';
import CreateUserForm from './CreateUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const roles = [
  { id: 10, name: '超级管理员' },
  { id: 20, name: '管理员' },
  { id: 30, name: '课程设计' },
  { id: 100, name: '培训组长' },
  { id: 110, name: '培训师' },
  { id: 200, name: '招聘组织' },
  { id: 210, name: '招聘员' },
  { id: 300, name: '助教组长' },
  { id: 310, name: '助教' },
  { id: 400, name: '教务组长' },
  { id: 410, name: '教务' },
  { id: 500, name: 'IT支持' },
  { id: 600, name: '财务' },
  { id: 700, name: '市场营销' },
  { id: 9999, name: '其他' },
];

const USER_STATUS_ENABLED = 2;

function roleIdToName(id) {
  const filtered = roles.filter(role => role.id === id);
  if (filtered.length > 0) {
    return filtered[0].name;
  }

  return id;
}

class UserList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    users: React.PropTypes.array,
    filters: React.PropTypes.object,
  };

  static defaultProps = {
    users: [],
    filters: {},
  };

  state = {
    visible: false,
    updatingPassword: false,
    currentUser: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(manageAdmins());
  }

  handleCreateUser = (data) => {
    const { dispatch } = this.props;
    dispatch(createAdmin(data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建成功');
      }
    });
  };

  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      manageAdmins(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  handleEnableUser = (userId, enabled) => {
    const { dispatch } = this.props;
    dispatch(enableAdmin(userId, enabled)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('更改激活状态成功');
      }

      dispatch(manageAdmins());
    });
  };

  handleUpdatePassword = (data) => {
    const { dispatch } = this.props;
    dispatch(updateAdminPassword(this.state.currentUser.id, data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('更改密码成功');
      }
    });
  };

  handleUpdateNonceSecret = (userId) => {
    const { dispatch } = this.props;
    dispatch(updateAdminNonce(userId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.info(
          `userId: ${userId}, url: ${result.response.url}, code: ${result.response.secret}`,
          60,
        );
      }
    });
  };

  render() {
    const btnProps = {
      size: 'small',
      type: 'primary',
      ghost: true,
      shape: 'circle',
      style: { margin: '0 2px' },
    };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '是否激活',
        dataIndex: 'status',
        key: 'status',
        render: (cell, row) => (
          <Switch
            checked={cell === USER_STATUS_ENABLED}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
            onChange={(checked) => {
              this.handleEnableUser(row.id, checked);
            }}
          />
        ),
      },
      {
        title: '角色',
        dataIndex: 'roleId',
        key: 'roleId',
        render: cell => roleIdToName(cell),
      },
      {
        title: '操作',
        key: 'actions',
        render: (cell, row) => (
          <div>
            <Tooltip title="修改密码">
              <Button
                {...btnProps}
                icon="lock"
                onClick={() =>
                  this.setState({ updatingPassword: true, currentUser: row })}
              />
            </Tooltip>
            <Popconfirm
              title="确认更新随机码"
              onConfirm={() => this.handleUpdateNonceSecret(row.id)}
            >
              <Tooltip title="更新随机码">
                <Button {...btnProps} icon="exclamation" />
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ];

    const { users } = this.props;
    const pageSize = users.pageSize || 10;
    const dataSource = users.result || [];
    const pagination = {
      total: users.total || 0,
      pageSize,
      current: users.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    return (
      <div>
        <Button
          ghost
          type="primary"
          size="default"
          onClick={() => this.setState({ visible: true })}
        >
          <Icon type="plus" />
          新增管理员
        </Button>

        <Table
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={pagination}
          onChange={this.handleChange}
        />

        <Modal
          maskClosable={false}
          visible={this.state.visible}
          title="增加管理员"
          footer={null}
          onCancel={() => this.setState({ visible: false })}
        >
          <CreateUserForm roles={roles} onSubmit={this.handleCreateUser} />
        </Modal>
        <Modal
          maskClosable={false}
          visible={this.state.updatingPassword}
          title="修改密码"
          footer={null}
          onCancel={() => this.setState({ updatingPassword: false })}
        >
          <UpdatePasswordForm onSubmit={this.handleUpdatePassword} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { admin } = state;
  return {
    users: admin.manage.result,
    filters: admin.manage.filters,
    loading: admin.loading,
  };
}

export default connect(mapStateToProps)(UserList);
