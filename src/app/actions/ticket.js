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
      types: [Ticket.FETCH, Ticket.FETCH_SUCCESS, Ticket.FETCH_FAIL],
      uri: `/admin/tickets/${studentId}`,
      body: filters,
      method: 'GET',
    },
  };
}

export function updateTicket(ticketId, data) {
  return {
    [CALL_JQ_API]: {
      types: [Ticket.UPDATE, Ticket.UPDATE_SUCCESS, Ticket.UPDATE_FAIL],
      uri: `/admin/tickets/${ticketId}`,
      method: 'PUT',
      body: data,
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
