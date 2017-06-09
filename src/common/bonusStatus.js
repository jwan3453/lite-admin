export const CREATED = 0;
export const SUCCESS = 1;
export const FAILED = 2;

export const STATUS = [
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

