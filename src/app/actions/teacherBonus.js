import { TeacherBonus } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

export function searchTeacherBonuses(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [
        TeacherBonus.SEARCH_TEACHER_BONUS,
        TeacherBonus.SEARCH_TEACHER_BONUS_SUCCESS,
        TeacherBonus.SEARCH_TEACHER_BONUS_FAIL,
      ],
      uri: '/admin/teacherBilling/bonuses/search',
      method: 'GET',
      body: filters,
    },
  };
}

export function createTeacherBonuses(data) {
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherBonus.CREATE_TEACHER_BONUS,
        TeacherBonus.CREATE_TEACHER_BONUS_SUCCESS,
        TeacherBonus.CREATE_TEACHER_BONUS_FAIL,
      ],
      uri: '/admin/teacherBilling/bonuses',
      method: 'POST',
      body: data,
    },
  };
}
