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
  },
  action = {},
) {
  switch (action.type) {
    case Tag.SEARCH:
    case Tag.CREATE:
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
    case Tag.SEARCH_FAIL:
    case Tag.CREATE_SUCCESS:
    case Tag.CREATE_FAIL:
      return assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
