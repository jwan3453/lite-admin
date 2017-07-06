import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Input,
  Message,
  Button,
  Tooltip,
  Modal,
  Spin,
} from 'antd';

import AddTagForm from './AddTagForm';
import StudentFinder from './StudentFinder';

import {
  search,
  create,
  addStudents,
} from '../../../app/actions/tag';

class TagList extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selectedRowKeys: PropTypes.array,
    handleSelectedRowsChange: PropTypes.func,
  };

  static defaultProps = {
    selectedRowKeys: [],
    handleSelectedRowsChange: () => {},
  };


  state = {
    currentStudentId: 0,
    tags: {
      total: 0,
      filters: {
        current: 1,
        pageSize: 100,
        name: '',
      },
      result: [],
      loading: false,
    },
    groupMembersDialogVisible: false,
    selectedStudentsIds: [],
    currentTagId: '',
    submitting: false,
  };

  componentWillMount() {
    const filters = this.state.tags.filters;
    this.handleFetchTags(filters);
  }

  /**
   * 查询tags
   */
  searchTags = (e) => {
    const { tags } = this.state;
    this.setState({
      tags: Object.assign({}, tags, {
        filters: {
          name: e.target.value,
        },
      }),
    });

    const filters = this.state.tags.filters;
    filters.name = e.target.value;
    this.handleFetchTags(filters);
  };

  /**
   * 页码变化
   * @param { number } 页码
   */
  handlePageChange = (page) => {
    this.state.tags.filters.page = page;
    const filters = this.state.tags.filters;
    this.handleFetchTags(filters);
  };

  /**
   * 根据name属性模糊查询tag
   * @param { string } 属性
   */
  handleFetchTags = (filters) => {
    const { dispatch } = this.props;
    const { tags } = this.state;

    this.setState({
      tags: Object.assign({}, tags, {
        loading: true,
      }),
    });

    dispatch(search(filters)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        this.setState({
          tags: Object.assign({}, tags, {
            result: result.response.result,
            total: result.response.total,
            loading: false,
          }),
        });
      }
    });
  };


  /**
   * 显示打标签弹窗
   */
  handleShowDialog = () => {
    this.setState({
      groupMembersDialogVisible: true,
    });
  };


  /**
   * 隐藏打标签窗口
   */
  handleHideDialog = () => {
    this.setState({
      groupMembersDialogVisible: false,
    });
  };


  /**
   * 打标签
   */
  handleTagStudents = () => {
    const { dispatch } = this.props;
    const { tags, currentTagId, selectedStudentsIds } = this.state;

    if (selectedStudentsIds.length > 0) {
      this.setState({
        submitting: true,
      });

      dispatch(addStudents(currentTagId, selectedStudentsIds)).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          this.handleFetchTags(tags.filters);
          this.handleHideDialog();
        }
        this.setState({
          submitting: false,
        });
      });
    } else {
      Message.warn('未选中学生');
    }
  };

  /**
   * 选中学生
   * @param { array } 选中的学生id数组
   */
  handleSelectedStudentsChange = (ids) => {
    this.setState({
      selectedStudentsIds: ids,
    });
  };

  /**
   * 创建标签
   * @param { string } 标签名称
   */
  handleCreateTag = (name) => {
    const { dispatch } = this.props;

    const { tags } = this.state;

    this.setState({
      students: Object.assign({}, tags, {
        loading: true,
      }),
    });

    dispatch(create(name)).then((result) => {
      if (result.code) {
        Message.error(result.message);
        this.setState({
          tags: Object.assign({}, tags, {
            loading: false,
          }),
        });
      } else {
        this.handleFetchTags(tags.filters);
      }
    });
  };

  render() {
    const {
      selectedRowKeys,
      handleSelectedRowsChange,
    } = this.props;

    const { groupMembersDialogVisible, tags } = this.state;
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
        render: (text, tag) => (
          <Tooltip title="添加学生" placement="top">
            <Button
              icon="user-add"
              onClick={
                () => {
                  this.handleShowDialog();
                  this.setState({
                    currentTagId: tag.id,
                  });
                }
              }
            />
          </Tooltip>
        ),
      },
    ];
    const tagPagination = {
      total: tags.total || 0,
      pageSize: tags.filters.pageSize,
      current: tags.filters.page || 1,
      showSizeChanger: true,
      size: 'small',
      simple: true,
      showTotal: all => `总共${all}条`,
      onChange: (page) => {
        this.handlePageChange(page);
      },
    };

    const tagSelection = {
      selectedRowKeys,
      onChange: handleSelectedRowsChange,
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
      }),
    };
    return (
      <div>
        <AddTagForm
          onSubmit={this.handleCreateTag}
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
          onOk={this.handleTagStudents}
          onCancel={this.handleHideDialog}
        >
          <Spin spinning={this.state.submitting} tip="正在提交..." />
          <StudentFinder onSelectedRowsChange={this.handleSelectedStudentsChange} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(TagList);

