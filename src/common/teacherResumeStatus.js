export const NOTCHECKED = 0;
export const CHECKED = 1;
export const PASSED = 2;
export const FAILED = 3;

const STATUS = [
  {
    value: NOTCHECKED,
    text: '未查看',
    color: '#fa0',
  },
  {
    value: CHECKED,
    text: '已查看',
    color: '#2db7f5',
  },
  {
    value: PASSED,
    text: '通过',
    color: '#108ee9',
  },
  {
    value: FAILED,
    text: '未通过',
    color: '#f50',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export { STATUS_MAP };

export default STATUS;

