import { assign } from 'lodash';
import { Student } from '../actions/actionTypes';

export function student(
  state = {
    loading: false,
    search: {
      filters: {},
      result: {},
    },
    manage: {
      filters: {},
      result: {},
    },
    studentInfo: {
      studentId: 0,
      result: {},
    },
    mobile: {
      studentId: 0,
      result: null,
    },
    surveyAnswers: {},
  },
  action = {},
) {
  switch (action.type) {
    case Student.SEARCH: {
      return assign({}, state, {
        loading: true,
        search: {
          filters: action.filters,
          result: {},
        },
      });
    }
    case Student.MANAGE:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
          result: {},
        },
      });
    case Student.FETCH:
      return assign({}, state, {
        loading: true,
        studentInfo: {
          studentId: action.studentId,
          result: {},
        },
      });
    case Student.FETCH_MOBILE:
      return assign({}, state, {
        loading: true,
        mobile: {
          studentId: action.studentId,
        },
      });
    case Student.MANAGE_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Student.SEARCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        search: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Student.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        studentInfo: {
          studentId: action.studentId,
          result: action.response,
        },
      });
    case Student.FETCH_MOBILE_SUCCESS:
      return assign({}, state, {
        loading: false,
        mobile: {
          studentId: action.studentId,
          result: action.response,
        },
      });
    case Student.UPDATE_LEVEL:
    case Student.FETCH_ENTRY_SURVEY_QUESTION:
      return assign({}, state, {
        loading: true,
      });
    case Student.FETCH_ENTRY_SURVEY_QUESTION_SUCCESS:
      return assign({}, state, {
        loading: false,
        surveyAnswers: action.response,
      });
    case Student.MANAGE_FAIL:
    case Student.SEARCH_FAIL:
    case Student.FETCH_FAIL:
    case Student.FETCH_MOBILE_FAIL:
    case Student.UPDATE_LEVEL_SUCCESS:
    case Student.UPDATE_LEVEL_FAIL:
    case Student.FETCH_ENTRY_SURVEY_QUESTION_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
