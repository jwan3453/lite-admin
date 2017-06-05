import { assign } from 'lodash';
import { Product } from '../actions/actionTypes';

export function product(
  state = {
    loading: false,
  },
  action = {},
) {
  switch (action.type) {
    case Product.CREATE:
      return assign({}, state, {
        loading: true,
      });
    case Product.CREATE_SUCCESS:
    case Product.CREATE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
