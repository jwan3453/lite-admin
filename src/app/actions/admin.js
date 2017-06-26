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

export function manageAdmins(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Admin.MANAGE, Admin.MANAGE_SUCCESS, Admin.MANAGE_FAIL],
      uri: '/admin/users/manage',
      method: 'GET',
      body: filters,
    },
  };
}

export function createAdmin(data) {
  return {
    [CALL_JQ_API]: {
      types: [Admin.CREATE, Admin.CREATE_SUCCESS, Admin.CREATE_FAIL],
      uri: '/admin/users',
      method: 'POST',
      body: data,
    },
  };
}

export function updateAdminPassword(userId, data) {
  return {
    [CALL_JQ_API]: {
      types: [
        Admin.UPDATE_PASSWORD,
        Admin.UPDATE_PASSWORD_SUCCESS,
        Admin.UPDATE_PASSWORD_FAIL,
      ],
      uri: `/admin/users/${userId}/updatePassword`,
      method: 'POST',
      body: data,
    },
  };
}

export function updateAdminNonce(userId) {
  return {
    [CALL_JQ_API]: {
      types: [
        Admin.UPDATE_NONCE,
        Admin.UPDATE_NONCE_SUCCESS,
        Admin.UPDATE_NONCE_FAIL,
      ],
      uri: `/admin/users/${userId}/nonce`,
      method: 'POST',
    },
  };
}

export function enableAdmin(userId, enable) {
  return {
    [CALL_JQ_API]: {
      types: [Admin.ENABLE, Admin.ENABLE_SUCCESS, Admin.ENABLE_FAIL],
      uri: `/admin/users/${userId}/enable`,
      method: 'POST',
      body: {
        enable,
      },
    },
  };
}

export function searchAdmins(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Admin.SEARCH, Admin.SEARCH_SUCCESS, Admin.SEARCH_FAIL],
      uri: '/admin/users/search',
      method: 'GET',
      body: filters,
    },
  };
}
