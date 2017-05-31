/**
 * Created by chenlingguang on 2017/5/31.
 */
import { assign } from 'lodash';
import { System } from '../actions/actionTypes';

export function system(
  state = {
    dimensions: {
      width: 0,
      height: 0,
    },
  },
  action = {},
) {
  switch (action.type) {
    case System.UPDATE_DIMENSIONS:
      return assign({}, state, {
        dimensions: action.dimensions,
      });
    default:
      return state;
  }
}
