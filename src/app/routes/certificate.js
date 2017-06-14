import Certificate from '../../components/Certificate/Certificate';
import CertificateSessionCalendar from '../../components/Certificate/SessionCalendar';
import TeacherCertificate from '../../components/Certificate/TeacherCertificate';

export default [
  {
    path: 'certificate',
    navigatorName: '资质认证',
    breadcrumbName: '资质认证',
    navigatorIcon: 'idcard',
    childRoutes: [
      {
        navigatorName: '资质列表',
        breadcrumbName: '资质列表',
        navigatorIcon: 'idcard',
        path: 'certificate',
        component: Certificate,
      },
      {
        navigatorName: '资质培训',
        breadcrumbName: '资质培训',
        navigatorIcon: 'calendar',
        path: 'calendar',
        component: CertificateSessionCalendar,
      },
      {
        navigatorName: '老师资质',
        breadcrumbName: '老师资质',
        navigatorIcon: 'team',
        path: 'teacher',
        component: TeacherCertificate,
      },
    ],
  },
];
