import { Schedule } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function createSchedule(params) {
  // const { courseId, chapterId, lessonId, startDate,
  // endDate, isInternal, studentCount, teacherId, roomTypeId } = params;
  return {
    params,
    [CALL_JQ_API]: {
      types: [Schedule.CREATE, Schedule.CREATE_SUCCESS, Schedule.CREARE_FAIL],
      uri: '/admin/schedules',
      method: 'POST',
      body: params,
    },
  };
}
