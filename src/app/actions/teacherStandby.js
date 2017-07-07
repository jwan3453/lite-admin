import { TeacherStandby } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchTeacherStandby(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [TeacherStandby.FETCH, TeacherStandby.FETCH_SUCCESS, TeacherStandby.FETCH_FAIL],
      uri: '/admin/teachers/standby',
      method: 'GET',
      body: filters,
    },
  };
}

export function updateTeacherStandby(fields, id) {
  return {
    [CALL_JQ_API]: {
      types: [TeacherStandby.UPDATE, TeacherStandby.UPDATE_SUCCESS, TeacherStandby.UPDATE_FAIL],
      uri: `/admin/teachers/standby/${id}`,
      method: 'PUT',
      body: fields,
    },
  };
}

export function createTeacherStandby(fields) {
  return {
    [CALL_JQ_API]: {
      types: [TeacherStandby.CREATE, TeacherStandby.CREATE_SUCCESS, TeacherStandby.CREATE_FAIL],
      uri: '/admin/teachers/standby',
      method: 'POST',
      body: fields,
    },
  };
}

