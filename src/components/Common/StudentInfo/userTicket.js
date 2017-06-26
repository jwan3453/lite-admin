import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Modal,
  Popconfirm,
  Message,
} from 'antd';
import moment from 'moment';

import TicketForm from '../../Common/TicketForm';

import { fetchTicket, createTicket, updateTicket, deleteTicket } from '../../../app/actions/ticket';
import { fetchAdmins } from '../../../app/actions/admin';

import * as TICKET_TYPES from '../../../common/ticketTypes';
import * as TICKET_STATUS from '../../../common/ticketStatus';

class UserTicket extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    ticketData: React.PropTypes.object,
    loading: React.PropTypes.bool,
    studentId: React.PropTypes.number.isRequired,
    filters: React.PropTypes.object,
  };

  static defaultProps = {
    ticketData: {},
    loading: false,
    adminUsers: [],
    filters: {},
  };

  state = {
    dialogVisible: false,
    ticketFormData: {},
  };

  componentWillMount() {
    const { dispatch, loading, studentId } = this.props;
    if (!loading) {
      dispatch(fetchAdmins());
      dispatch(fetchTicket(studentId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchTicket(nextProps.studentId));
    }
  }

  showDialog = (ticket = {
    status: TICKET_STATUS.UNRESOLVED,
    type: TICKET_TYPES.OTHERS,
  }) => {
    //  todo should assign assignedAdminId to ticketInfo
    const { studentId } = this.props;
    const ticketInfo = {
      ...ticket,
      studentId,
    };
    this.setState({
      dialogVisible: true,
      ticketFormData: ticketInfo,
    });
  };

  handleUpdateTicket = (ticketId, data) => {
    const { dispatch, studentId } = this.props;
    dispatch(updateTicket(ticketId, data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('更新工单成功');
        this.setState({
          dialogVisible: false,
          ticketFormData: {},
        });
        dispatch(fetchTicket(studentId));
      }
    });
  };

  handleCreateTicket = (data) => {
    const { dispatch, studentId } = this.props;
    dispatch(createTicket({ ...data, studentId })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建工单成功');
        this.setState({
          dialogVisible: false,
          ticketFormData: {},
        });
        dispatch(fetchTicket(studentId));
      }
    });
  };

  handleDeleteTicket = (ticket) => {
    const { dispatch, studentId } = this.props;
    dispatch(deleteTicket(ticket.id)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('删除工单成功');
        this.setState({
          dialogVisible: false,
          ticketFormData: {},
        });
        dispatch(fetchTicket(studentId));
      }
    });
  };

  handleSubmitTicketForm = (data) => {
    if (data.id) {
      this.handleUpdateTicket(data.id, data);
    } else {
      this.handleCreateTicket(data);
    }
  };

  handlePaginationChange = (pagination) => {
    const { dispatch, filters, studentId } = this.props;
    dispatch(
      fetchTicket(studentId,
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  render() {
    const { dialogVisible } = this.state;
    const {
      loading,
      ticketData,
    } = this.props;

    const pageSize = ticketData.pageSize || 10;
    const dataSource = ticketData.result || [];
    const pagination = {
      total: ticketData.total || 0,
      pageSize,
      current: ticketData.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
        width: 30,
      },
      {
        title: '问题',
        key: 'subject',
        dataIndex: 'subject',
      },
      {
        title: '用户',
        key: 'user',
        dataIndex: 'studentId',
      },
      {
        title: '工单类型',
        key: 'type',
        dataIndex: 'type',
        render(ticketType) {
          return TICKET_TYPES.CATEGORY_MAP[ticketType]
            ? TICKET_TYPES.CATEGORY_MAP[ticketType].name
            : '';
        },
      },
      {
        title: '处理人',
        key: 'assignee',
        dataIndex: 'assignedAdminUsername',
      },
      {
        title: '联系时间',
        key: 'ctime',
        dataIndex: 'contactAt',
        render: ctime => moment.unix(ctime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '提交人',
        key: 'submitter',
        dataIndex: 'submittedAdminUsername',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render(status) {
          return TICKET_STATUS.STATUS_MAP[status]
            ? TICKET_STATUS.STATUS_MAP[status].name
            : '';
        },
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
              onConfirm={() => this.handleDeleteTicket(ticket)}
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
            this.showDialog();
          }}
        >新建工单</Button>
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={this.handlePaginationChange}
          style={{ marginTop: 16 }}
        />
        <Modal
          key={`Common-StudentInfo-Ticket-Modal-${new Date()}`}
          title="工单"
          visible={dialogVisible}
          onCancel={() => this.setState({ dialogVisible: false })}
          footer={null}
        >
          <TicketForm
            studentInputDisabled
            onSubmit={this.handleSubmitTicketForm}
            ticket={this.state.ticketFormData}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { ticket } = state;
  return {
    loading: ticket.loading,
    ticketData: ticket.result,
    filters: ticket.filters,
  };
}

export default connect(mapStateToProps)(UserTicket);
