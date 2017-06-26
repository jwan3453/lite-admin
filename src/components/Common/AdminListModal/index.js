import React, { Component } from 'react';
import { Table, Input, Modal } from 'antd';
import { connect } from 'react-redux';

import { searchAdmins } from '../../../app/actions/admin';

class AdminListModal extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    assistants: React.PropTypes.object.isRequired,
    onSelectChange: React.PropTypes.func.isRequired,
    multiSelect: React.PropTypes.bool,
  };

  static defaultProps = {
    filters: {},
    assistants: {},
    onSelectChange: () => {},
    multiSelect: false,
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
    this.props.onSelectChange(selectedRowKeys, selectedRows);
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
      assistants,
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
        title: '昵称',
        dataIndex: 'username',
      },
    ];

    const pagination = {
      total: assistants.total || 0,
      pageSize: assistants.pageSize || 10,
      current: assistants.page || 1,
      simple: true,
    };

    const dataSource = assistants.result || [];

    const rowSelection = {
      type: !multiSelect ? 'radio' : 'checkbox',
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
    assistants: result,
  };
}

export default connect(mapStateToProps)(AdminListModal);
