import moment from 'moment';

export default [
  { k: 'lastWeek', n: '上周' },
  { k: 'thisWeek', n: '本周' },
  { k: 'nextWeek', n: '下周' },
  { k: 'yesterday', n: '昨天' },
  { k: 'today', n: '今天' },
  { k: 'tomorrow', n: '明天' },
  { k: 'theDayAfterTomorrow', n: '后天' },
  { k: 'nextSevenDay', n: '未来7天' },
  { k: 'Monday', n: '周一' },
  { k: 'Tuesday', n: '周二' },
  { k: 'Wednesday', n: '周三' },
  { k: 'Thursday', n: '周四' },
  { k: 'Friday', n: '周五' },
  { k: 'Saturday', n: '周六' },
  { k: 'Sunday', n: '周日' },
];

function getMonday(day = '') {
  const date = day ? moment(day) : moment();
  if (date.day() === 0) date.add(-1, 'weeks');
  return date.day(1);
}

export function getDateRange(key = 'today') {
  switch (key) {
    case 'lastMonth':
      return [
        moment().subtract(1, 'month').startOf('month'),
        moment().startOf('month'),
      ];
    case 'thisMonth':
      return [
        moment().startOf('month'),
        moment().add(1, 'month').startOf('month'),
      ];
    case 'lastWeek':
      return [
        getMonday().add(-1, 'weeks'),
        getMonday(),
      ];
    case 'thisWeek':
      return [
        getMonday(),
        getMonday().add(1, 'weeks'),
      ];
    case 'nextWeek':
      return [
        getMonday().add(1, 'weeks'),
        getMonday().add(2, 'weeks'),
      ];
    case 'yesterday':
      return [moment().add(-1, 'days'), moment()];
    case 'tomorrow':
      return [
        moment().add(1, 'days'),
        moment().add(2, 'days'),
      ];
    case 'theDayAfterTomorrow':
      return [
        moment().add(2, 'days'),
        moment().add(3, 'days'),
      ];
    case 'nextSevenDay':
      return [moment(), moment().add(7, 'days')];
    case 'Monday':
      return [
        getMonday(),
        getMonday().add(1, 'days'),
      ];
    case 'Tuesday':
      return [
        getMonday().add(1, 'days'),
        getMonday().add(2, 'days'),
      ];
    case 'Wednesday':
      return [
        getMonday().add(2, 'days'),
        getMonday().add(3, 'days'),
      ];
    case 'Thursday':
      return [
        getMonday().add(3, 'days'),
        getMonday().add(4, 'days'),
      ];
    case 'Friday':
      return [
        getMonday().add(4, 'days'),
        getMonday().add(5, 'days'),
      ];
    case 'Saturday':
      return [
        getMonday().add(5, 'days'),
        getMonday().add(6, 'days'),
      ];
    case 'Sunday':
      return [
        getMonday().add(6, 'days'),
        getMonday().add(7, 'days'),
      ];
    case 'today':
    default:
      return [moment().startOf('day'), moment().startOf('day').add(1, 'days')];
  }
}
