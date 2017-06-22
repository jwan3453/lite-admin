export const NO = 0;
export const YES = 1;

const STATUS = [
  {
    value: NO,
    text: '有效',
    color: 'green',
  },
  {
    value: YES,
    text: '无效',
    color: 'yellow',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

