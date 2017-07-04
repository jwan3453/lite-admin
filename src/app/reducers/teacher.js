import { assign } from 'lodash';
import { Teacher } from '../actions/actionTypes';

export function teacher(
  state = {
    loading: false,
    search: {
      filters: {},
      result: {},
    },
    teachers: [],
    resumes: [],
    total: 0,
    page: 1,
    pageSize: 10,
    filters: [],
  },
  action = {},
) {
  switch (action.type) {
    case Teacher.SEARCH:
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
          filters: action.filters,
          result: action.response,
        },
      });
    case Teacher.FETCH_FAIL:
    case Teacher.SEARCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    case Teacher.FETCH_RESUME:
      return assign({}, state, {
        loading: true,
      });
    case Teacher.FETCH_RESUME_SUCCESS:
      return assign({}, state, {
        loading: false,
        resumes: action.response.result,
        total: action.response.total,
        page: action.response.page,
        pageSize: action.response.pageSize,
        filter: action.response.filter,
      });
    case Teacher.FETCH_ReSUME_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
