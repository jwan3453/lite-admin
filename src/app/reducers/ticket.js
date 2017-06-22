import { assign } from 'lodash';
import { Ticket } from '../actions/actionTypes';

export function ticket(
  state = {
    loading: false,
    result: {},
    manage: {
      filters: {},
      result: {},
    },
  },
  action = {},
) {
  switch (action.type) {
    case Ticket.CREATE:
    case Ticket.FETCH_BY_USER:
    case Ticket.UPDATE:
    case Ticket.DELETE:
      return assign({}, state, {
        loading: true,
      });
    case Ticket.MANAGE:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
        },
      });
    case Ticket.FETCH_BY_USER_SUCCESS:
      return assign({}, state, {
        loading: false,
        filters: action.filters,
        result: action.response,
      });
    case Ticket.MANAGE_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Ticket.UPDATE_SUCCESS:
    case Ticket.CREATE_SUCCESS:
    case Ticket.CREATE_FAIL:
    case Ticket.FETCH_BY_USER_FAIL:
    case Ticket.UPDATE_FAIL:
    case Ticket.DELETE_SUCCESS:
    case Ticket.DELETE_FAIL:
    case Ticket.MANAGE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
