import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Tooltip,
  Tag,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import SearchForm from './SearchForm';

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

  showPaymentDetails = () => {
    //  TODO
  };

  confirmPayment = () => {
    //  TODO
  };

  recalculate = () => {
    //  TODO
  };

  cancelPayment = () => {
    //  TODO
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
        key: 'bankAccount',
        dataIndex: 'bankAccount',
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
        render: (text, record) => (
          <div>
            <Tooltip placement="top" title="查看明细">
              <Button
                icon="book"
                style={{ marginRight: 8 }}
                onClick={() => this.showPaymentDetails(record)}
              />
            </Tooltip>
            <Tooltip placement="top" title="确认正确">
              <Button
                icon="check"
                style={{ marginRight: 8 }}
                onClick={() => this.confirmPayment(record)}
              />
            </Tooltip>
            <Tooltip placement="top" title="重新计算">
              <Button
                icon="calculator"
                style={{ marginRight: 8 }}
                onClick={() => this.recalculate(record)}
              />
            </Tooltip>
            <Tooltip placement="top" title="取消提现">
              <Button
                icon="close"
                onClick={() => this.cancelPayment(record)}
              />
            </Tooltip>
          </div>
        ),
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
    total: 4,
    payments: [
      {
        id: 1,
        amount: 150,
        billingCycle: 1,
        bankAccount: 'PayPal: 123897@123.com',
        status: 0,
        ctime: 1481080360000,
      },
      {
        id: 11,
        amount: 151,
        billingCycle: 2,
        bankAccount: 'PayPal: 123897@123.com',
        status: 1,
        ctime: '2016-12-04 23:59:59',
      },
      {
        id: 12,
        amount: 152,
        billingCycle: 0,
        bankAccount: 'PayPal: 123897@123.com',
        status: 2,
        ctime: '2016-11-20 23:59:59',
      },
      {
        id: 13,
        amount: 153,
        billingCycle: 0,
        bankAccount: 'PayPal: 123897@123.com',
        status: 3,
        ctime: '2016-10-21 23:59:59',
      },
    ],
  };
}

export default connect(mapStateToProps)(Payment);

