import { Admin } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchAdmins() {
  return {
    [CALL_JQ_API]: {
      types: [Admin.FETCH, Admin.FETCH_SUCCESS, Admin.FETCH_FAIL],
      uri: '/admin/users',
      method: 'GET',
    },
  };
}
