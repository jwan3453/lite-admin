import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon,
  Table,
} from 'antd';

class Selector extends React.Component {
  static propTypes = {
    teachers: React.PropTypes.array,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };

  static defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0,
    teachers: [],
  };

  render() {
    const {
      page,
      pageSize,
      total,
      teachers,
    } = this.props;

    const pagination = {
      total: total || 0,
      pageSize,
      current: page || 1,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    const rowSelection = {
      type: 'radio',
    };

    const columns = [
      {
        title: '名称',
        key: 'nickname',
        dataIndex: 'nickname',
      },
    ];

    return (
      <div>
        <Form>
          <Form.Item>
            <Input
              placeholder="输入老师ID／老师名字"
              prefix={<Icon type="search" />}
            />
          </Form.Item>
        </Form>
        <Table
          rowKey="id"
          pagination={pagination}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={teachers}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    page: 1,
    pageSize: 10,
    total: 100,
    teachers: [
      {
        id: 0,
        nickname: 'milo',
      },
      {
        id: 1,
        nickname: 'milo 1',
      },
      {
        id: 2,
        nickname: 'milo 2',
      },
      {
        id: 3,
        nickname: 'milo 3',
      },
      {
        id: 4,
        nickname: 'milo 4',
      },
      {
        id: 5,
        nickname: 'milo 5',
      },
    ],
  };
}

export default connect(mapStateToProps)(Selector);

