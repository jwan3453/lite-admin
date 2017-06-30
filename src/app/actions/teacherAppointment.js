import { TeacherAppointment } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchTeacherAppointments(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [
        TeacherAppointment.FETCH,
        TeacherAppointment.FETCH_SUCCESS,
        TeacherAppointment.FETCH_FAIL,
      ],
      uri: '/admin/schedules/teacherAppointments',
      method: 'GET',
      body: filters,
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
