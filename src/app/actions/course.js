import { Courses, UserCourse } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchCourses() {
  return {
    [CALL_JQ_API]: {
      types: [Courses.FETCH, Courses.FETCH_SUCCESS, Courses.FETCH_FAIL],
      uri: '/courses/tree',
      method: 'GET',
    },
  };
}

export function fetchUserCourse(userId, courseId) {
  return {
    [CALL_JQ_API]: {
      types: [UserCourse.FETCH, UserCourse.FETCH_SUCCESS, UserCourse.FETCH_FAIL],
      uri: `/admin/progress/users/${userId}/courses/${courseId}`,
      method: 'GET',
    },
  };
}

export function updateUserLessonStatus(userId, courseId, lessonId, data) {
  return {
    [CALL_JQ_API]: {
      types: [
        UserCourse.UPDATE_LESSON_STATUS,
        UserCourse.UPDATE_LESSON_STATUS_SUCCESS,
        UserCourse.UPDATE_LESSON_STATUS_FAIL,
      ],
      uri: `/admin/progress/users/${userId}/courses/${courseId}/lessons/${lessonId}/status`,
      method: 'POST',
      body: data,
    },
  };
}
