import React from 'react';
import {
  Table,
  Input,
  Modal,
} from 'antd';
import { connect } from 'react-redux';

import { searchTeacher } from '../../../app/actions/teacher';

class Teachers extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    onSelectChange: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    teachers: React.PropTypes.object.isRequired,
    multiSelect: React.PropTypes.bool,
  };

  static defaultProps = {
    onSelectChange: () => {},
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
      onSelectChange,
      ...modalProps
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
      onChange: onSelectChange,
    };

    const pagination = {
      total: teachers.total || 0,
      pageSize: teachers.pageSize || 10,
      current: teachers.page || 1,
      simple: true,
    };

    return (
      <Modal {...modalProps}>
        <Input.Search
          key="Common-TeacherListModal-InputSearch"
          size="default"
          onSearch={(value) => { this.handleSearch(value); }}
          placeholder="老师ID／姓名"
        />
        <Table
          size="small"
          key="Common-TeacherListModal-Table"
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

