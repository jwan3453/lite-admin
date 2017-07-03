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

export function fetchResumes(filter = {}, page = 1, pageSize = 10) {
  const { status, startTime, endTime } = filter;
  return {
    [CALL_JQ_API]: {
      types: [Teacher.FETCH_RESUME, Teacher.FETCH_RESUME_SUCCESS, Teacher.FETCH_RESUME_FAIL],
      uri: '/admin/teachers/resumes/manage',
      method: 'POST',
      body: {
        status,
        startTime,
        endTime,
        page,
        pageSize,
      },
    },
  };
}

export function changeStatus(recordId, status) {
  return {
    [CALL_JQ_API]: {
      types: [Teacher.CHANGE_STATUS, Teacher.CHANGE_STATUS_SUCCESS, Teacher.CHANGE_STATUS_FAILED],
      uri: `/admin/teachers/resumes/${recordId}`,
      method: 'POST',
      body: {
        recordId,
        status,
      },
    },
  };
}
