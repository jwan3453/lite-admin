import { Student } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function manageStudent(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Student.MANAGE, Student.MANAGE_SUCCESS, Student.MANAGE_FAIL],
      uri: '/admin/students/manage',
      method: 'POST',
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
      method: 'POST',
      body: filters,
    },
  };
}
