import { assign } from 'lodash';
import { VerificationCode } from '../actions/actionTypes';

export function verificationCode(
  state = {
    loading: false,
    filters: {},
    result: {},
  },
  action = {},
) {
  switch (action.type) {
    case VerificationCode.FETCH_VERIFICATION_CODE:
      return assign({}, state, {
        loading: true,
      });
    case VerificationCode.FETCH_VERIFICATION_CODE_SUCCESS:
      return assign({}, state, {
        loading: false,
        filters: action.filters,
        result: action.response,
      });
    case VerificationCode.FETCH_VERIFICATION_CODE_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
