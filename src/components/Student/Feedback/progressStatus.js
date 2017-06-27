export const CREATED = 0;
export const DONE = 1;

const STATUS = [
  {
    value: CREATED,
    text: '未处理',
    color: '',
  },
  {
    value: DONE,
    text: '已处理',
    color: 'green',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

