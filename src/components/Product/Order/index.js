import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Tag,
  Modal,
} from 'antd';
import _ from 'lodash';
import SearchForm from './SearchForm';
import RefundForm from './RefundForm/';

import ORDER_STATUS from '../../../common/orderStatus';

class Orders extends Component {
  static propTypes = {
    bills: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    bills: {},
  };

  state = {
    dialogVisible: false,
  };

  handleSearch = (filters) => {
    console.log(filters);
  };

  handleRefund = () => {
    const form = this.refundForm.form;
    form.validateFields((errors) => {
      if (!errors) {
        //  todo if form is valid, then dispatch an ation
      }
    });
  };

  handleRequestRefund = () => {
    this.setState({
      dialogVisible: true,
    });
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
        render: (status) => {
          const currentStatus = _.filter(
            ORDER_STATUS
            , item => item.value === status)[0];
          return (
            <Tag color={currentStatus.color}>{currentStatus.name}</Tag>
          );
        },
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
        render: () => (
          <Button onClick={() => this.handleRequestRefund()}>申请退款</Button>
        ),
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
        />
        <Modal
          title="退款申请"
          visible={this.state.dialogVisible}
          onOk={this.handleRefund}
          onCancel={() => this.setState({ dialogVisible: false })}
        >
          <RefundForm
            ref={(node) => {
              this.refundForm = node;
            }}
          />
        </Modal>
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
          status: 2,
          transactionTime: '--',
          transactionFunnel: '--',
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(Orders);
