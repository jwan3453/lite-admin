export const CREATED = 0;
export const WITHDRAWED = 1;
export const CANCELED = 2;
export const FROZEN = 3;

export const STATUS = [
  {
    value: CREATED,
    text: '已创建',
    color: 'blue',
  },
  {
    value: WITHDRAWED,
    text: '已提现',
    color: 'green',
  },
  {
    value: CANCELED,
    text: '已取消',
    color: 'red',
  },
  {
    value: FROZEN,
    text: '已冻结',
    color: 'yellow',
  },
];

