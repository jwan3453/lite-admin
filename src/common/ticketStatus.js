export const FAILED = -1;
export const CREATED = 0;
export const DONE = 1;

const STATUS = [
  {
    value: FAILED,
    name: '解决失败',
  },
  {
    value: CREATED,
    name: '未解决',
  },
  {
    value: DONE,
    name: '已解决',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

