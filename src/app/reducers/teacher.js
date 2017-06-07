import { assign } from 'lodash';
import { Teacher } from '../actions/actionTypes';

export function teacher(
  state = {
    loading: false,
    search: {
      text: '',
      result: [],
    },
    teachers: [],
  },
  action = {},
) {
  switch (action.type) {
    case Teacher.SEARCH: {
      return assign({}, state, {
        loading: true,
        search: {
          text: action.searchText,
          result: [],
        },
      });
    }
    case Teacher.FETCH:
      return assign({}, state, {
        loading: true,
      });
    case Teacher.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        teachers: action.response,
      });
    case Teacher.SEARCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        search: {
          result: action.response,
        },
      });
    case Teacher.FETCH_FAIL:
    case Teacher.SEARCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
