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

const TIME_FORMAT = 'YYYY-MM-DD hh:mm';

class TeacherBill extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    list: React.PropTypes.array,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
    readonly: React.PropTypes.bool,
  };

  static defaultProps = {
    page: 1,
    pageSize: 10,
    total: 0,
    list: [],
    readonly: false,
  };

  cancelBill = (bill) => {
    //  todo dispatch action here
    console.log('canceling bill, ', bill);
  };

  render() {
    const {
      loading,
      page,
      pageSize,
      total,
      list,
      readonly,
    } = this.props;

    const pagination = {
      total: total || 0,
      pageSize,
      current: page || 1,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    const columns = [
      {
        title: '老师',
        key: 'teacherName',
        dataIndex: 'teacher',
        render: teacher => teacher.nickname,
      },
      {
        title: '老师状态',
        key: 'teacherStatus',
        dataIndex: 'teacher',
        render: (teacher) => {
          const currentStatus = TEACHER_STATUS_MAP[teacher.status];
          return currentStatus.text;
        },
      },
      {
        title: '金额',
        key: 'amount',
        dataIndex: 'bill',
        render: bill => bill.amount,
      },
      {
        title: '时间',
        key: 'ctime',
        dataIndex: 'bill',
        render: bill => moment(new Date(bill.ctime)).format(TIME_FORMAT),
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'bill',
        render: (bill) => {
          const currentStatus = BILL_STATUS.STATUS_MAP[bill.status];

          const tag = (
            <Tag
              color={currentStatus.color}
            >{currentStatus.text}</Tag>
          );

          const popConfirm = (
            <Popconfirm
              title="操作不可逆，确认继续？"
              onConfirm={() => this.cancelBill(bill)}
            >
              <Tooltip title="取消账单">{tag}</Tooltip>
            </Popconfirm>
          );

          return bill.status !== BILL_STATUS.CREATED
          ? tag
          : popConfirm;
        },
      },
      {
        title: '收入分类',
        key: 'category',
        dataIndex: 'bill',
        render: (bill) => {
          const { category } = bill;
          let showcase;
          switch (category.type) {
            case INCOME_CATEGORY.CERTIFICATE:
              showcase = <Certificate data={category} />;
              break;
            case INCOME_CATEGORY.SCHEDULE:
              showcase = <Schedule data={category} />;
              break;
            case INCOME_CATEGORY.BONUS:
              showcase = <Bonus data={category} />;
              break;
            case INCOME_CATEGORY.STANDBY:
              showcase = <StandBy data={category} />;
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
          if (readonly) {
            return null;
          }

          const { bill } = record;

          const showActionButtons = bill.status === BILL_STATUS.CREATED;

          return !showActionButtons
          ? null
          : (
            <Popconfirm
              title="操作不可逆，确认继续？"
              onConfirm={() => this.cancelBill(bill)}
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
        <SearchForm />
        <Table
          rowKey="id"
          size="small"
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

function mapStateToProps() {
  return {
    loading: false,
    page: 1,
    pageSize: 10,
    total: 20,
    list: [
      {
        teacher: {
          id: 1,
          nickname: 'peter 1',
          status: 1,
        },
        bill: {
          id: 0,
          amount: 8,
          status: 0,
          ctime: 1479657540000,
          category: {
            type: 'App\\Models\\TeacherCertificate',
            certification: {
              title: 'Milo Session CERT',
              start: 1495590360000,
            },
          },
        },
      },
      {
        teacher: {
          id: 2,
          nickname: 'peter 2',
          status: 2,
        },
        bill: {
          id: 1,
          amount: 8,
          status: 1,
          ctime: 1479657540000,
          category: {
            type: 'App\\Models\\TeacherSchedule',
            course: {
              name: 'G1',
              lesson: {
                name: '1-9',
                begin_at: 1496980612150,
              },
            },
          },
        },
      },
      {
        teacher: {
          id: 3,
          nickname: 'peter 3',
          status: 3,
        },
        bill: {
          id: 2,
          amount: 8,
          status: 2,
          ctime: 1479657540000,
          category: {
            type: 'App\\Models\\TeacherBonus',
            bonus: {
              type: 0,
              comment: '',
            },
          },
        },
      },
      {
        teacher: {
          id: 4,
          nickname: 'peter 4',
          status: 4,
        },
        bill: {
          id: 3,
          amount: 8,
          status: 3,
          ctime: 1479657540000,
          category: {
            type: 'App\\Models\\Standby',
            from: 1496880000000,
            to: 1496980612150,
            remark: '',
          },
        },
      },
    ],
  };
}

export default connect(mapStateToProps)(TeacherBill);

