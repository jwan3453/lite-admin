import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Tooltip, Modal } from 'antd';

import StudentInfo from '../../Common/StudentInfo';
import StudentListModal from '../../Common/StudentListModal';

class Schedules extends React.Component {
  static propTypes = {
    tags: PropTypes.shape({
      loading: PropTypes.bool,
      page: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
      result: PropTypes.array,
    }).isRequired,
    students: PropTypes.shape({
      loading: PropTypes.bool,
      page: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
      tags: PropTypes.array,
      result: PropTypes.array,
    }).isRequired,
  };

  state = {
    currentStudentId: 0,
  };
  tagSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
  };

  tagColumns = [
    {
      title: '标签',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '人数',
      key: 'studentCount',
      dataIndex: 'studentCount',
    },
  ];

  stduentColumns = [
    {
      title: 'ID',
      key: 'id',
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
      title: '昵称',
      key: 'nickname',
      dataIndex: 'nickname',
    },
  ];

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
  render() {
    const { tags, students } = this.props;

    const tagPagination = {
      total: tags.total || 0,
      pageSize: tags.pageSize,
      current: tags.page || 1,
      showSizeChanger: true,
      size: 'small',
      simple: true,
      showTotal: all => `总共${all}条`,
    };

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
          <Table
            size="small"
            rowKey="id"
            rowSelection={this.tagSelection}
            loading={tags.loading}
            columns={this.tagColumns}
            dataSource={tags.result}
            pagination={tagPagination}
            style={{ marginTop: 16 }}
          />
        </Col>
        <Col span={18}>
          <Table
            size="small"
            rowKey="id"
            pagination={studentPagination}
            loading={students.loading}
            columns={this.stduentColumns}
            dataSource={students.result}
            style={{ marginTop: 16 }}
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
      </Row>
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
          tags: ['tag1', 'tag2'],
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(Schedules);
