export const DELETED = 0;
export const AVAILABLE = 1;

const STATUS = [
  {
    value: DELETED,
    text: '已删除',
  },
  {
    value: AVAILABLE,
    text: '有效',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

