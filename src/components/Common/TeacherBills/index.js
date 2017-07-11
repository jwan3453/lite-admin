import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
  Tooltip,
  Button,
  Popconfirm,
} from 'antd';
import moment from 'moment';

import SearchForm from './SearchForm';
import { Bonus, Certificate, Schedule, StandBy } from '../TeacherIncomeDetails';

import * as INCOME_CATEGORY from '../../../common/teacherIncomeCategories';
import * as BILL_STATUS from '../../../common/teacherBillStatus';
import { searchTeacherBills } from '../../../app/actions/teacherBill';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

class Bill extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object,
    teacherBill: React.PropTypes.object,
    teacherId: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    loading: false,
    filters: {},
    teacherBill: {},
  };

  componentWillMount() {
    const { dispatch, loading, filters, teacherId } = this.props;
    if (!loading) {
      dispatch(searchTeacherBills(Object.assign(filters, { teacherId })));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, teacherId, filters } = this.props;
    if (nextProps.teacherId > 0 && nextProps.teacherId !== teacherId) {
      dispatch(searchTeacherBills(Object.assign(filters, { teacherId: nextProps.teacherId })));
    }
  }

  cancelBill = (bill) => {
    //  todo dispatch action here
    console.log('canceling bill, ', bill);
  };

  handleSearch = (filters) => {
    this.retrieveBillData(filters);
  };

  retrieveBillData(filters) {
    const { dispatch } = this.props;
    dispatch(searchTeacherBills(Object.assign(this.props.filters, { ...filters })));
  }

  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchTeacherBills(Object.assign(filters, {
        page: pagination.current,
        pageSize: pagination.pageSize,
      }),
      ),
    );
  };

  render() {
    const { loading, teacherBill } = this.props;
    const dataSource = teacherBill.result || [];
    const pageSize = teacherBill.pageSize || 10;
    const pagination = {
      total: teacherBill.total || 0,
      pageSize,
      current: teacherBill.page || 1,
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
        render: (status, record) => {
          const currentStatus = BILL_STATUS.STATUS_MAP[status];

          const tag = (
            <Tag
              color={currentStatus.color}
            >{currentStatus.text}</Tag>
          );

          const popConfirm = (
            <Popconfirm
              title="操作不可逆，确认继续？"
              onConfirm={() => this.cancelBill(record)}
            >
              <Tooltip title="取消账单">{tag}</Tooltip>
            </Popconfirm>
          );

          return status !== BILL_STATUS.CREATED
          ? tag
          : popConfirm;
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
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => {
          const showActionButtons = record.status === BILL_STATUS.CREATED;

          return !showActionButtons
          ? null
          : (
            <Popconfirm
              title="操作不可逆，确认继续？"
              onConfirm={() => this.cancelBill(record)}
            >
              <Tooltip title="取消账单">
                <Button icon="close" />
              </Tooltip>
            </Popconfirm>
            );
        },
      },
    ];

    return (
      <div>
        <SearchForm onSearch={this.handleSearch} />
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
  const { loading, teacherBill } = state;
  const { filters, result } = teacherBill;
  return {
    loading,
    filters,
    teacherBill: result,
  };
}

export default connect(mapStateToProps)(Bill);

