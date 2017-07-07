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
      return assign({}, state, {
        loading: true,
        search: {
          filters: action.filters,
          result: {},
        },
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
      return assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
