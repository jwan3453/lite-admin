export const PPT = 'ppt';
export const VIDEO = 'video';
export const TESTS = 'tests';
export const SESSION = 'session';
export const PRACTICE = 'practice';

const TYPES = [
  {
    value: PPT,
    text: 'ppt(pdf)',
  },
  {
    value: VIDEO,
    text: 'video',
  },
  {
    value: TESTS,
    text: 'tests',
  },
  {
    value: SESSION,
    text: 'session',
  },
  {
    value: PRACTICE,
    text: 'practice',
  },
];

const TYPE_MAP = {};

TYPES.forEach((item) => { TYPE_MAP[item.value] = item; });

export default TYPES;

export { TYPE_MAP };

export const isPPTStep = value => value.toLowerCase() === 'ppt';

export const isVideoStep = value => value.toLowerCase() === 'video';

export const isTestsStep = value => value.toLowerCase() === 'tests';

export const isSessionStep = value => value.toLowerCase() === 'session';

export const isPracticeStep = value => value.toLowerCase() === 'practice';

