import { assign } from 'lodash';
import { TeacherAppointment } from '../actions/actionTypes';

export function teacherAppointment(state = {
  loading: false,
  filters: {},
  result: {},
}, action = {}) {
  switch (action.type) {
    case TeacherAppointment.FETCH:
    case TeacherAppointment.UPDATE:
      return assign({}, state, {
        loading: true,
      });
    case TeacherAppointment.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        filters: action.filters,
        result: action.response,
      });
    case TeacherAppointment.FETCH_FAIL:
    case TeacherAppointment.UPDATE_SUCCESS:
    case TeacherAppointment.UPDATE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
