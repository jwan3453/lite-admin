import React, { Component } from 'react';
import { Table, Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import SearchForm from './SearchForm';
import funnels from '../../../common/refundFunnels';
import {
  STATUS_MAP as REFUND_STATUS_MAP,
} from '../../../common/refundStatus';

const funnelNames = {};

funnels.forEach((item) => {
  const key = `${item.value}`;
  funnelNames[key] = item.name;
});

class RefundList extends Component {

  static propTypes = {
    refunds: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    refunds: {},
  };

  state = {
  };

  handleSearch = (filters) => {
    console.log(filters);
  };

  handleApprove = () => {};

  handleReject = () => {};

  render() {
    const { refunds } = this.props;
    const dataSource = refunds.result || [];
    const pageSize = refunds.pageSize || 10;
    const pagination = {
      total: refunds.total || 0,
      pageSize,
      current: refunds.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: '退款单ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户ID',
        dataIndex: 'user',
        key: 'user',
        render: user => (
          <a
            tabIndex={0}
            role="button"
          >{user.id}</a>
        ),
      },
      {
        title: '订单',
        dataIndex: 'bill',
        key: 'bill',
        render: bill => (`[${bill.id}] 订单：${bill.title}`),
      },
      {
        title: '退款金额',
        dataIndex: 'sum',
        key: 'sum',
      },
      {
        title: '退款课时',
        dataIndex: 'hours',
        key: 'hours',
      },
      {
        title: '退款方式',
        dataIndex: 'funnel',
        key: 'funnel',
        render: text => (funnelNames[text]),
      },
      {
        title: '退款账号',
        dataIndex: 'bankAccount',
        key: 'bankAccount',
      },
      {
        title: '退款原因',
        dataIndex: 'comment',
        key: 'comment',
      },
      {
        title: '创建人',
        dataIndex: 'operator',
        key: 'operator',
        render: text => (text.nickname),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => (moment(new Date(text)).format('YYYY-MM-DD hh:mm:ss')),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          const currentStatus = REFUND_STATUS_MAP[status];
          return currentStatus.name;
        },
      },
      {
        title: '操作',
        key: 'actions',
        render: () => (
          <div>
            <Tooltip placement="top" title="确认退款">
              <Button
                icon="check"
                size="default"
                style={{ marginRight: 8 }}
                onClick={() => this.handleApprove()}
              />
            </Tooltip>
            <Tooltip placement="top" title="取消退款">
              <Button
                icon="close"
                size="default"
                onClick={() => this.handleReject()}
              />
            </Tooltip>
          </div>
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          pageSize={pageSize}
        />
        <Table
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    refunds: {
      result: [
        {
          id: '2338',
          status: 1,
          user: {
            id: 376776,
          },
          bill: {
            id: 296354,
            title: '5月团购课程包',
          },
          sum: 42,
          hours: 2,
          funnel: 1,
          bankAccount: '',
          comment: '客户取消购买',
          operator: {
            id: 1,
            nickname: 'Lily',
          },
          createTime: 1496284621771,
        },
        {
          id: '2339',
          status: 1,
          user: {
            id: 376776,
          },
          bill: {
            id: 296354,
            title: '5月团购课程包',
          },
          sum: 42,
          hours: 2,
          funnel: 1,
          bankAccount: '',
          comment: '客户取消购买',
          operator: {
            id: 1,
            nickname: 'Lily',
          },
          createTime: 1496284621771,
        },
        {
          id: '2340',
          status: 2,
          user: {
            id: 376776,
          },
          bill: {
            id: 296354,
            title: '5月团购课程包',
          },
          sum: 42,
          hours: 2,
          funnel: 1,
          bankAccount: '',
          comment: '客户取消购买',
          operator: {
            id: 1,
            nickname: 'Lily',
          },
          createTime: 1496284621771,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(RefundList);
