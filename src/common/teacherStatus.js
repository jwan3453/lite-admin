export const TRAINNING = 1;
export const HIRED = 2;
export const FIRED = 3;
export const FROZEN = 4;

const STATUS = [
  {
    value: TRAINNING,
    text: '培训中',
    color: '#fa0',
  },
  {
    value: HIRED,
    text: '已聘用',
    color: '#2db7f5',
  },
  {
    value: FIRED,
    text: '已淘汰',
    color: '#f50',
  },
  {
    value: FROZEN,
    text: '冻结',
    color: '#108ee9',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export { STATUS_MAP };

export default STATUS;

