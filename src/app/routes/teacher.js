import Teacher from '../../components/Teacher/Teacher';
import TeacherResume from '../../components/Teacher/Resume';
import TeacherBill from '../../components/Teacher/Bill';
import TeacherBonus from '../../components/Teacher/Bonus';
import TeacherPayment from '../../components/Teacher/Payment';

export default [
  {
    path: 'teacher',
    breadcrumbName: '老师管理',
    navigatorName: '老师管理',
    navigatorIcon: 'customer-service',
    childRoutes: [
      {
        breadcrumbName: '简历列表',
        navigatorName: '简历列表',
        navigatorIcon: 'contacts',
        path: 'resume',
        component: TeacherResume,
      },
      {
        breadcrumbName: '老师列表',
        navigatorName: '老师列表',
        navigatorIcon: 'customer-service',
        path: 'manage',
        component: Teacher,
      },
      {
        breadcrumbName: '老师账单',
        navigatorName: '老师账单',
        navigatorIcon: 'wallet',
        path: 'bill',
        component: TeacherBill,
      },
      {
        breadcrumbName: '老师奖金',
        navigatorName: '老师奖金',
        navigatorIcon: 'red-envelope',
        path: 'bonus',
        component: TeacherBonus,
      },
      {
        breadcrumbName: '老师提现',
        navigatorName: '老师提现',
        navigatorIcon: 'bank',
        path: 'withdraw',
        component: TeacherPayment,
      },
    ],
  },
];
