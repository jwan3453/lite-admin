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
      nonce: true,
    },
  };
}

export function updateLevel(studentId, data) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [Student.UPDATE_LEVEL, Student.UPDATE_LEVEL_SUCCESS, Student.UPDATE_LEVEL_FAIL],
      uri: `/admin/students/${studentId}/updateLevel`,
      method: 'POST',
      body: data,
      nonce: true,
    },
  };
}

export function fetchEntrySurveyQuestion(studentId) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [
        Student.FETCH_ENTRY_SURVEY_QUESTION,
        Student.FETCH_ENTRY_SURVEY_QUESTION_SUCCESS,
        Student.FETCH_ENTRY_SURVEY_QUESTION_FAIL,
      ],
      uri: `/admin/students/${studentId}/survey/entry`,
      method: 'GET',
    },
  };
}
