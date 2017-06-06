import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm,
} from 'antd';
import moment from 'moment';

class UserProduct extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    products: React.PropTypes.array,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };

  static defaultProps = {
    loading: false,
    products: {},
    page: 1,
    pageSize: 10,
    total: 0,
  };

  handleRefund = (product) => {
    //  todo handle refund
    console.log(product);
  };

  render() {
    const {
      loading,
      products,
      page,
      pageSize,
      total,
    } = this.props;

    const pagination = {
      current: page,
      pageSize,
      total,
    };

    const columns = [
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '总课时',
        key: 'totalHours',
        dataIndex: 'totalHours',
        render: hours => (hours.toFixed(1)),
      },
      {
        title: '可用课时',
        key: 'availableHours',
        dataIndex: 'availableHours',
        render: hours => (hours.toFixed(1)),
      },
      {
        title: '状态',
        key: 'status',
        render: (text, record) => {
          const { start, expiration } = record;
          const now = (new Date()).getTime();
          return !(now < start || now > expiration) ? '有效' : '已过期';
        },
      },
      {
        title: '有效期',
        key: 'availableTime',
        render: (text, record) => {
          const dateFormat = 'YYYY.MM.DD';
          return `${moment(new Date(record.start)).format(dateFormat)} - ${moment(new Date(record.expiration)).format(dateFormat)}`;
        },
      },
      {
        title: '退款金额',
        key: 'refund',
        dataIndex: 'refund',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <Popconfirm
            title="操作不可逆，确认继续？"
            onConfirm={() => this.handleRefund(record)}
          >
            <Button size="default" type="primary">申请退款</Button>
          </Popconfirm>
        ),
      },
    ];

    return (
      <div>
        <Table
          size="small"
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={products}
          pagination={pagination}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    page: 1,
    pageSize: 10,
    total: 100,
    products: [
      {
        id: 0,
        name: '1元/1课时',
        totalHours: 1,
        availableHours: 1,
        start: 1493424000000,
        expiration: 1494806400000,
        refund: 0,
      },
      {
        id: 1,
        name: '2元/2课时',
        totalHours: 1,
        availableHours: 1,
        start: 1493424000000,
        expiration: 1494806400000,
        refund: 0,
      },
    ],
  };
}

export default connect(mapStateToProps)(UserProduct);

