import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Modal,
  Button,
  Tooltip,
  Popconfirm,
  Message,
} from 'antd';

import moment from 'moment';

import * as TICKET_STATUS from '../../../common/ticketStatus';

import { CATEGORY_MAP as TICKET_TYPES_MAP } from '../../../common/ticketTypes';

import SearchForm from './SearchForm';
import TicketForm from '../../Common/TicketForm';

import { getEmptyTicket } from './utils';
import {
  manageTicket,
  deleteTicket,
  updateTicket,
  createTicket,
} from '../../../app/actions/ticket';

class Tickets extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    ticketData: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object,
  };

  static defaultProps = {
    ticketData: {},
    loading: false,
    filters: {},
  };

  state = {
    dialogVisible: false,
    studentInputDisabled: false,
    currentTicket: getEmptyTicket(),
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(manageTicket());
  }

  showDialog = (
    currentTicket = getEmptyTicket(),
    studentInputDisabled = false,
  ) => {
    this.setState({
      dialogVisible: true,
      currentTicket,
      studentInputDisabled,
    });
  };

  hideDialog = () => {
    this.setState({
      dialogVisible: false,
      currentTicket: getEmptyTicket(),
    });
  };

  handleCreateTicket = (ticket) => {
    const { dispatch } = this.props;
    dispatch(createTicket(ticket)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        this.hideDialog();
        Message.success('更新工单成功');
        this.setState({
          dialogVisible: false,
          ticketFormData: {},
        });
        dispatch(manageTicket());
      }
    });
  };

  handleSubmitTicketForm = (ticket) => {
    if (ticket.id > 0) {
      this.handleUpdateTicket(ticket);
    } else {
      this.handleCreateTicket(ticket);
    }
  };

  handleUpdateTicket = (ticket) => {
    const { dispatch } = this.props;
    dispatch(updateTicket(ticket)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('更新工单成功');
        this.setState({
          dialogVisible: false,
          ticketFormData: {},
        });
        dispatch(manageTicket());
      }
    });
  };

  removeTicket = (ticket) => {
    const { dispatch } = this.props;
    dispatch(deleteTicket(ticket.id)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('删除工单成功');
        this.setState({
          dialogVisible: false,
          ticketFormData: {},
        });
        dispatch(manageTicket());
      }
    });
  };

  handlePaginationChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      manageTicket(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  handleSearchTickets = (data) => {
    const { dispatch } = this.props;
    dispatch(manageTicket(data));
  };

  render() {
    const { loading, ticketData } = this.props;

    const { currentTicket, studentInputDisabled } = this.state;

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
          return TICKET_TYPES_MAP[ticketType]
            ? TICKET_TYPES_MAP[ticketType].name
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
        render: (status) => {
          const statusText = TICKET_STATUS.STATUS_MAP[status]
            ? TICKET_STATUS.STATUS_MAP[status].name
            : '';
          let color = 'black';
          let icon = '';
          switch (status) {
            case 1:
              color = '#108ee9';
              icon = 'question-circle-o';
              break;
            case 2:
              color = '#00a854';
              icon = 'check-circle-o';
              break;
            case 3:
              color = '#ffbf00';
              icon = 'exclamation-circle-o';
              break;
            case 4:
              color = '#f04134';
              icon = 'close-circle-o';
              break;
            default:
          }
          return (
            <div>
              <Icon type={icon} style={{ color, marginRight: 5 }} />
              {statusText}
            </div>
          );
        },
      },
      {
        title: '操作',
        render: (text, ticket) => (
          <div>
            <Tooltip title="编辑">
              <Button
                icon="edit"
                style={{ marginRight: 8 }}
                onClick={() => {
                  this.showDialog(ticket, true);
                }}
              />
            </Tooltip>
            <Popconfirm
              title="该操作不可逆，确定继续？"
              placement="top"
              onConfirm={() => {
                this.removeTicket(ticket);
              }}
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
          search={this.handleSearchTickets}
        />
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={this.handlePaginationChange}
          style={{ marginTop: 16 }}
        />
        <Modal
          key={currentTicket.id}
          title={currentTicket.id < 0 ? '新建工单' : '编辑工单'}
          maskClosable={false}
          visible={this.state.dialogVisible}
          onCancel={this.hideDialog}
          footer={null}
        >
          <TicketForm
            ticket={currentTicket}
            ref={(node) => {
              this.ticketForm = node;
            }}
            studentInputDisabled={studentInputDisabled}
            onSubmit={this.handleSubmitTicketForm}
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
    ticketData: ticket.manage.result,
    filters: ticket.manage.filters,
    adminUsers: [],
  };
}

export default connect(mapStateToProps)(Tickets);
