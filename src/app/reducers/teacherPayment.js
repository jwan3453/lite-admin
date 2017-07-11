import { assign } from 'lodash';
import { TeacherPayment } from '../actions/actionTypes';

export function teacherPayment(state = {
  loading: false,
  result: {},
  filters: {},
  paymentBill: {
    filters: {},
    result: {},
  },
},
  action = {}) {
  switch (action.type) {
    case TeacherPayment.SEARCH_TEACHER_PAYMENT:
    case TeacherPayment.CREATE_TEACHER_PAYMENT:
    case TeacherPayment.FETCH_PAYMENT_BILL:
      return assign({}, state, { loading: true });
    case TeacherPayment.SEARCH_TEACHER_PAYMENT_SUCCESS:
      return assign({}, state, {
        loading: false,
        result: action.response,
        filters: action.filters,
      });
    case TeacherPayment.FETCH_PAYMENT_BILL_SUCCESS:
      return assign({}, state, {
        loading: false,
        paymentBill: {
          result: action.response,
          filters: action.filters,
        },
      });
    case TeacherPayment.CREATE_TEACHER_PAYMENT_SUCCESS:
    case TeacherPayment.CREATE_TEACHER_PAYMENT_FAIL:
    case TeacherPayment.SEARCH_TEACHER_PAYMENT_FAIL:
    case TeacherPayment.FETCH_PAYMENT_BILL_FAIL:
      return assign({}, state, { lading: false });
    default:
      return state;
  }
}
