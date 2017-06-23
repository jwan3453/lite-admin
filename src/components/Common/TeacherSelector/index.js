import React, { Component } from 'react';
import { Table, Input } from 'antd';
import { connect } from 'react-redux';

import { searchTeacher } from '../../../app/actions/teacher';

class Teachers extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    teachers: React.PropTypes.object.isRequired,
    onSelectedRowsChange: React.PropTypes.func.isRequired,
    multiSelect: React.PropTypes.bool,
  };

  static defaultProps = {
    filters: {},
    teachers: {},
    onSelectedRowsChange: () => {},
    multiSelect: false,
  };

  componentWillMount() {
    const { dispatch, filters } = this.props;
    dispatch(searchTeacher(filters));
  }

  handleChangePage = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(searchTeacher(
      Object.assign(filters, {
        page: pagination.current,
        pageSize: pagination.pageSize,
      }),
    ));
  };

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.onSelectedRowsChange(selectedRowKeys, selectedRows);
  };

  handleSearch = (text) => {
    const { dispatch } = this.props;
    dispatch(searchTeacher({
      searchText: text,
    }));
  };

  render() {
    const {
      teachers,
      multiSelect,
    } = this.props;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 100,
      },
      {
        title: '昵称',
        dataIndex: 'username',
      },
    ];

    //  todo
    //  actually here should be teachers.result,
    //  because we are going to include pagination info here
    const dataSource = teachers || [];

    const rowSelection = {
      type: !multiSelect ? 'radio' : 'checkbox',
      onChange: this.handleSelectChange,
    };

    const pagination = {
      total: teachers.total || 0,
      pageSize: teachers.pageSize || 10,
      current: teachers.page || 1,
      simple: true,
    };

    return (
      <div>
        <Input.Search
          size="default"
          onSearch={(value) => { this.handleSearch(value); }}
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
  const { teacher } = state;
  const { loading, search } = teacher;
  const { filters, result } = search;

  return {
    loading,
    filters,
    teachers: result,
  };
}

export default connect(mapStateToProps)(Teachers);

