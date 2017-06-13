const STATUS = [
  {
    value: 1,
    name: '待支付',
    color: 'yellow',
  },
  {
    value: 2,
    name: '已支付',
    color: 'green',
  },
];

const STATUS_MAP = {};

STATUS.forEach((item) => { STATUS_MAP[item.value] = item; });

export default STATUS;

export { STATUS_MAP };

