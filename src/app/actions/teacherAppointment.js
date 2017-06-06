import { TeacherAppointment } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchTeacherAppointments(teacherId = 0) {
  const body = {};
  if (teacherId > 0) {
    body.teacherId = teacherId;
  }
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherAppointment.FETCH,
        TeacherAppointment.FETCH_SUCCESS,
        TeacherAppointment.FETCH_FAIL,
      ],
      uri: '/admin/schedules/teacherAppointments',
      method: 'GET',
      body,
    },
  };
}

export function updateTeacherAppointment(teacherAppointmentId, statusId) {
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherAppointment.UPDATE,
        TeacherAppointment.UPDATE_SUCCESS,
        TeacherAppointment.UPDATE_FAIL,
      ],
      uri: `/admin/schedules/teacherAppointments/${teacherAppointmentId}`,
      method: 'POST',
      body: {
        statusId,
      },
    },
  };
}
