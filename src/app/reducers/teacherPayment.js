import { assign } from 'lodash';
import { TeacherPayment } from '../actions/actionTypes';

export function teacherPayment(
  state = {
    loading: false,
    result: {},
    filters: {},
  },
  action = {}) {
  switch (action.type) {
    case TeacherPayment.SEARCH_TEACHER_PAYMENT:
      return assign({}, state, { loading: true });
    case TeacherPayment.SEARCH_TEACHER_PAYMENT_SUCCESS:
      return assign({}, state, {
        loading: false,
        result: action.response,
        filters: action.filters,
      });
    case TeacherPayment.SEARCH_TEACHER_PAYMENT_FAIL:
      return assign({}, state, { lading: false });
    default:
      return state;
  }
}
