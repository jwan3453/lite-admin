import { assign } from 'lodash';
import { Admin } from '../actions/actionTypes';

export function admin(
  state = {
    loading: false,
    users: [],
  },
  action = {},
) {
  switch (action.type) {
    case Admin.FETCH:
      return assign({}, state, {
        loading: true,
      });
    case Admin.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        users: action.response,
      });
    case Admin.FETCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
