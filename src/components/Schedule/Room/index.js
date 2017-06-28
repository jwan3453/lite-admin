import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import SearchForm from './SearchForm';

class Rooms extends React.Component {
  static propTypes = {
    rooms: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    rooms: {},
  };

  render() {
    const { rooms } = this.props;

    const columns = [];

    const pageSize = rooms.pageSize || 10;
    const pagination = {
      total: rooms.total || 0,
      pageSize,
      current: rooms.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = rooms.result || [];

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
    rooms: {
      page: 1,
      pageSize: 10,
      total: 100,
      result: [
        {},
      ],
    },
  };
}

export default connect(mapStateToProps)(Rooms);

