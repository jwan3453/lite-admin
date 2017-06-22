export const CREATED = 0;
export const FOLLOWING = 10;
export const DONE = 20;

const STATUS = [
  {
    value: CREATED,
    text: '未跟进',
    color: '',
  },
  {
    value: FOLLOWING,
    text: '已跟进',
    color: 'yellow',
  },
  {
    value: DONE,
    text: '跟进完成',
    color: 'green',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });


export default STATUS;

export { STATUS_MAP };

