import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import SearchForm from './SearchForm';

class StandbyTeachers extends React.Component {
  static propTypes = {
    teachers: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    teachers: {},
  };

  render() {
    const { teachers } = this.props;

    const columns = [
      {
        title: '老师',
        dataIndex: '',
      },
      {
        title: '开始时间',
        dataIndex: '',
      },
      {
        title: '结束时间',
        dataIndex: '',
      },
      {
        title: '薪酬',
        dataIndex: '',
      },
      {
        title: '状态',
        dataIndex: '',
      },
      {
        title: '备注',
        dataIndex: '',
      },
      {
        title: '操作',
        dataIndex: '',
      },
    ];

    const pageSize = teachers.pageSize || 10;
    const pagination = {
      total: teachers.total || 0,
      pageSize,
      current: teachers.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = teachers.result || [];

    return (
      <div>
        <SearchForm />
        <Table
          rowKey="id"
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    teachers: {
      page: 1,
      pageSize: 10,
      total: 100,
      result: [
        {},
      ],
    },
  };
}

export default connect(mapStateToProps)(StandbyTeachers);

