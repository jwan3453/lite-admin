import { assign } from 'lodash';
import { Product, Products } from '../actions/actionTypes';

export function product(
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
    case Product.CREATE:
      return assign({}, state, {
        loading: true,
      });
    case Products.MANAGE:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
        },
      });
    case Products.MANAGE_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Products.MANAGE_FAIL:
    case Product.CREATE_SUCCESS:
    case Product.CREATE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
