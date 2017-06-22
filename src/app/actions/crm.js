import { Crm } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function updateCrmStatus(studentId, data) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [
        Crm.UPDATE_CRM_STATUS,
        Crm.UPDATE_CRM_STATUS_SUCCESS,
        Crm.UPDATE_CRM_STATUS_FAIL,
      ],
      uri: `/admin/students/${studentId}/setCrmStatus`,
      body: data,
      method: 'POST',
    },
  };
}

export function createCrmStatus(data) {
  return {
    [CALL_JQ_API]: {
      types: [
        Crm.CREATE_CRM,
        Crm.CREATE_CRM_SUCCESS,
        Crm.CREATE_CRM_FAIL,
      ],
      uri: '/admin/crms',
      body: data,
      method: 'POST',
    },
  };
}

export function fetchCrmList(studentId, filters) {
  return {
    studentId,
    [CALL_JQ_API]: {
      types: [
        Crm.FETCH_CRM,
        Crm.FETCH_CRM_SUCCESS,
        Crm.FETCH_CRM_FAIL,
      ],
      uri: `/admin/crms/${studentId}`,
      body: filters,
      method: 'GET',
    },
  };
}

export function deleteCrm(crmId) {
  return {
    crmId,
    [CALL_JQ_API]: {
      types: [
        Crm.DELETE_CRM,
        Crm.DELETE_CRM_SUCCESS,
        Crm.DELETE_CRM_FAIL,
      ],
      uri: `/admin/crms/${crmId}`,
      method: 'DELETE',
    },
  };
}
