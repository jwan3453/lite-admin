export const SYSTEM = 0;
export const REVIEW = 1;
export const ATTENDANCE = 2;

const TYPES = [
  {
    value: SYSTEM,
    text: '系统奖励',
  },
  {
    value: REVIEW,
    text: '评价奖励',
  },
  {
    value: ATTENDANCE,
    text: '出勤奖励',
  },
];

const TYPE_MAP = {};

TYPES.forEach((item) => { TYPE_MAP[item.value] = item; });

export default TYPES;

export { TYPE_MAP };

