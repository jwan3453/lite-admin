export const UNACTIVATED = 0;
export const ACTIVATED = 1;

const STATUS = [
  {
    value: UNACTIVATED,
    text: '未激活',
  },
  {
    value: ACTIVATED,
    text: '已激活',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

