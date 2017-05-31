import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import SearchForm from './SearchForm';

class Bills extends Component {
  static propTypes = {
    bills: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    bills: {},
  };

  state = {
  };

  handleSearch = (filters) => {
    console.log(filters);
  };

  render() {
    const { bills } = this.props;
    const dataSource = bills.result || [];
    const pageSize = bills.pageSize || 10;
    const pagination = {
      total: bills.total || 0,
      pageSize,
      current: bills.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '账单标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '原价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '课时',
        dataIndex: 'hours',
        key: 'hours',
      },
      {
        title: '用户',
        dataIndex: 'user',
        key: 'user.id',
        render: (text, record) => {
          const user = record.user;
          const nickname = user && user.nickname;

          return `[${user.id}] ${nickname.length > 0 ? nickname : '无昵称'}`;
        },
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, record) => {
          const user = record.user;
          const phone = user && user.phone;
          if (phone.length > 0) {
            return phone.substr(phone.length - 4);
          }
          return '';
        },
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '支付时间',
        dataIndex: 'transactionTime',
        key: 'transactionTime',
      },
      {
        title: '支付通道',
        dataIndex: 'transactionFunnel',
        key: 'transactionFunnel',
      },
      {
        title: '操作',
      },
    ];

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          pageSize={pageSize}
        />
        <Table
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    bills: {
      result: [
        {
          id: '422020',
          title: '订单-购买4课时',
          price: 100,
          hours: 4,
          user: {
            id: 292499,
            nickname: '',
            phone: '18965176267',
          },
          status: 1,
          transactionTime: '--',
          transactionFunnel: '--',
        },
        {
          id: '422021',
          title: '订单-购买4课时',
          price: 100,
          hours: 4,
          user: {
            id: 292499,
            nickname: '',
            phone: '18965176267',
          },
          status: 1,
          transactionTime: '--',
          transactionFunnel: '--',
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(Bills);
