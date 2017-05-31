import { Rooms, Room, RoomTypes } from './actionTypes';
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

export function fetchRoom(roomId) {
  return {
    [CALL_JQ_API]: {
      types: [Room.FETCH, Room.FETCH_SUCCESS, Room.FETCH_FAIL],
      uri: `/admin/schedules/rooms/${roomId}`,
      method: 'GET',
    },
  };
}

export function addStudent(roomId, studentId) {
  return {
    [CALL_JQ_API]: {
      types: [Room.ADD_STUDENT, Room.ADD_STUDENT_SUCCESS, Room.ADD_STUDENT_FAIL],
      uri: `/admin/schedules/rooms/${roomId}/student`,
      method: 'POST',
      body: {
        studentId,
      },
    },
  };
}
