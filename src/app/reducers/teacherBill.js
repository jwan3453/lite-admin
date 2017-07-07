import { assign } from 'lodash';
import { TeacherBill } from '../actions/actionTypes';

export function teacherBill(
  state = {
    loading: false,
    result: {},
    filters: {},
  },
  action = {}) {
  switch (action.type) {
    case TeacherBill.SEARCH_TEACHER_BILL:
    case TeacherBill.CANCEL_TEACHER_BILL:
      return assign({}, state, { loading: true });
    case TeacherBill.SEARCH_TEACHER_BILL_SUCCESS:
      return assign({}, state,
        {
          loading: false,
          filters: action.filters,
          result: action.response,
        },
      );
    case TeacherBill.CANCEL_TEACHER_BILL_SUCCESS:
    case TeacherBill.CANCEL_TEACHER_BILL_FAIL:
    case TeacherBill.SEARCH_TEACHER_BILL_FAIL:
      return assign({}, state, { loading: false });
    default:
      return state;
  }
}
