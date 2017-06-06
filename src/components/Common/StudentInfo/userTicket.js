import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Button,
  Table,
  Modal,
} from 'antd';
import moment from 'moment';

import {
  TicketForm,
  TICKET_TYPES,
  TICKET_STATUS,
} from './TicketForm/index';

const TICKET_TYPES_MAP = {};

_.each(TICKET_TYPES, (item) => { TICKET_TYPES_MAP[`${item.value}`] = item.name; });

const TICKET_STATUS_MAP = {};

_.each(TICKET_STATUS, (item) => { TICKET_STATUS_MAP[`${item.value}`] = item.name; });

class UserTicket extends React.Component {
  static propTypes = {
    tickets: React.PropTypes.array,
    loading: React.PropTypes.bool,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
  };

  static defaultProps = {
    tickets: [],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  };

  state = {
    dialogVisible: false,
  };

  showDialog = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  handleCreateTicket = () => {
    //  todo create a new ticket
  }

  render() {
    const { dialogVisible } = this.state;
    const {
      loading,
      total,
      page,
      pageSize,
      tickets,
    } = this.props;

    const pagination = {
      current: page,
      pageSize,
      total,
    };

    const columns = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '问题',
        key: 'subject',
        dataIndex: 'subject',
      },
      {
        title: '用户',
        key: 'user',
        dataIndex: 'user',
        render: user => `[${user.id}] ${user.name}`,
      },
      {
        title: '工单类型',
        key: 'type',
        dataIndex: 'type',
        render: ticketType => TICKET_TYPES_MAP[ticketType],
      },
      {
        title: '处理人',
        key: 'assignee',
        dataIndex: 'assignee',
        render: assignee => assignee.name,
      },
      {
        title: '联系时间',
        key: 'ctime',
        dataIndex: 'ctime',
        render: ctime => moment(new Date(ctime)).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '提交人',
        key: 'submitter',
        dataIndex: 'submitter',
        render: submitter => submitter.name,
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => TICKET_STATUS_MAP[status],
      },
      {
        title: '操作',
        key: 'actions',
        render: () => (
          <div>
            <Button icon="edit" style={{ marginRight: 8 }} />
            <Button icon="delete" />
          </div>
        ),
      },
    ];

    return (
      <div>
        <Button
          onClick={this.showDialog}
        >新建工单</Button>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={tickets}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="工单"
          visible={dialogVisible}
          onOk={this.handleCreateTicket}
          onCancel={() => this.setState({ dialogVisible: false })}
        >
          <TicketForm />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    page: 1,
    pageSize: 10,
    total: 20,
    tickets: [
      {
        id: 0,
        subject: '新增一个工单',
        user: {
          id: 5,
          name: 'nickname',
        },
        type: 6,
        assignee: {
          id: 0,
          name: 'milo',
        },
        submitter: {
          id: 0,
          name: 'admin',
        },
        status: -1,
        ctime: 1488189894000,
      },
      {
        id: 1,
        subject: '新增一个工单',
        user: {
          id: 5,
          name: 'nickname',
        },
        type: 6,
        assignee: {
          id: 0,
          name: 'milo',
        },
        submitter: {
          id: 0,
          name: 'admin',
        },
        status: 0,
        ctime: 1488189894000,
      },
      {
        id: 2,
        subject: '新增一个工单',
        user: {
          id: 5,
          name: 'nickname',
        },
        type: 6,
        assignee: {
          id: 0,
          name: 'milo',
        },
        submitter: {
          id: 0,
          name: 'admin',
        },
        status: 1,
        ctime: 1488189894000,
      },

    ],
  };
}

export default connect(mapStateToProps)(UserTicket);

