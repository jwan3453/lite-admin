import { assign } from 'lodash';
import { Student } from '../actions/actionTypes';

export function student(
  state = {
    loading: false,
    search: {
      filters: {},
      result: [],
    },
    manage: {
      filters: {},
      result: [],
    },
  },
  action = {},
) {
  switch (action.type) {
    case Student.SEARCH: {
      return assign({}, state, {
        loading: true,
        search: {
          filters: action.filters,
        },
      });
    }
    case Student.FETCH:
      return assign({}, state, {
        loading: true,
        manage: {
          filters: action.filters,
        },
      });
    case Student.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        manage: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Student.SEARCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        search: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Student.FETCH_FAIL:
    case Student.SEARCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
