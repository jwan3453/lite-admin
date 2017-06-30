/**
 * Created by chenlingguang on 2017/6/1.
 */


export const TEACHER_APPOINTMENT_CREATED = 0;
export const TEACHER_APPOINTMENT_CONFIRMED = 1;
export const TEACHER_APPOINTMENT_CANCELED = 2;
export const TEACHER_APPOINTMENT_FINISHED = 3;
export const TEACHER_APPOINTMENT_ABSENT = 4;
export const TEACHER_APPOINTMENT_SYSTEM_EXCEPTED = 5;
export const TEACHER_APPOINTMENT_TEACHER_EXCEPTED = 6;
export const TEACHER_APPOINTMENT_TBD = 7;

export const teacherAppointmentsStatus = [
  { value: TEACHER_APPOINTMENT_CREATED, text: '已创建' },
  { value: TEACHER_APPOINTMENT_CONFIRMED, text: '已确认' },
  { value: TEACHER_APPOINTMENT_CANCELED, text: '已取消' },
  { value: TEACHER_APPOINTMENT_FINISHED, text: '已完成' },
  { value: TEACHER_APPOINTMENT_ABSENT, text: '老师缺席' },
  { value: TEACHER_APPOINTMENT_SYSTEM_EXCEPTED, text: '系统异常' },
  { value: TEACHER_APPOINTMENT_TEACHER_EXCEPTED, text: '老师异常' },
  { value: TEACHER_APPOINTMENT_TBD, text: '原因待定' },
];

export const updateTeacherReasons = [
  { value: TEACHER_APPOINTMENT_CANCELED, text: '常规替换' },
  { value: TEACHER_APPOINTMENT_ABSENT, text: '老师缺席' },
  { value: TEACHER_APPOINTMENT_SYSTEM_EXCEPTED, text: '系统异常' },
  { value: TEACHER_APPOINTMENT_TEACHER_EXCEPTED, text: '老师异常' },
  { value: TEACHER_APPOINTMENT_TBD, text: '原因待定' },
];

const TEACHER_APPOINTMENT_STATUS_MAP = {};

teacherAppointmentsStatus.forEach((item) => { TEACHER_APPOINTMENT_STATUS_MAP[item.value] = item; });

export { TEACHER_APPOINTMENT_STATUS_MAP };

