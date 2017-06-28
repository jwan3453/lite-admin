import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import SearchForm from './SearchForm';

class StudentAppointments extends React.Component {
  static propTypes = {
    students: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    students: {},
  };

  render() {
    const { students } = this.props;

    const columns = [];

    const pageSize = students.pageSize || 10;
    const pagination = {
      total: students.total || 0,
      pageSize,
      current: students.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = students.result || [];

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
    students: {
      page: 1,
      pageSize: 10,
      total: 100,
      result: [
        {},
      ],
    },
  };
}

export default connect(mapStateToProps)(StudentAppointments);

