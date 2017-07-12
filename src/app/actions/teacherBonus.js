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

export function changeTeacherBonusStatus(id, data) {
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherBonus.CHANGE_BONUS_STATUS,
        TeacherBonus.CHANGE_BONUS_STATUS_FAIL,
        TeacherBonus.CHANGE_BONUS_STATUS_SUCCESS,
      ],
      uri: `/admin/teacherBilling/bonuses/${id}`,
      method: 'PUT',
      body: data,
    },
  };
}

export function recalculateTeacherBonus(data) {
  return {
    [CALL_JQ_API]: {
      types: [
        TeacherBonus.RECALCULATE_TEACHER_BONUS,
        TeacherBonus.RECALCULATE_TEACHER_BONUS_SUCCESS,
        TeacherBonus.RECALCULATE_TEACHER_BONUS_FAIL,
      ],
      uri: '/admin/schedules/teachers/billing/recalculate',
      method: 'POST',
      body: data,
    },
  };
}
