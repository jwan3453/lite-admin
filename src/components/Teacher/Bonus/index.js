import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Tag,
  Tooltip,
  Popconfirm,
} from 'antd';
import moment from 'moment';
import SearchForm from './SearchForm';

import {
  TYPE_MAP as BONUS_TYPE_MAP,
} from '../../../common/bonusTypes';
import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';
import {
  STATUS_MAP as BONUS_STATUS_MAP,
} from '../../../common/bonusStatus';

class Bonus extends React.Component {
  static propTypes = {
    list: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };
  static defaultProps = {
    list: [],
    page: 1,
    pageSize: 10,
    total: 0,
  };

  cancelBonus = () => {
    //  todo
  };

  recalcBonus = () => {
    //  todo
  };

  render() {
    const {
      loading,
      list,
      page,
      pageSize,
      total,
    } = this.props;

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
        render: teacher => TEACHER_STATUS_MAP[teacher.status].text,
      },

      {
        title: '奖励类型',
        key: 'bonusType',
        dataIndex: 'bonus',
        render: bonus => BONUS_TYPE_MAP[bonus.type].text,
      },
      {
        title: '时间',
        key: 'ctime',
        dataIndex: 'ctime',
        render: ctime => moment(ctime).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '状态',
        key: 'bonusStatus',
        dataIndex: 'bonus',
        render: (bonus) => {
          const currentStatus = BONUS_STATUS_MAP[bonus.status];

          return (
            <Tag
              color={currentStatus.color}
            >{currentStatus.text}</Tag>
          );
        },
      },
      {
        title: '备注',
        key: 'comment',
        dataIndex: 'comment',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <div>
            <Popconfirm
              title="该操作不可逆，确定执行？"
              onConfirm={() => this.recalcBonus(record)}
            >
              <Tooltip
                placement="top"
                title="重新计算"
              >
                <Button icon="calculator" style={{ marginRight: 8 }} />
              </Tooltip>
            </Popconfirm>
            <Popconfirm
              title="该操作不可逆，确定执行？"
              onConfirm={() => this.cancelBonus(record)}
            >
              <Tooltip
                placement="top"
                title="取消奖金"
              >
                <Button icon="close" />
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ];

    const pagination = {
      total,
      pageSize,
      current: page,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    return (
      <div>
        <SearchForm />
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    list: [
      {
        teacher: {
          id: 0,
          nickname: 'peter 1',
          status: 1,
        },
        bonus: {
          id: 0,
          amount: 1,
          type: 0,
          status: 0,
          comment: '2016-11-28-2016-12-04 Review Bonus',
          ctime: 1496994684842,
        },
      },
      {
        teacher: {
          id: 0,
          nickname: 'peter 2',
          status: 2,
        },
        bonus: {
          id: 1,
          amount: 1,
          type: 1,
          status: 1,
          comment: '2016-11-28-2016-12-04 Review Bonus',
          ctime: 1496994684842,
        },
      },
      {
        teacher: {
          id: 0,
          nickname: 'peter 3',
          status: 3,
        },
        bonus: {
          id: 2,
          amount: 1,
          type: 2,
          status: 2,
          comment: '2016-11-28-2016-12-04 Review Bonus',
          ctime: 1496994684842,
        },
      },
      {
        teacher: {
          id: 0,
          nickname: 'peter 4',
          status: 4,
        },
        bonus: {
          id: 3,
          amount: 1,
          type: 0,
          status: 0,
          comment: '2016-11-28-2016-12-04 Review Bonus',
          ctime: 1496994684842,
        },
      },
    ],
  };
}

export default connect(mapStateToProps)(Bonus);

