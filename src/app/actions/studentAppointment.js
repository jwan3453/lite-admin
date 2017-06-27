import { StudentAppointment } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchStudentAppointments(studentId = 0, filters) {
  const body = {};
  if (studentId > 0) {
    body.studentId = studentId;
  }
  return {
    [CALL_JQ_API]: {
      types: [
        StudentAppointment.FETCH,
        StudentAppointment.FETCH_SUCCESS,
        StudentAppointment.FETCH_FAIL,
      ],
      uri: '/admin/schedules/studentAppointments',
      method: 'GET',
      body: { ...body, ...filters },
    },
  };
}

export function updateStudentAppointment(studentAppointmentId, statusId) {
  return {
    [CALL_JQ_API]: {
      types: [
        StudentAppointment.UPDATE,
        StudentAppointment.UPDATE_SUCCESS,
        StudentAppointment.UPDATE_FAIL,
      ],
      uri: `/admin/schedules/studentAppointments/${studentAppointmentId}`,
      method: 'POST',
      body: {
        statusId,
      },
    },
  };
}

export function changeRoom(studentAppointmentId, toRoomId) {
  return {
    studentAppointmentId,
    toRoomId,
    [CALL_JQ_API]: {
      types: [
        StudentAppointment.CHANGE_ROOM,
        StudentAppointment.CHANGE_ROOM_SUCCESS,
        StudentAppointment.CHANGE_ROOM_FAIL,
      ],
      uri: `/admin/schedules/studentAppointments/${studentAppointmentId}/changeRoom`,
      method: 'POST',
      body: {
        toRoomId,
      },
    },
  };
}
