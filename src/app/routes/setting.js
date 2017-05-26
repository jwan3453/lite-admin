import Profile from '../../components/Setting/Profile';
import User from '../../components/Setting/User';
import SourceQRCode from '../../components/Setting/SourceQRCode';
import SystemException from '../../components/Setting/SystemException';

export default [
  {
    path: 'setting',
    navigatorName: '控制面板',
    navigatorIcon: 'setting',
    childRoutes: [
      {
        navigatorName: '个人资料',
        navigatorIcon: 'user',
        path: 'profile',
        component: Profile,
      },
      {
        navigatorName: '配置管理员',
        navigatorIcon: 'user-add',
        path: 'user',
        component: User,
      },
      {
        navigatorName: '渠道二维码',
        navigatorIcon: 'qrcode',
        path: 'source',
        component: SourceQRCode,
      },
      {
        navigatorName: '异常配置',
        navigatorIcon: 'exception',
        path: 'exception',
        component: SystemException,
      },
    ],
  },
];
