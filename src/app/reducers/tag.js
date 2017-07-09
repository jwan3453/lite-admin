/**
 * 标签
 * @author 陈翔宇
 */

import { assign } from 'lodash';
import { Tag } from '../actions/actionTypes';

export function tag(
  state = {
    loading: false,
    search: {
      filters: {},
      result: {},
    },
    students: {
      filters: {},
      result: {},
    },
  },
  action = {},
) {
  switch (action.type) {
    case Tag.SEARCH:
    case Tag.SEARCH_STUDENTS:
    case Tag.CREATE:
    case Tag.ADD_STUDENTS:
    case Tag.REMOVE_STUDENTS:
      return assign({}, state, {
        loading: true,
      });
    case Tag.SEARCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        search: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Tag.SEARCH_STUDENTS_SUCCESS:
      return assign({}, state, {
        loading: false,
        students: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Tag.SEARCH_FAIL:
    case Tag.SEARCH_STUDENTS_FAIL:
    case Tag.CREATE_SUCCESS:
    case Tag.CREATE_FAIL:
    case Tag.ADD_STUDENTS_SUCCESS:
    case Tag.ADD_STUDENTS_FAIL:
    case Tag.REMOVE_STUDENTS_SUCCESS:
    case Tag.REMOVE_STUDENTS_FAIL:
      return assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
