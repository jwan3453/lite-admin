import ScheduleCalendar from '../../components/Schedule/Calendar';
import StudentSchedule from '../../components/Schedule/Student';
import TeacherSchedule from '../../components/Schedule/Teacher';
import TeacherStandby from '../../components/Schedule/Standby';

export default [
  {
    path: 'schedule',
    breadcrumbName: '预约管理',
    navigatorName: '预约管理',
    navigatorIcon: 'calendar',
    indexRoute: {
      component: ScheduleCalendar,
    },
    childRoutes: [
      {
        breadcrumbName: '排课日历',
        navigatorName: '排课日历',
        navigatorIcon: 'calendar',
        path: 'calendar',
        component: ScheduleCalendar,
      },
      {
        breadcrumbName: '待命老师',
        navigatorName: '待命老师',
        navigatorIcon: 'schedule',
        path: 'standby',
        component: TeacherStandby,
      },
      {
        breadcrumbName: '学生预约',
        navigatorName: '学生预约',
        navigatorIcon: 'user',
        path: 'student',
        component: StudentSchedule,
      },
      {
        breadcrumbName: '老师预约',
        navigatorName: '老师预约',
        navigatorIcon: 'customer-service',
        path: 'teacher',
        component: TeacherSchedule,
      },
    ],
  },
];
