// import React from "react";
// import { Route, IndexRoute } from "react-router";

import tokenValidate from './tokenValidate';
import App from '../../components/App';
import Dashboard from '../../components/Dashboard';
import Login from '../../components/Login';

import dashboardRoutes from './dashboard';
import scheduleRoutes from './schedule';
import studentRoutes from './student';
import teacherRoutes from './teacher';
import productRoutes from './product';
import certificateRoutes from './certificate';
import settingRoutes from './setting';

export default [
  {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    breadcrumbName: '首页',
    onEnter: tokenValidate,
    childRoutes: [
      ...dashboardRoutes,
      ...studentRoutes,
      ...scheduleRoutes,
      ...teacherRoutes,
      ...certificateRoutes,
      ...productRoutes,
      ...settingRoutes,
    ],
  },
  {
    path: '/login',
    component: Login,
  },
];
