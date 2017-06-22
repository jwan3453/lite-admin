import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Modal,
  Button,
  Tooltip,
  Popconfirm,
} from 'antd';

import moment from 'moment';

import * as TICKET_STATUS from '../../../common/ticketStatus';

import {
  CATEGORY_MAP as TICKET_TYPES_MAP,
} from '../../../common/ticketTypes';

import SearchForm from './SearchForm';
import TicketForm from '../../Common/TicketForm';

import { getEmptyTicket } from './utils';

class Tickets extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    tickets: React.PropTypes.array,
  };

  static defaultProps = {
    tickets: [],
  };

  state = {
    dialogVisible: false,
    currentTicket: getEmptyTicket(),
  };

  showDialog = (currentTicket = getEmptyTicket()) => {
    this.setState({
      dialogVisible: true,
      currentTicket,
    });
  };

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      currentTicket: getEmptyTicket(),
    });
  };

  createTicket = () => {
    const ticket = this.ticketForm.getFieldsValue();
    console.log('createTicket', ticket);
    //  todo create a new ticket
    this.hideDialog();
  };

  updateTicket = () => {
    const ticket = this.ticketForm.getFieldsValue();
    console.log('updateTicket', ticket);
    //  todo update a ticket
    this.hideDialog();
  };

  removeTicket = (ticket) => {
    console.log(ticket);
    //  todo remove a ticket
  };

  render() {
    const {
      loading,
      tickets,
    } = this.props;

    const { currentTicket } = this.state;

    const columns = [
      {
        title: '问题',
        dataIndex: 'subject',
      },
      {
        title: '用户',
        dataIndex: 'user',
        render: user => user.nickname,
      },
      {
        title: '工单类型',
        dataIndex: 'type',
        render: ticketType => TICKET_TYPES_MAP[ticketType].name,
      },
      {
        title: '处理人',
        dataIndex: 'assignee',
        render: assignee => assignee.nickname,
      },
      {
        title: '联系时间',
        dataIndex: 'ctime',
        render: ctime => moment(ctime).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '提交人',
        dataIndex: 'submitter',
        render: submitter => submitter.nickname,
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: ticketStatus => TICKET_STATUS.STATUS_MAP[ticketStatus].name,
      },
      {
        title: '操作',
        render: (text, ticket) => (
          <div>
            <Tooltip title="编辑">
              <Button
                icon="edit"
                style={{ marginRight: 8 }}
                onClick={() => { this.showDialog(ticket); }}
              />
            </Tooltip>
            <Popconfirm
              title="该操作不可逆，确定继续？"
              placement="top"
              onConfirm={() => { this.removeTicket(ticket); }}
            >
              <Tooltip title="删除">
                <Button icon="delete" />
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ];

    return (
      <div>
        <SearchForm
          showDialog={this.showDialog}
        />
        <Table
          loading={loading}
          columns={columns}
          dataSource={tickets}
          style={{ marginTop: 16 }}
        />
        <Modal
          key={currentTicket.id}
          title={
            currentTicket.id < 0
            ? '新建工单'
            : '编辑工单'
          }
          maskClosable={false}
          visible={this.state.dialogVisible}
          onOk={
            currentTicket.id < 0
            ? this.createTicket
            : this.updateTicket
          }
          onCancel={this.hideDialog}
        >
          <TicketForm
            ticket={currentTicket}
            ref={(node) => { this.ticketForm = node; }}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    tickets: [
      {
        subject: 'test subject',
        user: {
          nickname: 'milo',
        },
        type: 0,
        status: 1,
        assignee: {
          nickname: 'peter',
        },
        ctime: 1498015008265,
        submitter: {
          nickname: 'halo',
        },
      },
    ],
  };
}

export default connect(mapStateToProps)(Tickets);

