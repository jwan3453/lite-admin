import Student from '../../components/Student/Student';
import StudentTicket from '../../components/Student/Ticket';
import StudentFeedback from '../../components/Student/Feedback';
import StudentGroup from '../../components/Student/Group';
import VerificationCode from '../../components/Student/VerificationCode';

export default [
  {
    path: 'student',
    breadcrumbName: '学生管理',
    navigatorName: '学生管理',
    navigatorIcon: 'user',
    indexRoute: {
      component: Student,
    },
    childRoutes: [
      {
        breadcrumbName: '学生列表',
        navigatorName: '学生列表',
        navigatorIcon: 'user',
        path: 'manage',
        component: Student,
      },
      {
        breadcrumbName: '学生分组',
        navigatorName: '学生分组',
        navigatorIcon: 'team',
        path: 'group',
        component: StudentGroup,
      },
      {
        breadcrumbName: '工单',
        navigatorName: '工单',
        navigatorIcon: 'exception',
        path: 'ticket',
        component: StudentTicket,
      },
      {
        breadcrumbName: '课后反馈',
        navigatorName: '课后反馈',
        navigatorIcon: 'solution',
        path: 'feedback',
        component: StudentFeedback,
      },
      {
        breadcrumbName: '注册验证码',
        navigatorName: '验证码',
        navigatorIcon: 'qrcode',
        path: 'code',
        component: VerificationCode,
      },
    ],
  },
];
