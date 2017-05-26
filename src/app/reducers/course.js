import { assign } from 'lodash';
import { Course, Courses } from '../actions/actionTypes';

export function course(
  state = {
    loading: false,
    loaded: false,
    courses: [],
  },
  action = {},
) {
  switch (action.type) {
    case Courses.FETCH:
    case Course.FETCH:
      return assign({}, state, {
        loading: true,
      });
    case Courses.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        loaded: true,
        courses: action.response,
      });
    case Course.FETCH_SUCCESS: {
      const courses = state.courses;
      const courseData = action.response;
      for (let i = 0; i < courses.length; i += 1) {
        if (courses[i].id === courseData.id) {
          courses[i] = assign({}, courses[i], courseData);
        }
      }
      return assign({}, state, {
        loading: false,
        courses,
      });
    }
    case Courses.FETCH_FAIL:
    case Course.FETCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
