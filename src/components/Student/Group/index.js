import React, { PropTypes } from 'react';
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
import ActionBar from './ActionBar';
import TagList from './TagList';
import WechatTemplateMessage from './WechatTemplateMessage';

import StudentInfo from '../../Common/StudentInfo';
import StudentListModal from '../../Common/StudentListModal';

import { fetchMobile } from '../../../app/actions/student';

class Schedules extends React.Component {
  static propTypes = {
    mobile: React.PropTypes.object,
    students: PropTypes.shape({
      loading: PropTypes.bool,
      page: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
      tags: PropTypes.array,
      result: PropTypes.array,
    }).isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    mobile: {},
  };

  state = {
    currentStudentId: 0,
    selectedTags: [],
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
      title: '助教',
      dataIndex: 'crmAssistantId',
      key: 'crmAssistantId',
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

  removeSelectedTag = (tagIndex) => {
    const { selectedTags } = this.state;

    selectedTags.splice(tagIndex, 1);

    this.setState({
      selectedTags,
    });
  };

  filterStudentsByTags = () => {
    //  todo
  };

  showStudentInfo = (studentId) => {
    if (studentId <= 0) return;
    this.setState({
      studentDialogVisible: true,
      currentStudentId: studentId,
    });
  };

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
    const { students } = this.props;

    const { selectedTags } = this.state;

    const studentPagination = {
      total: students.total || 0,
      pageSize: students.pageSize,
      current: students.page || 1,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    return (
      <Row gutter={30}>
        <Col span={6}>
          <TagList
            selectedRowKeys={_.map(selectedTags, 'id')}
            onSelectedRowsChange={
              (selectedRowKeys, selectedRows) => {
                this.setState({
                  selectedTags: selectedRows,
                });
              }
            }
          />
        </Col>
        <Col span={18}>
          <TagBar
            tags={selectedTags}
            onRemoveTag={this.removeSelectedTag}
          />
          <ActionBar
            visible={selectedTags.length > 0}
            onFilter={this.filterStudentsByTags}
            onSendWechatMessage={this.showWechatMsgDialog}
          />
          <Table
            size="small"
            rowKey="id"
            pagination={studentPagination}
            loading={students.loading}
            columns={this.stduentColumns}
            dataSource={students.result}
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
  return {
    students: {
      loading: false,
      tags: [],
      total: 10,
      page: 1,
      pageSize: 10,
      result: [
        {
          id: 1,
          nickname: 'user1',
          mobileSuffix: '7251',
          gender: 1,
          age: 3,
          city: 'mega city',
          tags: ['tag1', 'tag2'],
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(Schedules);

