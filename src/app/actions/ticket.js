import { Ticket } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function createTicket(data) {
  return {
    [CALL_JQ_API]: {
      types: [Ticket.CREATE, Ticket.CREATE_SUCCESS, Ticket.CREATE_FAIL],
      uri: '/admin/tickets',
      method: 'POST',
      body: data,
    },
  };
}

export function fetchTicket(studentId, filters = {}) {
  return {
    [CALL_JQ_API]: {
      types: [Ticket.FETCH_BY_USER, Ticket.FETCH_BY_USER_SUCCESS, Ticket.FETCH_BY_USER_FAIL],
      uri: `/admin/tickets/${studentId}`,
      body: filters,
      method: 'GET',
    },
  };
}

export function manageTicket(filters = {}) {
  return {
    [CALL_JQ_API]: {
      types: [Ticket.MANAGE, Ticket.MANAGE_SUCCESS, Ticket.MANAGE_FAIL],
      uri: '/admin/tickets/manage',
      body: filters,
      method: 'POST',
    },
  };
}

export function updateTicket(ticket) {
  return {
    [CALL_JQ_API]: {
      types: [Ticket.UPDATE, Ticket.UPDATE_SUCCESS, Ticket.UPDATE_FAIL],
      uri: `/admin/tickets/${ticket.id}`,
      method: 'PUT',
      body: ticket,
    },
  };
}

export function deleteTicket(ticketId) {
  return {
    [CALL_JQ_API]: {
      types: [Ticket.DELETE, Ticket.DELETE_SUCCESS, Ticket.DELETE_FAIL],
      uri: `/admin/tickets/${ticketId}`,
      method: 'DELETE',
    },
  };
}
