/**
 * Created by chenlingguang on 2017/5/31.
 */
import { StudentProduct } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchStudentProducts(studentId, filters) {
  return {
    [CALL_JQ_API]: {
      types: [StudentProduct.FETCH, StudentProduct.FETCH_SUCCESS, StudentProduct.FETCH_FAIL],
      uri: `/admin/billing/user-products/${studentId}`,
      method: 'GET',
      body: filters,
    },
  };
}
export function giftStudentProduct(studuentId, giftProduct) {
  return {
    [CALL_JQ_API]: {
      types: [StudentProduct.GIFT, StudentProduct.GIFT_SUCCESS, StudentProduct.GIFT_FAIL],
      uri: '/admin/billing/products/gift',
      method: 'POST',
      body: Object.assign({}, giftProduct, {
        toUserId: studuentId,
      }),
    },
  };
}
