import { assign } from 'lodash';
import { UserCourse, Courses } from '../actions/actionTypes';

export function course(
  state = {
    loading: false,
    loaded: false,
    courses: [],
    userCourse: {},
  },
  action = {},
) {
  switch (action.type) {
    case Courses.FETCH:
    case UserCourse.FETCH:
    case UserCourse.UPDATE_LESSON_STATUS:
      return assign({}, state, {
        loading: true,
      });
    case Courses.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        loaded: true,
        courses: action.response,
      });
    case UserCourse.FETCH_SUCCESS: {
      return assign({}, state, {
        loading: false,
        userCourse: action.response,
      });
    }
    case Courses.FETCH_FAIL:
    case UserCourse.FETCH_FAIL:
    case UserCourse.UPDATE_LESSON_STATUS_FAIL:
    case UserCourse.UPDATE_LESSON_STATUS_SUCCESS:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
