export const TYPES = [
  {
    value: 'ppt',
    text: 'ppt(pdf)',
  },
  {
    value: 'video',
    text: 'video',
  },
  {
    value: 'tests',
    text: 'tests',
  },
  {
    value: 'session',
    text: 'session',
  },
  {
    value: 'practice',
    text: 'practice',
  },
];

export const isPPTStep = value => value.toLowerCase() === 'ppt';

export const isVideoStep = value => value.toLowerCase() === 'video';

export const isTestsStep = value => value.toLowerCase() === 'tests';

export const isSessionStep = value => value.toLowerCase() === 'session';

export const isPracticeStep = value => value.toLowerCase() === 'practice';

