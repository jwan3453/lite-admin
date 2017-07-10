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
