import Product from '../../components/Product/Product';
import Order from '../../components/Product/Order';
import Refund from '../../components/Product/Refund';

export default [
  {
    path: 'product',
    breadcrumbName: '产品',
    navigatorName: '产品',
    navigatorIcon: 'shopping-cart',
    childRoutes: [
      {
        breadcrumbName: '产品列表',
        navigatorName: '产品列表',
        navigatorIcon: 'shopping-cart',
        path: 'manage',
        component: Product,
      },
      {
        breadcrumbName: '订单',
        navigatorName: '订单',
        navigatorIcon: 'pay-circle-o',
        path: 'order',
        component: Order,
      },
      {
        breadcrumbName: '退款',
        navigatorName: '退款',
        navigatorIcon: 'bank',
        path: 'refund',
        component: Refund,
      },
    ],
  },
];
