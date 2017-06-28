import React, { Component } from 'react';
import { Table, Input, Modal } from 'antd';
import { connect } from 'react-redux';

import { searchAdmins } from '../../../app/actions/admin';

class AdminListModal extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    employees: React.PropTypes.object.isRequired,
    onSelectedRowsChange: React.PropTypes.func.isRequired,
    maskClosable: React.PropTypes.bool,
    multiSelect: React.PropTypes.bool,
    selectedRowKeys: React.PropTypes.array,
  };

  static defaultProps = {
    filters: {},
    employees: {},
    onSelectedRowsChange: () => {},
    maskClosable: false,
    multiSelect: false,
    selectedRowKeys: [],
  };

  componentWillMount() {
    const { dispatch, filters } = this.props;
    dispatch(searchAdmins(filters));
  }

  handleChangePage = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchAdmins(
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
    dispatch(
      searchAdmins({
        searchText: value,
      }),
    );
  };

  render() {
    const {
      employees,
      multiSelect,
      selectedRowKeys,
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
        title: '昵称',
        dataIndex: 'username',
      },
    ];

    const pagination = {
      total: employees.total || 0,
      pageSize: employees.pageSize || 10,
      current: employees.page || 1,
      simple: true,
    };

    const dataSource = employees.result || [];

    const rowSelection = {
      type: !multiSelect ? 'radio' : 'checkbox',
      selectedRowKeys: selectedRowKeys || [],
      onChange: this.handleSelectChange,
    };

    return (
      <Modal {...modalProps}>
        <Input.Search
          size="default"
          onSearch={this.handleSearch}
          placeholder="员工ID／姓名"
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
  const { admin } = state;
  const { loading, search } = admin;
  const { filters, result } = search;

  return {
    loading,
    filters,
    employees: result,
  };
}

export default connect(mapStateToProps)(AdminListModal);
