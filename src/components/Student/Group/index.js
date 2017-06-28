import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Modal,
  Button,
  Tooltip,
  Tag,
  Popconfirm,
  notification,
} from 'antd';

import SearchForm from './SearchForm';
import GroupInfoForm from './GroupInfoForm';
import StudentListModal from '../../Common/StudentListModal';

import * as GROUP_STATUS from './status';
import GroupMessageResult from './MessageResult';

import {
  LEVEL_MAP,
} from '../../../common/levels';

const getEmptyGroup = () => ({
  id: -1,
  name: '',
  status: null,
  level: '',
  count: 0,
});

class Schedules extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
    groups: React.PropTypes.array,
  };

  static defaultProps = {
    groups: [],
    page: 1,
    pageSize: 10,
    total: 0,
  };

  state = {
    dialogVisible: false,
    studentSelectorVisible: false,
    selectedStudents: [],
    currentGroup: getEmptyGroup(),
  };

  search = () => {
    //  todo
  };

  handleSelectedStudentsChange = (selectedStudents) => {
    this.setState({ selectedStudents });
  };

  sendScheduleMessage = () => {
    //  todo send class schedule to this group
    const key = `open${Date.now()}`;

    const btnClick = () => notification.close(key);

    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={btnClick}
      >确定</Button>
    );

    const description = (
      <GroupMessageResult />
    );

    notification.open({
      description,
      btn,
      key,
      duration: 0,
    });
  };

  addStudentsToGroup = () => {
    //  todo dispatch add student to group action
    this.hideStudentListModal();
  };

  createGroup = () => {
    //  todo
  };

  updateGroup = () => {
    //  todo
  };

  removeGroup = () => {
    //  todo
  };

  showStudentListModal = () => {
    this.setState({
      studentSelectorVisible: true,
    });
  };

  hideStudentListModal = () => {
    this.setState({
      selectedStudents: [],
      studentSelectorVisible: false,
    });
  };

  showDialog = (group = getEmptyGroup()) => {
    this.setState({
      dialogVisible: true,
      currentGroup: group,
    });
  };

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      currentGroup: getEmptyGroup(),
    });
  };

  render() {
    const {
      loading,
      groups,
      page,
      pageSize,
      total,
    } = this.props;

    const {
      currentGroup,
      selectedStudents,
      studentSelectorVisible,
    } = this.state;

    const pagination = {
      total: total || 0,
      pageSize,
      current: page || 1,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    const columns = [
      {
        title: '分组名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '课程级别',
        key: 'level',
        dataIndex: 'level',
        render: level => LEVEL_MAP[level].name,
      },
      {
        title: '学生数量',
        key: 'count',
        dataIndex: 'count',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => (
          <Tag
            color={
              status === GROUP_STATUS.AVAILABLE
              ? 'green'
              : 'red'
            }
          >{GROUP_STATUS.STATUS_MAP[status].text}</Tag>
        ),
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <div>
            <Tooltip title="编辑">
              <Button
                icon="edit"
                style={{
                  marginRight: 8,
                }}
                onClick={() => { this.showDialog(record); }}
              />
            </Tooltip>
            <Popconfirm
              title="该操作不可逆，确认继续？"
              onConfirm={() => { this.removeGroup(record); }}
            >
              <Tooltip title="删除">
                <Button
                  icon="delete"
                  style={{
                    marginRight: 8,
                  }}
                />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="添加学生">
              <Button
                icon="user-add"
                style={{
                  marginRight: 8,
                }}
                onClick={this.showStudentListModal}
              />
            </Tooltip>
            <Popconfirm
              title="该操作不可逆，确认继续？"
              onConfirm={() => { this.sendScheduleMessage(record); }}
            >
              <Tooltip title="发送排课通知">
                <Button icon="message" />
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          onSearch={this.search}
          onCreateGroup={this.showDialog}
        />
        <Table
          rowKey="id"
          pagination={pagination}
          loading={loading}
          columns={columns}
          dataSource={groups}
          style={{ marginTop: 16 }}
        />
        <Modal
          key={`modal-${new Date()}`}
          title={
            currentGroup.id !== -1 ? '编辑分组' : '新建分组'
          }
          visible={this.state.dialogVisible}
          onOk={
            currentGroup.id !== -1 ? this.updateGroup : this.createGroup
          }
          onCancel={this.hideDialog}
        >
          <GroupInfoForm group={currentGroup} />
        </Modal>
        <StudentListModal
          multiSelect
          title="添加学生"
          visible={studentSelectorVisible}
          selectedRowKeys={selectedStudents}
          onOk={() => { this.addStudentsToGroup(); }}
          onCancel={this.hideStudentListModal}
          onSelectedRowsChange={this.handleSelectedStudentsChange}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    page: 1,
    pageSize: 10,
    total: 100,
    groups: [
      {
        id: 0,
        name: 'TEST_GROUP_008',
        status: 0,
        level: 1,
        count: 100,
        comment: '',
      },
      {
        id: 1,
        name: 'TEST_GROUP_018',
        status: 1,
        level: 1,
        count: 50,
        comment: '',
      },
    ],
  };
}

export default connect(mapStateToProps)(Schedules);

