import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
} from 'antd';
import moment from 'moment';

import { Bonus, Certificate, Schedule, StandBy } from '../../../Common/TeacherIncomeDetails';

import * as INCOME_CATEGORY from '../../../../common/teacherIncomeCategories';
import * as BILL_STATUS from '../../../../common/teacherBillStatus';

import { fetchPaymentBill } from '../../../../app/actions/teacherPayment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

class PaymentBills extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object,
    paymentBill: React.PropTypes.object,
    paymentId: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    loading: false,
    filters: {},
    paymentBill: {},
  };

  componentWillMount() {
    const { dispatch, loading, filters, paymentId } = this.props;
    if (!loading) {
      dispatch(fetchPaymentBill(filters, paymentId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, paymentId, filters } = this.props;
    if (nextProps.paymentId > 0 && nextProps.paymentId !== paymentId) {
      dispatch(fetchPaymentBill(filters, nextProps.paymentId));
    }
  }

  handleChange = (pagination) => {
    const { dispatch, filters, paymentId } = this.props;
    dispatch(
      fetchPaymentBill(Object.assign(filters,
        {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
        paymentId,
      ),
    );
  };

  render() {
    const { paymentBill, loading } = this.props;
    const dataSource = paymentBill.result || [];
    const pageSize = paymentBill.pageSize || 10;
    const pagination = {
      total: paymentBill.total || 0,
      pageSize,
      current: paymentBill.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '金额',
        key: 'amount',
        dataIndex: 'amount',
      },
      {
        title: '时间',
        key: 'billTime',
        dataIndex: 'billTime',
        render: begin => (begin ? moment.unix(begin).format(TIME_FORMAT) : '--'),
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          const currentStatus = BILL_STATUS.STATUS_MAP[status];
          return (
            <Tag
              color={currentStatus.color}
            >{currentStatus.text}</Tag>
          );
        },
      },
      {
        title: '收入分类',
        key: 'type',
        dataIndex: 'type',
        render: (type, record) => {
          const billInfo = JSON.parse(record.billInfo);
          if (!billInfo) {
            return null;
          }

          let showcase;
          switch (type) {
            case INCOME_CATEGORY.CERTIFICATE:
              showcase = <Certificate data={billInfo} />;
              break;
            case INCOME_CATEGORY.SCHEDULE:
              showcase = <Schedule data={billInfo} />;
              break;
            case INCOME_CATEGORY.BONUS:
              showcase = <Bonus data={{ bonus: billInfo }} />;
              break;
            case INCOME_CATEGORY.STANDBY:
              showcase = <StandBy data={billInfo} />;
              break;
            default:
              showcase = null;
              break;
          }
          return showcase;
        },
      },
    ];

    return (
      <div>
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          pagination={pagination}
          dataSource={dataSource}
          onChange={this.handleChange}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, teacherPayment } = state;
  const { paymentBill } = teacherPayment;
  return {
    loading,
    filters: paymentBill.filters,
    paymentBill: paymentBill.result,
  };
}


export default connect(mapStateToProps)(PaymentBills);

