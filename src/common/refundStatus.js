const STATUS = [
  {
    value: 1,
    name: '退款中',
  },
  {
    value: 2,
    name: '已退款',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

