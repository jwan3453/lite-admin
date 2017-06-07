import { assign } from 'lodash';
import { Product, Products } from '../actions/actionTypes';

export function product(
  state = {
    loading: false,
    manage: {
      filters: {},
      result: {},
    },
    simpleList: [],
  },
  action = {},
) {
  switch (action.type) {
    case Product.CREATE:
    case Product.UPDATE:
    case Product.FETCH_SIMPLE_LIST:
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
    case Product.FETCH_SIMPLE_LIST_SUCCESS:
      return assign({}, state, {
        simpleList: action.response,
      });

    case Product.UPDATE_FAIL:
    case Product.UPDATE_SUCCESS:
    case Products.MANAGE_FAIL:
    case Product.CREATE_SUCCESS:
    case Product.CREATE_FAIL:
    case Product.FETCH_SIMPLE_LIST_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
