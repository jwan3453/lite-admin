/**
 * Created by chenlingguang on 2017/5/31.
 */
import { StudentProduct } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchStudentProducts(filters) {
  return {
    [CALL_JQ_API]: {
      types: [StudentProduct.FETCH, StudentProduct.FETCH_SUCCESS, StudentProduct.FETCH_FAIL],
      uri: '/admin/billing/products/gift',
      method: 'POST',
      body: filters,
    },
  };
}
export function gift(studentId, productId, parent) {
  return {
    [CALL_JQ_API]: {
      types: [StudentProduct.GIFT, StudentProduct.GIFT_SUCCESS, StudentProduct.GIFT_FAIL],
      uri: '/admin/billing/products/gift',
      method: 'POST',
      body: {
        parent,
        productId,
        toUserId: studentId,
      },
    },
  };
}
