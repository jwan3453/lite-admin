import { VerificationCode } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function fetchVerificationCode(filters = {}) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [
        VerificationCode.FETCH_VERIFICATION_CODE,
        VerificationCode.FETCH_VERIFICATION_CODE_SUCCESS,
        VerificationCode.FETCH_VERIFICATION_CODE_FAIL,
      ],
      uri: '/admin/students/verificationCode',
      body: filters,
      nonce: true,
      method: 'GET',
    },
  };
}
