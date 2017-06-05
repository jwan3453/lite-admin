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

export function fetchProducts(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Products.FETCH, Products.FETCH_SUCCESS, Products.FETCH_FAIL],
      uri: '/admin/billing/products',
      body: filters,
      method: 'GET',
    },
  };
}
