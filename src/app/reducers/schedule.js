import { assign } from 'lodash';
import { Schedule } from '../actions/actionTypes';

export function schedule(state = {
  loading: false,
}, action = {}) {
  switch (action.type) {
    case Schedule.CREATE:
    case Schedule.ADD_ROOM:
      return assign({}, state, {
        loading: true,
      });
    case Schedule.CREATE_SUCCESS:
    case Schedule.ADD_ROOM_SUCCESS:
      return assign({}, state, {
        loading: false,
      });
    case Schedule.CREATE_FAIL:
    case Schedule.ADD_ROOM_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
