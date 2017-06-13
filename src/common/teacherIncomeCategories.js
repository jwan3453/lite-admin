export const CERTIFICATE = 'App\\Models\\TeacherCertificate';
export const SCHEDULE = 'App\\Models\\TeacherSchedule';
export const BONUS = 'App\\Models\\TeacherBonus';
export const STANDBY = 'App\\Models\\Standby';

const CATEGORIES = [
  {
    value: CERTIFICATE,
    text: '资质认证收入',
  },
  {
    value: SCHEDULE,
    text: '上课收入',
  },
  {
    value: BONUS,
    text: '奖金收入',
  },
  {
    value: STANDBY,
    text: '待命收入',
  },
];

export default CATEGORIES;

