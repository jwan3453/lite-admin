import { assign } from 'lodash';
import { Schedule } from '../actions/actionTypes';

export function schedule(state = {
  loading: false,
}, action = {}) {
  switch (action.type) {
    case Schedule.CREATE:
      return assign({}, state, {
        loading: true,
      });
    case Schedule.CREATE_SUCCESS:
      return assign({}, state, {
        loading: false,
      });
    case Schedule.CREARE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
