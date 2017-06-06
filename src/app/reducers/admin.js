import { assign } from 'lodash';
import { Admin } from '../actions/actionTypes';

export function admin(
  state = {
    loading: false,
    users: [],
    manage: {
      filters: {},
      result: [],
    },
  },
  action = {},
) {
  switch (action.type) {
    case Admin.FETCH:
    case Admin.CREATE:
      return assign({}, state, {
        loading: true,
      });
    case Admin.MANAGE:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
        },
      });
    case Admin.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        users: action.response,
      });
    case Admin.MANAGE_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Admin.CREATE_SUCCESS:
    case Admin.CREATE_FAIL:
    case Admin.MANAGE_FAIL:
    case Admin.FETCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
