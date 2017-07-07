import { assign } from 'lodash';
import { TeacherStandby } from '../actions/actionTypes';

export function teacherStandby(
  state = {
    loading: false,
    filter: {},
    result: {},
  },
  action = {},
) {
  switch (action.type) {
    case TeacherStandby.CREATE:
    case TeacherStandby.CREATE_SUCCESS:
    case TeacherStandby.CREATE_FAIL:
      return state;
    case TeacherStandby.FETCH:
    case TeacherStandby.FETCH_SUCCESS:
    case TeacherStandby.FETCH_FAIL:
      return assign({}, state, {
        loading: false,
        filters: action.filters,
        result: action.response,
      });
    case TeacherStandby.UPDATE:
    case TeacherStandby.UPDATE_SUCCESS:
    case TeacherStandby.UPDATE_FAIL:
      return state;
    default:
      return state;
  }
}
