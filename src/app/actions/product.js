import { Product, Products } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function createProduct(data) {
  return {
    [CALL_JQ_API]: {
      types: [Product.CREATE, Product.CREATE_SUCCESS, Product.CREATE_FAIL],
      uri: '/admin/billing/products',
      body: data,
      method: 'POST',
    },
  };
}

export function manageProducts(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Products.MANAGE, Products.MANAGE_SUCCESS, Products.MANAGE_FAIL],
      uri: '/admin/billing/products/manage',
      body: filters,
      method: 'GET',
    },
  };
}
