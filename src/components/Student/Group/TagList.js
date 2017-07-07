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
    loading: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    tags: PropTypes.object,
    filters: PropTypes.object,
    selectedRowKeys: PropTypes.array,
    handleSelectedRowsChange: PropTypes.func,
  };

  static defaultProps = {
    tags: {},
    filters: {},
    selectedRowKeys: [],
    handleSelectedRowsChange: () => {},
  };

  state = {
    currentStudentId: 0,
    groupMembersDialogVisible: false,
    selectedStudentsIds: [],
    currentTagId: '',
    submitting: false,
  };

  componentWillMount() {
    this.handleFetchTags(this.props.filters);
  }

  /**
   * 查询tags
   */
  searchTags = (name) => {
    this.handleFetchTags({
      name,
    });
  };

  /**
   * 页码变化
   * @param { number } 页码
   */
  handlePageChange = (page) => {
    const { filters } = this.props;
    filters.page = page;
    this.handleFetchTags(filters);
  };

  /**
   * 根据name属性模糊查询tag
   * @param { string } 属性
   */
  handleFetchTags = (filters) => {
    const { dispatch } = this.props;
    dispatch(search(filters));
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
    const { filters, dispatch } = this.props;
    const { currentTagId, selectedStudentsIds } = this.state;

    if (selectedStudentsIds.length > 0) {
      this.setState({
        submitting: true,
      });

      dispatch(addStudents(currentTagId, selectedStudentsIds)).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          this.handleFetchTags(filters);
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
      loading,
      tags,
      selectedRowKeys,
      handleSelectedRowsChange,
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
      current: tags.page || 1,
      pageSize: tags.pageSize,
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

    const dataSource = tags.result || [];

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
          onSearch={this.searchTags}
        />
        <Table
          size="small"
          rowKey="id"
          rowSelection={tagSelection}
          loading={loading}
          columns={tagColumns}
          dataSource={dataSource}
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

function mapStateToProps(state) {
  const { tag } = state;
  const { loading, search: searchResult } = tag;

  return {
    loading,
    filters: search.filters,
    tags: searchResult.result,
  };
}

export default connect(mapStateToProps)(TagList);

