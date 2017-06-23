import React, { Component } from 'react';
import {
  Table,
  Input,
  Icon,
  Modal,
} from 'antd';
import { connect } from 'react-redux';

import { searchStudent } from '../../../app/actions/student';

class StudentList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
    onSelectedRowsChange: React.PropTypes.func.isRequired,
    multiSelect: React.PropTypes.bool,
  };

  static defaultProps = {
    filters: {},
    students: {},
    onSelectedRowsChange: () => {},
    multiSelect: false,
  };

  componentWillMount() {
    const { dispatch, filters } = this.props;
    dispatch(searchStudent(filters));
  }

  handleChangePage = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchStudent(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.onSelectedRowsChange(selectedRowKeys, selectedRows);
  };

  handleSearch = (value) => {
    const { dispatch } = this.props;
    dispatch(searchStudent({
      searchText: value,
    }));
  };

  render() {
    const {
      students,
      multiSelect,
      ...modalProps
    } = this.props;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '手机尾号',
        dataIndex: 'mobileSuffix',
        key: 'mobileSuffix',
        width: 100,
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '课程级别',
        dataIndex: 'level',
        key: 'level',
      },
    ];

    const pagination = {
      total: students.total || 0,
      pageSize: students.pageSize || 10,
      current: students.page || 1,
      simple: true,
    };

    const dataSource = students.result || [];

    const rowSelection = {
      type: !multiSelect ? 'radio' : 'checkbox',
      onChange: this.handleSelectChange,
    };

    return (
      <Modal {...modalProps}>
        <Input.Search
          size="default"
          onSearch={this.handleSearch}
          prefix={<Icon type="mobile" style={{ fontSize: 13 }} />}
          placeholder="手机尾号 或 手机号"
        />
        <Table
          size="small"
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={pagination}
          onChange={this.handleChangePage}
          rowSelection={rowSelection}
        />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { student } = state;
  const { loading, search } = student;
  const { filters, result } = search;

  return {
    loading,
    filters,
    students: result,
  };
}

export default connect(mapStateToProps)(StudentList);

