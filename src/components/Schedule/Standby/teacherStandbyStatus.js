export const CREATED = 0;
export const CONFIRMED = 1;
export const CANCELED = 2;
export const ASSIGNED = 3;

const STATUS = [
  {
    value: CREATED,
    text: '未确认',
    color: '',
  },
  {
    value: CONFIRMED,
    text: '已确认',
    color: 'green',
  },
  {
    value: CANCELED,
    text: '已取消',
    color: 'yellow',
  },
  {
    value: ASSIGNED,
    text: '已指派',
    color: 'blue',
  },
];

const STATUS_MAP = {};

export default STATUS;

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export { STATUS_MAP };

