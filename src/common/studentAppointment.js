/**
 * Created by chenlingguang on 2017/6/1.
 */


export const STUDENT_APPOINTMENT_CREATED = 0;
export const STUDENT_APPOINTMENT_CONFIRMED = 1;
export const STUDENT_APPOINTMENT_CANCELED = 2;
export const STUDENT_APPOINTMENT_FINISHED = 3;
export const STUDENT_APPOINTMENT_ABSENT = 4;
export const STUDENT_APPOINTMENT_EXCEPTED = 5;

export const studentAppointmentsStatus = [
  { value: STUDENT_APPOINTMENT_CREATED, text: '已创建' },
  { value: STUDENT_APPOINTMENT_CONFIRMED, text: '已确认' },
  { value: STUDENT_APPOINTMENT_CANCELED, text: '已取消' },
  { value: STUDENT_APPOINTMENT_FINISHED, text: '已完成' },
  { value: STUDENT_APPOINTMENT_ABSENT, text: '缺席' },
  { value: STUDENT_APPOINTMENT_EXCEPTED, text: '异常' },
];

