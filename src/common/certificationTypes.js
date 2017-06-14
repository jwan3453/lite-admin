export const GENERAL = 0;
export const ACTIVITY = 'App\\Models\\ActivityTemplate';
export const LESSON = 'App\\Models\\Lesson';

const TYPES = [
  {
    value: GENERAL,
    text: '通用',
  },
  {
    value: ACTIVITY,
    text: 'Activity',
  },
  {
    value: LESSON,
    text: 'Lesson',
  },
];

const TYPE_MAP = {};

TYPES.forEach((item) => { TYPE_MAP[item.value] = item; });

export default TYPES;

export { TYPE_MAP };

