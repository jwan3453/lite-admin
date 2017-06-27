import { assign } from 'lodash';
import { StudentFeedback } from '../actions/actionTypes';

export function studentFeedback(state = {
  loading: false,
  studentFeedback: {},
}, action = {}) {
  switch (action.type) {
    case StudentFeedback.FETCH_STUDENT_FEEDBACK:
    case StudentFeedback.UPDATE_STUDENT_FEEDBACK:
      return assign({}, state, {
        loading: true,
      });
    case StudentFeedback.FETCH_STUDENT_FEEDBACK_SUCCESS:
      return assign({}, state, {
        loading: false,
        filters: action.filters,
        result: action.response,
      });
    case StudentFeedback.FETCH_STUDENT_FEEDBACK_FAIL:
    case StudentFeedback.UPDATE_STUDENT_FEEDBACK_SUCCESS:
    case StudentFeedback.UPDATE_STUDENT_FEEDBACK_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
