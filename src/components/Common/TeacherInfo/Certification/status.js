export const EXPIRED = -10;
export const ASSIGNED = 10;
export const IN_PROGRESS = 20;
export const FAILED = 30;
export const SUCCESSFUL = 40;

export const isExpired = value => value === EXPIRED;

export const isAssigned = value => value === ASSIGNED;

export const isInProgress = value => value === IN_PROGRESS;

export const isFailed = value => value === FAILED;

export const isSuccessful = value => value === SUCCESSFUL;

export const STATUS = [
  {
    value: EXPIRED,
    text: '已过期',
    color: 'yellow',
  },
  {
    value: ASSIGNED,
    text: '已申请',
    color: 'blue',
  },
  {
    value: IN_PROGRESS,
    text: '进行中',
    color: 'blue',
  },
  {
    value: FAILED,
    text: '认证失败',
    color: 'red',
  },
  {
    value: SUCCESSFUL,
    text: '认证成功',
    color: 'green',
  },
];

