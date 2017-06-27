import { assign } from 'lodash';
import { StudentAppointment } from '../actions/actionTypes';

export function studentAppointment(state = {
  loading: false,
  studentAppointments: {
    filters: {},
    result: {},
  },
}, action = {}) {
  switch (action.type) {
    case StudentAppointment.FETCH:
    case StudentAppointment.UPDATE:
    case StudentAppointment.CHANGE_ROOM:
      return assign({}, state, {
        loading: true,
      });
    case StudentAppointment.FETCH_SUCCESS:
      return assign({}, state, {
        studentAppointments: {
          filters: action.filters,
          result: action.response,
        },
        loading: false,
      });
    case StudentAppointment.FETCH_FAIL:
    case StudentAppointment.UPDATE_SUCCESS:
    case StudentAppointment.UPDATE_FAIL:
    case StudentAppointment.CHANGE_ROOM_SUCCESS:
    case StudentAppointment.CHANGE_ROOM_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
