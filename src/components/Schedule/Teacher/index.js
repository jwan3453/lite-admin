import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import SearchForm from './SearchForm';

class TeacherAppointments extends React.Component {
  static propTypes = {
    teachers: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    teachers: {},
  };

  render() {
    const { teachers } = this.props;

    const columns = [];

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

export default connect(mapStateToProps)(TeacherAppointments);

