import { Product } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function createProduct(data) {
  return async (dispatch) => {
    await dispatch({
      [CALL_JQ_API]: {
        types: [Product.CREATE, Product.CREATE_SUCCESS, Product.CREATE_FAIL],
        uri: '/admin/billing/products',
        body: data,
        method: 'POST',
      },
    });
  };
}
