import { TeacherBill } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function searchTeacherBills(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [
        TeacherBill.SEARCH_TEACHER_BILL,
        TeacherBill.SEARCH_TEACHER_BILL_SUCCESS,
        TeacherBill.SEARCH_TEACHER_BILL_FAIL,
      ],
      uri: '/admin/teacherBilling',
      method: 'GET',
      body: filters,
    },
  };
}

export function cancelTeacherBill(billId) {
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherBill.CANCEL_TEACHER_BILL,
        TeacherBill.CANCEL_TEACHER_BILL_SUCCESS,
        TeacherBill.CANCEL_TEACHER_BILL_FAIL,
      ],
      uri: `/admin/teacherBilling/${billId}/cancel`,
      method: 'PUT',
    },
  };
}

