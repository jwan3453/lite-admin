const LEVELS = [
  {
    value: 1,
    name: 'L1',
  },
  {
    value: 2,
    name: 'L2',
  },
  {
    value: 3,
    name: 'L3',
  },
  {
    value: 4,
    name: 'L4',
  },
  {
    value: 5,
    name: 'L5',
  },
  {
    value: 6,
    name: 'L6',
  },
  {
    value: 7,
    name: 'L7',
  },
  {
    value: 8,
    name: 'L8',
  },
  {
    value: 9,
    name: 'L9',
  },
  {
    value: 10,
    name: 'L10',
  },
  {
    value: 11,
    name: 'L11',
  },
  {
    value: 12,
    name: 'L12',
  },
];

const LEVEL_MAP = {};

LEVELS.forEach((item) => { LEVEL_MAP[item.value] = item; });

export default LEVELS;

export { LEVEL_MAP };

