import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Input,
  Button,
  Tooltip,
  Modal,
} from 'antd';

import AddTagForm from './AddTagForm';
import StudentFinder from './StudentFinder';

class TagList extends React.Component {
  static propTypes = {
    tags: PropTypes.shape({
      loading: PropTypes.bool,
      page: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
      result: PropTypes.array,
    }).isRequired,

    selectedRowKeys: PropTypes.array,
    onSelectedRowsChange: PropTypes.func,
  };

  static defaultProps = {
    selectedRowKeys: [],
    onSelectedRowsChange: () => {},
  };

  state = {
    groupMembersDialogVisible: false,
  };

  searchTags = (e) => {
    console.log('searchTags', e);
  };

  showDialog = () => {
    this.setState({
      groupMembersDialogVisible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      groupMembersDialogVisible: false,
    });
  };

  createTag = () => {
    const tag = this.tagForm.getFieldsValue();
    console.log('createTag', tag);
  };

  tagStudents = () => {
    console.log('tag students');
    this.hideDialog();
  };

  handleSelectedStudentsChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  };

  render() {
    const {
      tags,
      selectedRowKeys,
      onSelectedRowsChange,
    } = this.props;

    const { groupMembersDialogVisible } = this.state;

    const tagColumns = [
      {
        title: '标签',
        dataIndex: 'name',
      },
      {
        title: '人数',
        dataIndex: 'studentCount',
      },
      {
        title: '操作',
        key: 'actions',
        render: () => (
          <Tooltip title="添加学生" placement="top">
            <Button
              icon="user-add"
              onClick={
                () => { this.showDialog(); }
              }
            />
          </Tooltip>
        ),
      },
    ];

    const tagPagination = {
      total: tags.total || 0,
      pageSize: tags.pageSize,
      current: tags.page || 1,
      showSizeChanger: true,
      size: 'small',
      simple: true,
      showTotal: all => `总共${all}条`,
    };

    const tagSelection = {
      selectedRowKeys,
      onChange: onSelectedRowsChange,
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    };

    return (
      <div>
        <AddTagForm
          onSubmit={this.createTag}
          ref={(node) => { this.tagForm = node; }}
          style={{ marginBottom: 16 }}
        />
        <Input.Search
          placeholder="Tag 关键字"
          style={{ marginBottom: 16 }}
          onPressEnter={
            (eventArgs) => { this.searchTags(eventArgs); }
          }
        />
        <Table
          size="small"
          rowKey="id"
          rowSelection={tagSelection}
          loading={tags.loading}
          columns={tagColumns}
          dataSource={tags.result}
          pagination={tagPagination}
        />
        <Modal
          title="添加学生"
          width={700}
          maskClosable={false}
          visible={groupMembersDialogVisible}
          onOk={this.tagStudents}
          onCancel={this.hideDialog}
        >
          <StudentFinder
            onSelectedRowsChange={this.handleSelectedStudentsChange}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    tags: {
      loading: false,
      total: 200,
      page: 1,
      pageSize: 10,
      result: [
        {
          id: 1,
          name: 'tag1',
          studentCount: 10,
        },
        {
          id: 2,
          name: 'tag2',
          studentCount: 100,
        },
        {
          id: 3,
          name: 'tag3',
          studentCount: 1000,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(TagList);

