import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
  Modal,
  Message,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import SearchForm from './SearchForm';
import PaymentForm from './PaymentForm';
//
import { Created, Confirmed, Withdrawed } from './ActionBar/index';
import { Paypal, BankUsa, WireTransfer } from './BankInfo/index';
import PaymentBills from './PaymentBills';
import { searchTeacherPayment, createTeacherPayment } from '../../../app/actions/teacherPayment';
import { getSimpleList } from '../../../app/actions/teacher';

import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';
import * as BANK_TYPE from '../../../common/teacherBankTypes';
import * as BILLING_CYCLE from '../../../common/teacherBillingCycle';
import * as PAYMENT_STATUS from '../../../common/teacherPaymentStatus';

class Payment extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    filters: React.PropTypes.object,
    teacherPaymentData: React.PropTypes.object.isRequired,
    teachers: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };

  static defaultProps = {
    filters: {},
    teacherPaymentData: {},
    teachers: [],
    loading: false,
  };

  state = {
    paymentDetailDialogVisible: false,
    createPaymentDialogVisible: false,
    loading: false,
    teacherPaymentData: {},
    selectPaymentId: -1,
  };

  showPaymentDetails = (payment) => {
    this.setState({
      paymentDetailDialogVisible: true,
      selectPaymentId: payment.id,
    });
  };

  closePaymentDetails = () => {
    this.setState({ paymentDetailDialogVisible: false });
  };

  confirmBill = () => {
    //  TODO
  };

  recalculate = () => {
    //  TODO
  };

  cancelConfirmation = () => {
    const { filters } = this.props;
    console.log('loging...', filters);
  };

  completePayment = () => {
    //  TODO
  };

  handleTableChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      this.searchPayment(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  handleSearch = (filters) => {
    this.searchPayment(filters);
  };

  createPayment = (data) => {
    const { dispatch } = this.props;
    dispatch(createTeacherPayment(data)).then((result) => {
      this.setState({ createPaymentDialogVisible: false });
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建提现成功');
        const { filters } = this.props;
        this.searchPayment(filters);
      }
    });
  };

  searchPayment(filters) {
    const { dispatch } = this.props;
    dispatch(searchTeacherPayment(filters)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        const paymentData = result.response.result;
        const teacherIds = _.chain(paymentData).map(item => item.teacherId).uniq().value();
        dispatch(getSimpleList(teacherIds)).then(() => {
          const { teacherPaymentData, teachers } = this.props;
          const combinedResultData = _.map(teacherPaymentData.result, (ele) => {
            const foundTeacher = _.find(teachers, teacher => teacher.id === ele.teacherId);
            const teacherInfo = {};
            if (foundTeacher) {
              teacherInfo.teacherName = foundTeacher.username;
              teacherInfo.teacherStatus = foundTeacher.status;
            }
            return _.assign({}, ele, teacherInfo);
          });

          const combinedPaymentData = _.assign({},
            teacherPaymentData, { result: combinedResultData });

          this.setState({ teacherPaymentData: combinedPaymentData });
        });
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { teacherPaymentData, selectPaymentId } = this.state;
    const { total, pageSize, page, result: paymentList } = teacherPaymentData;


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
        title: '老师',
        key: 'teacherName',
        dataIndex: 'teacherName',
      },
      {
        title: '老师状态',
        key: 'teacherStatus',
        dataIndex: 'teacherStatus',
        render: teacherStatus => (teacherStatus ? TEACHER_STATUS_MAP[teacherStatus].text : ''),
      },
      {
        title: '金额',
        key: 'amount',
        dataIndex: 'amount',
      },
      {
        title: '结算周期',
        key: 'billingCycle',
        dataIndex: 'paymentCycle',
        render: (paymentCycle) => {
          if (paymentCycle === BILLING_CYCLE.WEEKLY) {
            return '周结';
          }

          if (paymentCycle === BILLING_CYCLE.MONTHLY) {
            return '月结';
          }

          return '清算';
        },
      },
      {
        title: '银行信息',
        key: 'bankInfo',
        dataIndex: 'bankAccountInfo',
        render: (bankAccountInfo) => {
          const bankInfo = JSON.parse(bankAccountInfo);
          if (bankInfo.bank_type === BANK_TYPE.USA) {
            const account = {
              number: bankInfo.account_number,
              country: bankInfo.country,
              bank: { name: bankInfo.bank_name },
              type: bankInfo.account_type,
              routing: bankInfo.routing_number,
              holder: { name: bankInfo.holder_name },
            };
            return (<BankUsa account={account} />);
          }

          if (bankInfo.bank_type === BANK_TYPE.PAYPAL) {
            const account = { number: bankInfo.account_number };
            return (<Paypal account={account} />);
          }

          const account = {
            number: bankInfo.account_number,
            bank: {
              name: bankInfo.bank_name,
            },
            country: bankInfo.country,
            swiftCode: bankInfo.swift_code,
            holder: { name: bankInfo.holder_name },
            branch: bankInfo.bank_branch,
            intermediarySwiftCode: bankInfo.intermediary_swift_code,
          };
          return (<WireTransfer account={account} />);
        },
      },
      {
        title: '状态',
        key: 'paymentStatus',
        dataIndex: 'status',
        render: (status) => {
          const currentStatus = PAYMENT_STATUS.STATUS_MAP[status];

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
        dataIndex: 'createdAt',
        render: createdAt => (moment.unix(createdAt).format('YYYY-MM-DD HH:mm:ss')),
      },
      {
        title: '操作',
        key: 'actions',
        render: (payment) => {
          const { status } = payment;
          if (status === PAYMENT_STATUS.CREATED) {
            return (
              <Created
                onShowDetails={() => this.showPaymentDetails(payment)}
                onConfirmPayment={() => this.confirmBill(payment)}
                onRecalculate={() => this.recalculate(payment)}
                onCancelPayment={() => this.cancelConfirmation(payment)}
              />
            );
          }

          if (status === PAYMENT_STATUS.CONFIRMED) {
            return (
              <Confirmed
                onShowDetails={() => this.showPaymentDetails(payment)}
                onConfirmPayment={() => this.completePayment(payment)}
                onRecalculate={() => this.recalculate(payment)}
                onCancelPayment={() => this.cancelConfirmation(payment)}
              />
            );
          }

          if (status === PAYMENT_STATUS.WITHDRAWED) {
            return (
              <Withdrawed
                onShowDetails={() => this.showPaymentDetails(payment)}
              />
            );
          }

          return null;
        },
      },
    ];

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          onCreate={() => {
            this.setState({ createPaymentDialogVisible: true });
          }}
        />
        <Table
          rowKey="id"
          style={{ marginTop: 16 }}
          loading={loading}
          columns={columns}
          pagination={pagination}
          dataSource={paymentList}
          onChange={this.handleTableChange}
        />
        <Modal
          visible={this.state.paymentDetailDialogVisible}
          title="提现明细"
          okText="确定"
          cancelText="取消"
          onOk={this.closePaymentDetails}
          onCancel={this.closePaymentDetails}
          width={700}
        >
          <PaymentBills
            paymentId={selectPaymentId}
          />
        </Modal>
        <Modal
          visible={this.state.createPaymentDialogVisible}
          title="创建提现"
          footer={null}
          onCancel={() => this.setState({ createPaymentDialogVisible: false })}
          width={700}
        >
          <PaymentForm onSubmit={this.createPayment} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, teacherPayment, teacher } = state;
  const { filters, result: teacherPaymentData } = teacherPayment;
  const { simpleList: teachers } = teacher;
  return {
    loading,
    filters,
    teacherPaymentData,
    teachers,
  };
}

export default connect(mapStateToProps)(Payment);

