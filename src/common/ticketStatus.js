export const UNRESOLVED = 1;
export const RESOLVED = 2;
export const PENDING = 3;
export const RESOLVE_FAILED = 4;

const STATUS = [
  {
    value: UNRESOLVED,
    name: '未解决',
  },
  {
    value: RESOLVED,
    name: '已解决',
  },
  {
    value: PENDING,
    name: '挂起',
  },
  {
    value: RESOLVE_FAILED,
    name: '解决失败',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };
