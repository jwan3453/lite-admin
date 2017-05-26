import { Rooms, RoomTypes } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchRooms(filters) {
  // const { courseId, chapterId, lessonId, startDate, endDate,
  // isInternal, studentCount, teacherId, roomTypeId } = filters;
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Rooms.FETCH, Rooms.FETCH_SUCCESS, Rooms.FETCH_FAIL],
      uri: '/admin/schedules/rooms',
      method: 'GET',
      body: filters,
    },
  };
}

export function fetchRoomTypes() {
  // const { courseId, chapterId, lessonId, startDate, endDate,
  // isInternal, studentCount, teacherId, roomTypeId } = filters;
  return {
    [CALL_JQ_API]: {
      types: [RoomTypes.FETCH, RoomTypes.FETCH_SUCCESS, RoomTypes.FETCH_FAIL],
      uri: '/admin/schedules/roomTypes',
      method: 'GET',
    },
  };
}
