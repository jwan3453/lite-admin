import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import * as BANK_TYPE from '../../../../common/teacherBankTypes';

class BankAccounts extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    bankinfo: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    bankinfo: [],
  };

  render() {
    const {
      loading,
      bankinfo,
    } = this.props;

    const columns = [
      {
        title: '账号',
        key: 'number',
        dataIndex: 'account',
        render: account => account.number,
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
        render: (type) => {
          if (type === BANK_TYPE.USA) {
            return '美国银行';
          }

          if (type === BANK_TYPE.PAYPAL) {
            return 'PayPal';
          }

          return '电汇';
        },
      },
      {
        title: '账号详情',
        key: 'details',
        render: (text, record) => {
          const { account } = record;
          const bankType = record.type;
          if (bankType === BANK_TYPE.USA) {
            return (
              <div>
                <div>账户类型：{account.type}</div>
                <div>银行：{account.bank.name}</div>
                <div>国家：{account.country}</div>
                <div>汇款路线号码：{account.routing}</div>
                <div>持有人：{account.holder.name}</div>
              </div>
            );
          }

          if (bankType === BANK_TYPE.WIRE_TRANSFER) {
            return (
              <div>
                <div>SWIFT: {account.swiftCode}</div>
                <div>持有人: {account.holder.name}</div>
                <div>银行：{account.bank.name}</div>
                <div>分行: {account.bank.branch}</div>
                <div>分行SWIFT: {account.intermediarySwiftCode}</div>
              </div>
            );
          }

          return '--';
        },
      },
    ];

    return (
      <Table
        size="small"
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={bankinfo}
      />
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    bankinfo: [
      {
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
      {
        account: {
          number: '123897@123.com',
        },
        type: 2,
      },
      {
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
    ],
  };
}

export default connect(mapStateToProps)(BankAccounts);

