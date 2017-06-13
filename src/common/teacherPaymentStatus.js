export const CREATED = 0;
export const WITHDRAWED = 1;
export const CANCELED = 2;
export const CONFIRMED = 3;

const STATUS = [
  {
    value: CREATED,
    text: '未确认',
    color: '',
  },
  {
    value: CONFIRMED,
    text: '已确认',
    color: 'blue',
  },
  {
    value: WITHDRAWED,
    text: '已提现',
    color: 'green',
  },
  {
    value: CANCELED,
    text: '已取消',
    color: 'yellow',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

