import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Modal,
  Popconfirm,
} from 'antd';
import moment from 'moment';

import TicketForm from './TicketForm/index';

import {
  CATEGORY_MAP as TICKET_TYPES_MAP,
} from '../../../common/ticketTypes';

import {
  STATUS_MAP as TICKET_STATUS_MAP,
} from '../../../common/ticketStatus';

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
    ticket: {},
  };

  showDialog = (ticket = {}) => {
    this.setState({
      dialogVisible: true,
      ticket,
    });
  };

  updateTicket = () => {
    //  todo
  };

  createTicket = () => {
    //  todo create a new ticket
  };

  removeTicket = () => {
    //  todo
  };

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
        render: ticketType => TICKET_TYPES_MAP[ticketType].name,
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
        render: status => TICKET_STATUS_MAP[status].name,
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, ticket) => (
          <div>
            <Button
              icon="edit"
              style={{ marginRight: 8 }}
              onClick={() => this.showDialog(ticket)}
            />
            <Popconfirm
              title="确认删除？"
              placement="top"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.removeTicket(ticket)}
            >
              <Button icon="delete" />
            </Popconfirm>
          </div>
        ),
      },
    ];

    return (
      <div>
        <Button
          onClick={() => {
            this.showDialog({
              id: 0,
              subject: '',
              user: {
                id: 0,
                name: '',
              },
              type: 6,
              assignee: {
                id: 0,
                name: '0',
              },
              submitter: {
                id: 0,
                name: '',
              },
              status: 1,
              ctime: (new Date()).getTime(),
              comment: '',
            });
          }}
        >新建工单</Button>
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={tickets}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="工单"
          visible={dialogVisible}
          onOk={this.createTicket}
          onCancel={() => this.setState({ dialogVisible: false })}
        >
          <TicketForm
            ticket={this.state.ticket}
          />
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

