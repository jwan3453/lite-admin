import { StudentFeedback } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchStudentFeedback(filters = {}) {
  return {
    [CALL_JQ_API]: {
      types: [
        StudentFeedback.FETCH_STUDENT_FEEDBACK,
        StudentFeedback.FETCH_STUDENT_FEEDBACK_SUCCESS,
        StudentFeedback.FETCH_STUDENT_FEEDBACK_SUCCESS,
      ],
      uri: '/admin/schedules/studentFeedback',
      method: 'GET',
      body: filters,
    },
  };
}

export function updateStudentFeedback(id, data) {
  return {
    [CALL_JQ_API]: {
      types: [
        StudentFeedback.UPDATE_STUDENT_FEEDBACK,
        StudentFeedback.UPDATE_STUDENT_FEEDBACK_SUCCESS,
        StudentFeedback.UPDATE_STUDENT_FEEDBACK_FAIL,
      ],
      uri: `/admin/schedules/studentFeedback/${id}/update`,
      method: 'PUT',
      body: data,
    },
  };
}
