/**
 * 标签
 * @author 陈翔宇
 */

import { assign } from 'lodash';
import { Tag } from '../actions/actionTypes';

export function tag(
  state = {},
  action = {},
) {
  switch (action.type) {
    case Tag.CREATE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
