import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Tooltip,
  Modal,
  Button,
  Message,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';

import TagBar from './TagBar';
import TagList from './TagList';

import WechatTemplateMessage from './WechatTemplateMessage';
import ActionBar from './ActionBar';

import StudentInfo from '../../Common/StudentInfo';
import StudentListModal from '../../Common/StudentListModal';

import {
  fetchMobile,
  searchStudentsByTags,
} from '../../../app/actions/student';

class Schedules extends React.Component {
  static propTypes = {
    mobile: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    mobile: {},
  };

  state = {
    currentStudentId: 0,
    selectedTags: [],
    students: {
      loading: false,
      total: 0,
      filters: {
        pageSize: 10,
        current: 1,
        tagIds: '',
      },
      result: [],
    },
  };

  stduentColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id, student) => (
        <Tooltip title="查看用户信息" placement="top">
          <a
            role="button"
            tabIndex="0"
            onClick={() => {
              this.showStudentInfo(id);
            }}
          >{`[${id}] ${student.nickname}`}</a>
        </Tooltip>
      ),
    },
    {
      title: '手机尾号',
      key: 'mobileSuffix',
      width: 80,
      render: student => (
        student.mobileSuffix
        ? <Button
          size="small"
          icon="mobile"
          onClick={() => this.handleFetchMobile(student.id)}
        >
          {student.mobileSuffix}
        </Button>
        : <span />
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 60,
      render: gender => ['', '男', '女'][gender],
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 60,
    },
    {
      title: '城市',
      dataIndex: 'city',
      width: 80,
    },
    {
      title: '课程级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '注册渠道',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '注册时间',
      dataIndex: 'registerAt',
      key: 'registerAt',
      render: registerAt => moment.unix(registerAt).format('Y-MM-DD HH:mm'),
    },
  ];

  /**
   * 选中行变化
   * @param { array } 选中的列id
   * @param { array } 选中的列
   */
  handleSelectedRowsChange = (selectedRowKeys, selectedRows) => {
    const { students } = this.state;
    const selectedRowsIds = [];

    selectedRows.forEach((item) => {
      selectedRowsIds.push(item.id);
    });

    this.setState({
      selectedTags: selectedRows,
      students: Object.assign({}, students, { filters: { tagIds: selectedRowsIds.join(',') } }),
    });
  };

  handleFilterStudentsByTags = () => {
    const filters = this.state.students.filters;
    this.handleFetchStudentsByTags(filters);
  };

  /**
   * 获取用户手机号码
   * @param { number } 学生id
   */
  handleFetchMobile = (studentId) => {
    const { dispatch } = this.props;
    dispatch(fetchMobile(studentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        const { mobile } = this.props;

        Modal.info({
          content: `用户${mobile.studentId}手机号为: ${mobile.result}`,
        });
      }
    });
  };

  /**
   * 根据tag id获取学生
   * @param { number } 标签id
   */
  handleFetchStudentsByTags = (filters) => {
    const { dispatch } = this.props;
    const { students } = this.state;

    this.setState({
      students: Object.assign({}, students, {
        loading: true,
      }),
    });

    dispatch(searchStudentsByTags(filters)).then((result) => {
      if (result.code) {
        Message.error(result.message);

        this.setState({
          students: Object.assign({}, students, {
            loading: false,
          }),
        });
      } else {
        this.setState({
          students: Object.assign({}, students, {
            total: result.response.total,
            result: result.response.result,
            loading: false,
          }),
        });
      }
    });
  };

  /**
   * 根据name属性模糊查询tag
   * @param { number } 页码
   * @param { number } 页大小
   */
  handlePageChange = (page) => {
    this.state.students.filters.page = page;
    const filters = this.state.students.filters;
    this.handleFilterStudentsByTags(filters);
  };

  /**
   * 移除已经选中的tag
   * @param { number } 标签index
   */
  removeSelectedTag = (tagIndex) => {
    const { selectedTags } = this.state;

    selectedTags.splice(tagIndex, 1);

    const selectedTagIds = [];
    selectedTags.forEach((item) => {
      selectedTagIds.push(item.id);
    });

    const selectedTagIdsStr = selectedTagIds.join(',');

    this.setState({
      selectedTags,
      students: {
        filters: {
          tagIds: selectedTagIdsStr,
        },
      },
    });
  };

  /**
   * 显示学生信息
   */
  showStudentInfo = (studentId) => {
    if (studentId <= 0) {
      return;
    }
    this.setState({
      studentDialogVisible: true,
      currentStudentId: studentId,
    });
  };

  /**
   * 隐藏学生信息
   */
  hideStudentInfo = () => {
    this.setState({
      studentDialogVisible: false,
      currentStudentId: null,
    });
  };

  showWechatMsgDialog = () => {
    this.setState({
      wechatMsgDialogVisible: true,
    });
  };

  hideWechatMsgDialog = () => {
    this.setState({
      wechatMsgDialogVisible: false,
    });
  };

  render() {
    const { students, selectedTags } = this.state;
    const { filters, result } = students;
    const { loading } = this.state.students;
    const studentPagination = {
      total: students.total || 0,
      pageSize: filters.pageSize,
      current: filters.page || 1,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
      onShowSizeChange: (current, size) => {
        this.setState({
          students: Object.assign({}, students, {
            filters: {
              pageSize: size,
            },
          }),
        });

        filters.pageSize = size;

        this.handleFetchStudentsByTags(filters);
      },
      onChange: (page) => {
        this.handlePageChange(page);
      },
    };

    return (
      <Row gutter={30}>
        <Col span={6}>
          <TagList
            selectedRowKeys={_.map(selectedTags, 'id')}
            handleSelectedRowsChange={this.handleSelectedRowsChange}
          />
        </Col>
        <Col span={18}>
          <TagBar
            tags={selectedTags}
            onRemoveTag={this.removeSelectedTag}
          />
          <ActionBar
            visible={selectedTags.length > 0}
            onFilter={this.handleFilterStudentsByTags}
            onSendWechatMessage={this.showWechatMsgDialog}
          />
          <Table
            size="small"
            rowKey="id"
            pagination={studentPagination}
            loading={loading}
            columns={this.stduentColumns}
            dataSource={result}
          />
          <StudentListModal
            multiSelect
            title="添加学生"
            visible={this.state.studentSelectorVisible}
            onOk={() => {
              this.addStudentsToGroup();
            }}
            onCancel={this.hideStudentListModal}
            onSelectedRowsChange={this.handleSelectedStudentsChange}
          />
        </Col>
        <Modal
          width={700}
          title="学生信息"
          maskClosable={false}
          visible={this.state.studentDialogVisible}
          onOk={this.hideStudentInfo}
          onCancel={this.hideStudentInfo}
        >
          <StudentInfo studentId={this.state.currentStudentId} />
        </Modal>
        <Modal
          width={700}
          title="微信模板消息"
          footer={null}
          maskClosable={false}
          visible={this.state.wechatMsgDialogVisible}
          onCancel={this.hideWechatMsgDialog}
        >
          <WechatTemplateMessage />
        </Modal>

      </Row>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Schedules);

