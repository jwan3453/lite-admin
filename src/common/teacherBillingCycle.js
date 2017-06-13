export const WEEKLY = 1;
export const MONTHLY = 2;

const CYCLES = [
  {
    value: WEEKLY,
    name: '周结',
  },
  {
    value: MONTHLY,
    name: '月结',
  },
];

const CYCLE_MAP = {};

CYCLES.forEach((item) => { CYCLE_MAP[item.value] = item; });

export default CYCLES;

export { CYCLE_MAP };

