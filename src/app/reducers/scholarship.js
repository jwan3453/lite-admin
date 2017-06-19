import { assign } from 'lodash';
import { Scholarship } from '../actions/actionTypes';

export function scholarship(
  state = {
    loading: false,
    summary: {},
    historyList: {
      filters: {},
      result: {},
    },
  },
  action = {},
) {
  switch (action.type) {
    case Scholarship.FETCH_SUMMARY:
    case Scholarship.FETCH_HISTORY_LIST:
    case Scholarship.Apply_FIRST_SHARE_SCHOLARSHIP:
      return assign({}, state, {
        loading: true,
      });
    case Scholarship.FETCH_SUMMARY_SUCCESS:
      return assign({}, state, {
        loading: false,
        summary: action.response,
      });
    case Scholarship.FETCH_HISTORY_LIST_SUCCESS:
      return assign({}, state, {
        loading: false,
        historyList: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Scholarship.FETCH_SUMMARY_FAIL:
    case Scholarship.FETCH_HISTORY_LIST_FAIL:
    case Scholarship.Apply_FIRST_SHARE_SCHOLARSHIP_SUCCESS:
    case Scholarship.Apply_FIRST_SHARE_SCHOLARSHIP_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
