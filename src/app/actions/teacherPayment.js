import { assign } from 'lodash';
import { TeacherPayment } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function searchTeacherPayment(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [
        TeacherPayment.SEARCH_TEACHER_PAYMENT,
        TeacherPayment.SEARCH_TEACHER_PAYMENT_SUCCESS,
        TeacherPayment.SEARCH_TEACHER_PAYMENT_FAIL,
      ],
      uri: '/admin/teacherBilling/payments/search',
      method: 'GET',
      body: filters,
    },
  };
}

export function createTeacherPayment(data) {
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherPayment.CREATE_TEACHER_PAYMENT,
        TeacherPayment.CREATE_TEACHER_PAYMENT_SUCCESS,
        TeacherPayment.CREATE_TEACHER_PAYMENT_FAIL,
      ],
      uri: '/admin/teacherBilling/payments',
      method: 'POST',
      body: data,
    },
  };
}

export function fetchPaymentBill(filters, paymentId) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [
        TeacherPayment.FETCH_PAYMENT_BILL,
        TeacherPayment.FETCH_PAYMENT_BILL_SUCCESS,
        TeacherPayment.FETCH_PAYMENT_BILL_FAIL,
      ],
      uri: '/admin/teacherBilling',
      method: 'GET',
      body: assign({}, ...filters, { paymentId }),
    },
  };
}
