export const OTHERS = 0;
export const SCHEDULED = 1;
export const INVOICE = 2;
export const SUGGESTIONS = 3;
export const ASSESSMENT = 4;
export const REFUND = 5;
export const RnD = 6;

const CATEGORIES = [
  {
    value: OTHERS,
    name: '其他',
  },
  {
    value: SCHEDULED,
    name: '固定排课',
  },
  {
    value: INVOICE,
    name: '发票与协议',
  },
  {
    value: SUGGESTIONS,
    name: '投诉与建议',
  },
  {
    value: ASSESSMENT,
    name: '测评',
  },
  {
    value: REFUND,
    name: '退费与财务审核',
  },
  {
    value: RnD,
    name: '技术',
  },
];


const CATEGORY_MAP = {};

CATEGORIES.forEach((item) => { CATEGORY_MAP[item.value] = item; });

export default CATEGORIES;

export { CATEGORY_MAP };

