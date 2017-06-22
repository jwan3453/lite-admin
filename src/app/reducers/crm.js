import { assign } from 'lodash';
import { Crm } from '../actions/actionTypes';

export function crm(
  state = {
    loading: false,
    crmData: {
      filters: {},
      result: {},
    },
  },
  action = {},
) {
  switch (action.type) {
    case Crm.UPDATE_CRM_STATUS:
    case Crm.FETCH_CRM:
    case Crm.DELETE_CRM:
    case Crm.CREATE_CRM:
      return assign({}, state, {
        loading: true,
      });
    case Crm.FETCH_CRM_SUCCESS:
      return assign({}, state, {
        loading: false,
        crmData: {
          filters: action.filters,
          result: action.response,
        },
      });
    case Crm.FETCH_CRM_FAIL:
    case Crm.DELETE_CRM_SUCCESS:
    case Crm.DELETE_CRM_FAIL:
    case Crm.UPDATE_CRM_STATUS_SUCCESS:
    case Crm.UPDATE_CRM_STATUS_FAIL:
    case Crm.CREATE_CRM_SUCCESS:
    case Crm.CREATE_CRM_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
