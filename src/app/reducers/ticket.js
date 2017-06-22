import { assign } from 'lodash';
import { Ticket } from '../actions/actionTypes';

export function ticket(
  state = {
    loading: false,
    result: {},
  },
  action = {},
) {
  switch (action.type) {
    case Ticket.CREATE:
    case Ticket.FETCH:
    case Ticket.UPDATE:
    case Ticket.DELETE:
      return assign({}, state, {
        loading: true,
      });
    case Ticket.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        filters: action.filters,
        result: action.response,
      });
    case Ticket.UPDATE_SUCCESS:
    case Ticket.CREATE_SUCCESS:
    case Ticket.CREATE_FAIL:
    case Ticket.FETCH_FAIL:
    case Ticket.UPDATE_FAIL:
    case Ticket.DELETE_SUCCESS:
    case Ticket.DELETE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
