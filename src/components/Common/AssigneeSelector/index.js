import React, { Component } from 'react';
import { Table, Input, Icon } from 'antd';
import { connect } from 'react-redux';

import { searchAdmin } from '../../../app/actions/admin';

class Assignees extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    assignees: React.PropTypes.object.isRequired,
    onSelectedRowsChange: React.PropTypes.func.isRequired,
    multiSelect: React.PropTypes.bool,
  };

  static defaultProps = {
    filters: {},
    assignees: {},
    onSelectedRowsChange: () => {},
    multiSelect: false,
  };

  componentWillMount() {
    const { dispatch, filters } = this.props;
    dispatch(searchAdmin(filters));
  }

  handleChangePage = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchAdmin(
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
    dispatch(searchAdmin({
      searchText: value,
    }));
  };

  render() {
    const { assignees, multiSelect } = this.props;

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
      total: assignees.total || 0,
      pageSize: assignees.pageSize || 10,
      current: assignees.page || 1,
      simple: true,
    };

    const dataSource = assignees.result || [];

    const rowSelection = {
      type: !multiSelect ? 'radio' : 'checkbox',
      onChange: this.handleSelectChange,
    };

    return (
      <div>
        <Input.Search
          size="default"
          onSearch={this.handleSearch}
          prefix={<Icon type="search" style={{ fontSize: 13 }} />}
          placeholder="处理人ID／姓名"
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
    assignees: result,
  };
}

export default connect(mapStateToProps)(Assignees);

