import { assign } from 'lodash';
import { TeacherBonus } from '../actions/actionTypes';

export function teacherBonus(
  state = {
    loading: false,
    result: {},
    filters: {},
  },
  action = {}) {
  switch (action.type) {
    case TeacherBonus.SEARCH_TEACHER_BONUS:
    case TeacherBonus.CREATE_TEACHER_BONUS:
    case TeacherBonus.CHANGE_BONUS_STATUS:
      return assign({}, state, { loading: true });
    case TeacherBonus.SEARCH_TEACHER_BONUS_SUCCESS:
      return assign({}, state,
        {
          loading: false,
          filters: action.filters,
          result: action.response,
        },
      );
    case TeacherBonus.CREATE_TEACHER_BONUS_SUCCESS:
    case TeacherBonus.CHANGE_BONUS_STATUS_SUCCESS:
    case TeacherBonus.CHANGE_BONUS_STATUS_FAIL:
    case TeacherBonus.SEARCH_TEACHER_BONUS_FAIL:
    case TeacherBonus.CREATE_TEACHER_BONUS_FAIL:
      return assign({}, state, { loading: false });
    default:
      return state;
  }
}
