/**
 * Created by chenlingguang on 2017/5/31.
 */
import { assign } from 'lodash';
import { StudentProduct } from '../actions/actionTypes';

export function studentProduct(
  state = {
    loading: false,
    manage: {
      filters: {},
      result: {},
    },
  },
  action = {},
) {
  switch (action.type) {
    case StudentProduct.FETCH:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
          result: {},
        },
      });
    case StudentProduct.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case StudentProduct.GIFT:
      return assign({}, state, {
        loading: false,
      });
    case StudentProduct.GIFT_SUCCESS:
    case StudentProduct.GIFT_FAIL:
    case StudentProduct.FETCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
