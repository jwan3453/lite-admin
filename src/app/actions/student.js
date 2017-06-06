import { Student } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function manageStudent(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Student.MANAGE, Student.MANAGE_SUCCESS, Student.MANAGE_FAIL],
      uri: '/admin/students/manage',
      method: 'GET',
      body: filters,
    },
  };
}

export function searchStudent(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Student.SEARCH, Student.SEARCH_SUCCESS, Student.SEARCH_FAIL],
      uri: '/admin/students/search',
      method: 'GET',
      body: filters,
    },
  };
}

export function fetchStudent(studentId) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [Student.FETCH, Student.FETCH_SUCCESS, Student.FETCH_FAIL],
      uri: `/admin/students/${studentId}`,
      method: 'GET',
    },
  };
}

export function fetchMobile(studentId) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [Student.FETCH_MOBILE, Student.FETCH_MOBILE_SUCCESS, Student.FETCH_MOBILE_FAIL],
      uri: `/admin/students/${studentId}/mobile`,
      method: 'GET',
    },
  };
}
