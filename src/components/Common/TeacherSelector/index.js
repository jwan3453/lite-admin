import React, { Component } from 'react';
import { Table, Input } from 'antd';
import { connect } from 'react-redux';

import { searchTeacher } from '../../../app/actions/teacher';

class Teachers extends Component {
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
    dispatch(searchTeacher(filters.searchText));
  }

  handleChangePage = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchTeacher(
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
    dispatch(searchTeacher({
      searchText: value,
    }));
  };

  render() {
    const { students, multiSelect } = this.props;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
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
      <div>
        <Input.Search
          size="default"
          onSearch={this.handleSearch}
          placeholder="老师ID／姓名"
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
      </div>
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

export default connect(mapStateToProps)(Teachers);

