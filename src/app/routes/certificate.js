import Certificate from '../../components/Certificate/Certificate';
import CertificateSessionCalendar from '../../components/Certificate/SessionCalendar';
import TeacherCertificate from '../../components/Certificate/TeacherCertificate';

export default [
  {
    path: 'certificate',
    navigatorName: '资质认证',
    navigatorIcon: 'idcard',
    childRoutes: [
      {
        navigatorName: '资质',
        navigatorIcon: 'idcard',
        path: 'certificate',
        component: Certificate,
      },
      {
        navigatorName: '培训',
        navigatorIcon: 'calendar',
        path: 'calendar',
        component: CertificateSessionCalendar,
      },
      {
        navigatorName: '记录',
        navigatorIcon: 'team',
        path: 'teacher',
        component: TeacherCertificate,
      },
    ],
  },
];
