import Teacher from '../../components/Teacher/Teacher';
import TeacherResume from '../../components/Teacher/Resume';
import TeacherBill from '../../components/Teacher/Bill';
import TeacherBonus from '../../components/Teacher/Bonus';
import TeacherWithdraw from '../../components/Teacher/Withdraw';

export default [
  {
    path: 'teacher',
    navigatorName: '老师管理',
    navigatorIcon: 'customer-service',
    childRoutes: [
      {
        navigatorName: '简历列表',
        navigatorIcon: 'contacts',
        path: 'resume',
        component: TeacherResume,
      },
      {
        navigatorName: '老师信息',
        navigatorIcon: 'customer-service',
        path: 'teacher',
        component: Teacher,
      },
      {
        navigatorName: '老师账单',
        navigatorIcon: 'wallet',
        path: 'bill',
        component: TeacherBill,
      },
      {
        navigatorName: '老师奖金',
        navigatorIcon: 'red-envelope',
        path: 'bonus',
        component: TeacherBonus,
      },
      {
        navigatorName: '老师提现',
        navigatorIcon: 'bank',
        path: 'withdraw',
        component: TeacherWithdraw,
      },
    ],
  },
];
