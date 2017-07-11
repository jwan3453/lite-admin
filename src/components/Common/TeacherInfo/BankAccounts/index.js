import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import * as BANK_TYPE from '../../../../common/teacherBankTypes';
import { fetchBankAccount } from '../../../../app/actions/teacher';

class BankAccounts extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    bankAccounts: React.PropTypes.array,
    teacherId: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    loading: false,
    bankAccounts: [],
  };

  componentWillMount() {
    const { dispatch, loading, teacherId } = this.props;
    if (!loading) {
      dispatch(fetchBankAccount(teacherId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, teacherId } = this.props;
    if (nextProps.teacherId > 0 && nextProps.teacherId !== teacherId) {
      dispatch(fetchBankAccount(nextProps.teacherId));
    }
  }

  render() {
    const {
      loading,
      bankAccounts,
    } = this.props;

    const columns = [
      {
        title: '账号',
        key: 'number',
        dataIndex: 'accountNumber',
      },
      {
        title: '类型',
        key: 'bankType',
        dataIndex: 'bankType',
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
          const { accountInfo } = record;
          const bankType = record.bankType;
          if (bankType === BANK_TYPE.USA) {
            return (
              <div>
                <div>账户类型：{accountInfo.accountType}</div>
                <div>银行：{accountInfo.bankName}</div>
                <div>国家：{accountInfo.country}</div>
                <div>汇款路线号码：{accountInfo.routingNumber}</div>
                <div>持有人：{accountInfo.holderName}</div>
              </div>
            );
          }

          if (bankType === BANK_TYPE.WIRE_TRANSFER) {
            return (
              <div>
                <div>SWIFT: {accountInfo.swiftCode}</div>
                <div>持有人: {accountInfo.holderName}</div>
                <div>银行：{accountInfo.bankName}</div>
                <div>分行: {accountInfo.bankBranch}</div>
                <div>分行SWIFT: {accountInfo.intermediarySwiftCode}</div>
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
        dataSource={bankAccounts}
      />
    );
  }
}

function mapStateToProps(state) {
  const { teacher } = state;
  return {
    loading: teacher.loading,
    bankAccounts: teacher.bankAccounts,
  };
}

export default connect(mapStateToProps)(BankAccounts);

