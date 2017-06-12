import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
  Modal,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import SearchForm from './SearchForm';

import { Created, Confirmed, Withdrawed } from './ActionBar/index';
import { Paypal, BankUsa, WireTransfer } from './BankInfo/index';
import Bill from '../Bill/index';

import * as BANK_TYPE from './bankType';
import * as BILLING_CYCLE from '../../../../common/teacherBillingCycle';
import * as PAYMENT_STATUS from '../../../../common/teacherPaymentStatus';

class Payment extends React.Component {
  static propTypes = {
    payments: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };

  static defaultProps = {
    payments: [],
    page: 1,
    pageSize: 10,
    total: 0,
  };

  state = {
    dialogVisible: false,
  };

  showPaymentDetails = () => {
    //  TODO
    this.setState({
      dialogVisible: true,
    });
  };

  closePaymentDetails = () => {
    this.setState({ dialogVisible: false });
  };

  confirmBill = () => {
    //  TODO
  };

  recalculate = () => {
    //  TODO
  };

  cancelConfirmation = () => {
    //  TODO
  };

  completePayment = () => {
    //  TODO
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
  };

  render() {
    const {
      loading,
      payments,
      page,
      pageSize,
      total,
    } = this.props;

    const pagination = {
      total,
      pageSize,
      current: page,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['5', '10', '15', '20', '30'],
      showTotal: all => `总共${all}条`,
    };

    const columns = [
      {
        title: '金额',
        key: 'amount',
        dataIndex: 'amount',
      },
      {
        title: '结算周期',
        key: 'billingCycle',
        dataIndex: 'billingCycle',
        render: (cycle) => {
          if (cycle === BILLING_CYCLE.WEEKLY) {
            return '周结';
          }

          if (cycle === BILLING_CYCLE.MONTHLY) {
            return '月结';
          }

          return '清算';
        },
      },
      {
        title: '银行信息',
        key: 'bankInfo',
        dataIndex: 'bankInfo',
        render: (bankInfo) => {
          if (bankInfo.type === BANK_TYPE.USA) {
            return (<BankUsa account={bankInfo.account} />);
          }

          if (bankInfo.type === BANK_TYPE.PAYPAL) {
            return (<Paypal account={bankInfo.account} />);
          }

          return (<WireTransfer account={bankInfo.account} />);
        },
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          const currentStatus = _.filter(
            PAYMENT_STATUS.STATUS
            , item => item.value === status)[0];

          return (
            <Tag
              color={currentStatus.color}
            >{currentStatus.text}</Tag>
          );
        },
      },
      {
        title: '时间',
        key: 'ctime',
        dataIndex: 'ctime',
        render: ctime => moment(ctime).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => {
          const { status } = record;
          if (status === PAYMENT_STATUS.CREATED) {
            return (
              <Created
                onShowDetails={() => this.showPaymentDetails(record)}
                onConfirmPayment={() => this.confirmBill(record)}
                onRecalculate={() => this.recalculate(record)}
                onCancelPayment={() => this.cancelConfirmation(record)}
              />
            );
          }

          if (status === PAYMENT_STATUS.CONFIRMED) {
            return (
              <Confirmed
                onShowDetails={() => this.showPaymentDetails(record)}
                onConfirmPayment={() => this.completePayment(record)}
                onRecalculate={() => this.recalculate(record)}
                onCancelPayment={() => this.cancelConfirmation(record)}
              />
            );
          }

          if (status === PAYMENT_STATUS.WITHDRAWED) {
            return (
              <Withdrawed
                onShowDetails={() => this.showPaymentDetails(record)}
              />
            );
          }

          return null;
        },
      },
    ];

    return (
      <div>
        <SearchForm />
        <Table
          rowKey="id"
          style={{ marginTop: 16 }}
          loading={loading}
          columns={columns}
          pagination={pagination}
          dataSource={payments}
          onChange={this.handleTableChange}
        />
        <Modal
          visible={this.state.dialogVisible}
          title="提现明细"
          okText="确定"
          cancelText="取消"
          onOk={this.closePaymentDetails}
          onCancel={this.closePaymentDetails}
          width={700}
        >
          <Bill readonly />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    page: 1,
    pageSize: 10,
    total: 4,
    payments: [
      {
        id: 1,
        amount: 150,
        billingCycle: 1,
        bankInfo: {
          account: {
            number: '12312',
            type: 'checking',
            routing: '123123',
            bank: {
              name: '123123',
              branch: '',
            },
            country: 'United States',
            holder: {
              name: 'holder name',
            },
          },
          type: 1,
        },
        status: 0,
        ctime: 1481080360000,
      },
      {
        id: 11,
        amount: 151,
        billingCycle: 2,
        bankInfo: {
          account: {
            number: '123897@123.com',
          },
          type: 2,
        },
        status: 1,
        ctime: '2016-12-04 23:59:59',
      },
      {
        id: 12,
        amount: 152,
        billingCycle: 0,
        bankInfo: {
          account: {
            number: 'account number',
            bank: {
              name: 'bank name',
              branch: 'bank branch',
            },
            swiftCode: 'swift code',
            intermediarySwiftCode: '',
            country: 'United States',
            holder: {
              name: 'holder name',
            },
          },
          type: 3,
        },
        status: 2,
        ctime: '2016-11-20 23:59:59',
      },
      {
        id: 13,
        amount: 153,
        billingCycle: 0,
        bankInfo: {
          account: {
            number: '12312',
            type: 'checking',
            routing: '123123',
            bank: {
              name: '123123',
              branch: '',
            },
            country: 'United States',
            holder: {
              name: 'holder name',
            },
          },
          type: 1,
        },

        status: 3,
        ctime: '2016-10-21 23:59:59',
      },
    ],
  };
}

export default connect(mapStateToProps)(Payment);

