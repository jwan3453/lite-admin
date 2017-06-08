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

export function updateRoom(roomId, room) {
  return {
    [CALL_JQ_API]: {
      types: [Room.FETCH, Room.FETCH_SUCCESS, Room.FETCH_FAIL],
      uri: `/admin/schedules/rooms/${roomId}`,
      method: 'POST',
      body: room,
    },
  };
}


export function deleteRoom(roomId) {
  return {
    [CALL_JQ_API]: {
      types: [Room.DELETE, Room.DELETE_SUCCESS, Room.DELETE_FAIL],
      uri: `/admin/schedules/rooms/${roomId}`,
      method: 'DELETE',
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

export function removeStudent(roomId, studentId) {
  return {
    [CALL_JQ_API]: {
      types: [Room.REMOVE_STUDENT, Room.REMOVE_STUDENT_SUCCESS, Room.REMOVE_STUDENT_FAIL],
      uri: `/admin/schedules/rooms/${roomId}/student/${studentId}`,
      method: 'DELETE',
    },
  };
}

export function updateTeacher(roomId, teacherId, reason) {
  const body = { teacherId };
  if (reason) body.reason = reason;
  return {
    [CALL_JQ_API]: {
      types: [Room.UPDATE_TEACHER, Room.UPDATE_TEACHER_SUCCESS, Room.UPDATE_TEACHER_FAIL],
      uri: `/admin/schedules/rooms/${roomId}/teacher`,
      method: 'POST',
      body,
    },
  };
}
