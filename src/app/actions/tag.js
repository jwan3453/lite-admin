/**
 * 标签
 * @author 陈翔宇
 */

import { Tag } from './actionTypes';
import { CALL_JQ_API } from '../middlewares/jqApi';

/**
 * 创建标签
 * @param { string } 标签名称
 */
export function create(name) {
  return {
    name,
    [CALL_JQ_API]: {
      types: [Tag.CREATE, Tag.CREATE_SUCCESS, Tag.CREATE_FAIL],
      uri: '/admin/tags',
      method: 'POST',
      body: {
        name,
      },
    },
  };
}

/**
 * 移除标签
 * @param { string } 标签id
 */
export function remove(id) {
  return {
    id,
    [CALL_JQ_API]: {
      types: [Tag.REMOVE, Tag.REMOVE_SUCCESS, Tag.REMOVE_FAIL],
      uri: `/admin/tags/${id}`,
      method: 'DELETE',
    },
  };
}

/**
 * 获取所有标签
 * @param { number } 页大小
 * @param { number } 页码
 */
export function manage(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Tag.MANAGE, Tag.MANAGE_SUCCESS, Tag.MANAGE_FAIL],
      uri: '/admin/tags/manage',
      method: 'GET',
      body: filters,
    },
  };
}

/**
 * 根据名称模糊查询
 * @param { string } 标签名称
 * @param { number } 页大小
 * @param { number } 页码
 */
export function search(filters) {
  return {
    filters,
    [CALL_JQ_API]: {
      types: [Tag.SEARCH, Tag.SEARCH_SUCCESS, Tag.SEARCH_FAIL],
      uri: '/admin/tags/search',
      method: 'GET',
      body: filters,
    },
  };
}

/**
 * 添加学生
 * @param { string } 标签id
 * @param { array } 学生id数组
 */
export function addStudents(id, studentIds) {
  return {
    [CALL_JQ_API]: {
      types: [Tag.ADD_STUDENTS, Tag.ADD_STUDENTS_SUCCESS, Tag.ADD_STUDENTS_FAIL],
      uri: `/admin/tags/${id}/students`,
      method: 'POST',
      body: {
        studentIds,
      },
    },
  };
}

/**
 * 移除学生
 * @param { string } 标签id
 * @param { array } 学生id数组
 */
export function removeStudents(id, studentIds) {
  return {
    [CALL_JQ_API]: {
      types: [Tag.REMOVE_STUDENTS, Tag.REMOVE_STUDENTS_SUCCESS, Tag.REMOVE_STUDENTS_FAIL],
      uri: `/admin/tags/${id}/students`,
      method: 'DELETE',
      body: {
        studentIds,
      },
    },
  };
}
