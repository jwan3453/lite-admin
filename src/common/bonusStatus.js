export const CREATED = 0;
export const SUCCESS = 1;
export const FAILED = 2;

const STATUS = [
  {
    value: CREATED,
    text: '未确认',
    color: '',
  },
  {
    value: SUCCESS,
    text: '已确认',
    color: 'green',
  },
  {
    value: FAILED,
    text: '已取消',
    color: 'yellow',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

