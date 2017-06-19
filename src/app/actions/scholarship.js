import { Scholarship } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchScholarshipSummary(studentId) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [
        Scholarship.FETCH_SUMMARY,
        Scholarship.FETCH_SUMMARY_SUCCESS,
        Scholarship.FETCH_SUMMARY_FAIL,
      ],
      uri: `/admin/scholarship/${studentId}/summary`,
      method: 'GET',
    },
  };
}

export function fetchScholarshipHistoryList(studentId, filters) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [
        Scholarship.FETCH_HISTORY_LIST,
        Scholarship.FETCH_HISTORY_LIST_SUCCESS,
        Scholarship.FETCH_HISTORY_LIST_FAIL,
      ],
      uri: `/admin/scholarship/${studentId}/history`,
      body: filters,
      method: 'GET',
    },
  };
}

export function applyFirstShareWeixinScholarship(studentId) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [
        Scholarship.Apply_FIRST_SHARE_SCHOLARSHIP,
        Scholarship.Apply_FIRST_SHARE_SCHOLARSHIP_SUCCESS,
        Scholarship.Apply_FIRST_SHARE_SCHOLARSHIP_FAIL,
      ],
      uri: `/admin/scholarship/${studentId}/giftWxFirstShare`,
      method: 'PUT',
    },
  };
}
