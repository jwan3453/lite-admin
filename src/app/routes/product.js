import Product from '../../components/Product/Product';
import Bill from '../../components/Product/Bill';
import Refund from '../../components/Product/Refund';

export default [
  {
    path: 'product',
    navigatorName: '产品',
    navigatorIcon: 'shopping-cart',
    childRoutes: [
      {
        navigatorName: '产品',
        navigatorIcon: 'shopping-cart',
        path: 'product',
        component: Product,
      },
      {
        navigatorName: '订单',
        navigatorIcon: 'pay-circle-o',
        path: 'bill',
        component: Bill,
      },
      {
        navigatorName: '退款',
        navigatorIcon: 'bank',
        path: 'refund',
        component: Refund,
      },
    ],
  },
];
