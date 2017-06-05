import { assign } from 'lodash';
import { Product, Products } from '../actions/actionTypes';

export function product(
  state = {
    loading: false,
    manage: {
      filters: {},
      result: [],
    },
  },
  action = {},
) {
  switch (action.type) {
    case Product.CREATE:
      return assign({}, state, {
        loading: true,
      });
    case Products.FETCH:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
        },
      });
    case Products.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Products.FETCH_FAIL:
    case Product.CREATE_SUCCESS:
    case Product.CREATE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
