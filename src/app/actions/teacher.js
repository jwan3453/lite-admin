import { Teacher } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function searchTeacher(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Teacher.SEARCH, Teacher.SEARCH_SUCCESS, Teacher.SEARCH_FAIL],
      uri: '/admin/teachers/search',
      method: 'GET',
      body: filters,
    },
  };
}

export function fetchTeachers() {
  return {
    [CALL_JQ_API]: {
      types: [Teacher.FETCH, Teacher.FETCH_SUCCESS, Teacher.FETCH_FAIL],
      uri: '/admin/teachers',
      method: 'GET',
    },
  };
}
