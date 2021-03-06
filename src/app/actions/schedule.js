import { Schedule } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function createSchedule(params) {
  // const { courseId, chapterId, lessonId, startDate,
  // endDate, isInternal, studentCount, teacherId, roomTypeId } = params;
  return {
    params,
    [CALL_JQ_API]: {
      types: [Schedule.CREATE, Schedule.CREATE_SUCCESS, Schedule.CREATE_FAIL],
      uri: '/admin/schedules',
      method: 'POST',
      body: params,
    },
  };
}

export function updateSchedule(scheduleId, isInternal) {
  return {
    scheduleId,
    isInternal,
    [CALL_JQ_API]: {
      types: [Schedule.UPDATE, Schedule.UPDATE_SUCCESS, Schedule.UPDATE_FAIL],
      uri: `/admin/schedules/${scheduleId}`,
      method: 'POST',
      body: {
        isInternal,
      },
    },
  };
}

export function addRoom(scheduleId) {
  return {
    scheduleId,
    [CALL_JQ_API]: {
      types: [Schedule.ADD_ROOM, Schedule.ADD_ROOM_SUCCESS, Schedule.ADD_ROOM_FAIL],
      uri: `/admin/schedules/${scheduleId}/room`,
      method: 'POST',
      body: [],
    },
  };
}

export function copySchedule(schedule) {
  return {
    type: Schedule.COPY,
    schedule,
  };
}

export function fetchScheduleRooms(scheduleId) {
  return {
    scheduleId,
    [CALL_JQ_API]: {
      types: [Schedule.FETCH_ROOMS, Schedule.FETCH_ROOMS_SUCCESS, Schedule.FETCH_ROOMS_FAIL],
      uri: `/admin/schedules/${scheduleId}/rooms`,
      method: 'GET',
    },
  };
}
