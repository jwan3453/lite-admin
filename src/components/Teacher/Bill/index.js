import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Tag,
  Tooltip,
  Button,
  Popconfirm,
  Message,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import SearchForm from './SearchForm';
import {
  Bonus,
  Certificate,
  Schedule,
  StandBy,
} from '../../Common/TeacherIncomeDetails';

import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';
import * as INCOME_CATEGORY from '../../../common/teacherIncomeCategories';
import * as BILL_STATUS from '../../../common/teacherBillStatus';

import { searchTeacherBills, cancelTeacherBill } from '../../../app/actions/teacherBill';
import { getSimpleList } from '../../../app/actions/teacher';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

class TeacherBill extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    readonly: React.PropTypes.bool,
    filters: React.PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    filters: {},
    teacherBillData: {},
    readonly: false,
  };

  state = {
    filters: {},
    teacherBillData: {},
  };

  cancelBill = (billId) => {
    const { dispatch } = this.props;
    dispatch(cancelTeacherBill(billId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        this.retrieveBillData(this.props.filters);
      }
    });
  };

  handleSearch = (filters) => {
    this.retrieveBillData(filters);
  };

  retrieveBillData(filters) {
    const { dispatch } = this.props;
    dispatch(searchTeacherBills(filters)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        const billData = result.response;
        const ids = _.map(billData.result, ele => ele.teacherId);

        dispatch(getSimpleList(ids)).then((teacherList) => {
          const teachers = teacherList.response;
          billData.result = _.map(billData.result, (ele) => {
            const foundTeacher = _.find(teachers, teacher => teacher.id === ele.teacherId);
            const teacherInfo = {};
            if (foundTeacher) {
              teacherInfo.teacherName = foundTeacher.username;
              teacherInfo.teacherStatus = foundTeacher.status;
            }
            return _.assign({}, ele, teacherInfo);
          });

          this.setState({ teacherBillData: billData });
        });
      }
    });
  }

  render() {
    const {
      loading,
      readonly,
    } = this.props;

    const { teacherBillData } = this.state;
    const { result: list } = teacherBillData;

    const pagination = {
      total: teacherBillData.total || 0,
      pageSize: teacherBillData.pageSize,
      current: teacherBillData.page || 1,
      showSizeChanger: true,
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
        render: (teacherStatus) => {
          const currentStatus = TEACHER_STATUS_MAP[teacherStatus];
          return currentStatus ? currentStatus.text : '';
        },
      },
      {
        title: '金额',
        key: 'amount',
        dataIndex: 'amount',
      },
      {
        title: '时间',
        key: 'ctime',
        dataIndex: 'billTime',
        render: billTime => moment(new Date(billTime.date)).format(TIME_FORMAT),
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
        key: 'category',
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
        render: (status, record) => {
          if (readonly) { return null; }

          const showActionButtons = status === BILL_STATUS.CREATED;

          return !showActionButtons
            ? null
            : (
              <Popconfirm
                title="操作不可逆，确认继续？"
                onConfirm={() => this.cancelBill(record.id)}
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
          loading={loading}
          columns={columns}
          pagination={pagination}
          dataSource={list}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, teacherBill } = state;
  const { filters, result: teacherBillData } = teacherBill;
  return {
    loading,
    filters,
    teacherBillData,
  };
}

export default connect(mapStateToProps)(TeacherBill);

