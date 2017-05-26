import { Courses } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchCourses() {
  return async (dispatch) => {
    await dispatch({
      [CALL_JQ_API]: {
        types: [Courses.FETCH, Courses.FETCH_SUCCESS, Courses.FETCH_FAIL],
        uri: '/courses/tree',
        method: 'GET',
      },
    });

    /*
    const courses = result.response;
    courses.forEach(async (course) => {
      await dispatch({
        [CALL_JQ_API]: {
          types: [Course.FETCH, Course.FETCH_SUCCESS, Course.FETCH_FAIL],
          uri: `/courses/${course.id}`,
          method: 'GET',
        },
      });
    });
    */
  };
}
