import { Student } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function searchStudent(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Student.SEARCH, Student.SEARCH_SUCCESS, Student.SEARCH_FAIL],
      uri: '/admin/students/search',
      method: 'POST',
      body: filters,
    },
  };
}

export function fetchStudents(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Student.FETCH, Student.FETCH_SUCCESS, Student.FETCH_FAIL],
      uri: '/admin/students/search',
      method: 'POST',
      body: filters,
    },
  };
}
