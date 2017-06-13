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
  STATUS_MAP as BONUS_STATUS_MAP,
} from '../../../../common/bonusStatus';

class Bonus extends React.Component {
  static propTypes = {
    bonus: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };
  static defaultProps = {
    bonus: [],
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
      bonus,
      page,
      pageSize,
      total,
    } = this.props;

    const columns = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '奖励类型',
        key: 'type',
        dataIndex: 'type',
        render: type => type,
      },
      {
        title: '时间',
        key: 'ctime',
        dataIndex: 'ctime',
        render: ctime => moment(ctime).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          const currentStatus = BONUS_STATUS_MAP[status];

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
          dataSource={bonus}
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
    bonus: [
      {
        id: 0,
        amount: 1,
        type: 0,
        status: 0,
        comment: '2016-11-28-2016-12-04 Review Bonus',
        ctime: 1496994684842,
      },
      {
        id: 1,
        amount: 1,
        type: 0,
        status: 1,
        comment: '2016-11-28-2016-12-04 Review Bonus',
        ctime: 1496994684842,
      },
      {
        id: 2,
        amount: 1,
        type: 0,
        status: 2,
        comment: '2016-11-28-2016-12-04 Review Bonus',
        ctime: 1496994684842,
      },
      {
        id: 3,
        amount: 1,
        type: 0,
        status: 0,
        comment: '2016-11-28-2016-12-04 Review Bonus',
        ctime: 1496994684842,
      },
    ],
  };
}

export default connect(mapStateToProps)(Bonus);

