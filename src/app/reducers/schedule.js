import { assign } from 'lodash';
import { Schedule } from '../actions/actionTypes';

export function schedule(state = {
  loading: false,
  copiedSchedule: {},
  rooms: [],
}, action = {}) {
  switch (action.type) {
    case Schedule.CREATE:
    case Schedule.ADD_ROOM:
    case Schedule.SET_INTERNAL:
    case Schedule.FETCH_ROOMS:
      return assign({}, state, {
        loading: true,
      });
    case Schedule.COPY:
      return assign({}, state, {
        copiedSchedule: action.schedule,
      });
    case Schedule.FETCH_ROOMS_SUCCESS:
      return assign({}, state, {
        loading: false,
        rooms: action.response,
      });
    case Schedule.CREATE_SUCCESS:
    case Schedule.ADD_ROOM_SUCCESS:
    case Schedule.SET_INTERNAL_SUCCESS:
      return assign({}, state, {
        loading: false,
      });
    case Schedule.CREATE_FAIL:
    case Schedule.ADD_ROOM_FAIL:
    case Schedule.SET_INTERNAL_FAIL:
    case Schedule.FETCH_ROOMS_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
