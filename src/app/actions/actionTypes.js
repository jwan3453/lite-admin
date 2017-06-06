export const System = {
  UPDATE_DIMENSIONS: 'update_dimensions',
};

export const Admin = {
  FETCH: 'admin_fetch',
  FETCH_SUCCESS: 'admin_fetch_success',
  FETCH_FAIL: 'admin_fetch_fail',

  MANAGE: 'admin_manage',
  MANAGE_SUCCESS: 'admin_manage_success',
  MANAGE_FAIL: 'admin_manage_fail',

  CREATE: 'admin_create',
  CREATE_SUCCESS: 'admin_create_success',
  CREATE_FAIL: 'admin_create_fail',

  UPDATE_PASSWORD: 'admin_update_password',
  UPDATE_PASSWORD_SUCCESS: 'admin_update_password_success',
  UPDATE_PASSWORD_FAIL: 'admin_update_password_fail',

  UPDATE_NONCE: 'admin_update_nonce',
  UPDATE_NONCE_SUCCESS: 'admin_update_nonce_success',
  UPDATE_NONCE_FAIL: 'admin_update_nonce_fail',

  ENABLE: 'admin_enable',
  ENABLE_SUCCESS: 'admin_enable_success',
  ENABLE_FAIL: 'admin_enable_fail',
};

export const Student = {
  SEARCH: 'student_search',
  SEARCH_SUCCESS: 'student_search_success',
  SEARCH_FAIL: 'student_search_fail',

  MANAGE: 'student_manage',
  MANAGE_SUCCESS: 'student_manage_success',
  MANAGE_FAIL: 'student_manage_fail',

  FETCH: 'fetch',
  FETCH_SUCCESS: 'fetch_success',
  FETCH_FAIL: 'fetch_fail',

  FETCH_MOBILE: 'fetch_mobile',
  FETCH_MOBILE_SUCCESS: 'fetch_mobile_success',
  FETCH_MOBILE_FAIL: 'fetch_mobile_fail',
};

export const Teacher = {
  SEARCH: 'teacher_search',
  SEARCH_SUCCESS: 'teacher_search_success',
  SEARCH_FAIL: 'teacher_search_fail',

  FETCH: 'teacher_fetch',
  FETCH_SUCCESS: 'teacher_fetch_success',
  FETCH_FAIL: 'teacher_fetch_fail',
};

export const Rooms = {
  FETCH: 'rooms_fetch',
  FETCH_SUCCESS: 'rooms_fetch_success',
  FETCH_FAIL: 'rooms_fetch_fail',
};

export const Room = {
  FETCH: 'room_fetch',
  FETCH_SUCCESS: 'room_fetch_success',
  FETCH_FAIL: 'room_fetch_fail',

  UPDATE: 'room_update',
  UPDATE_SUCCESS: 'room_update_success',
  UPDATE_FAIL: 'room_update_fail',

  DELETE: 'room_delete',
  DELETE_SUCCESS: 'room_delete_success',
  DELETE_FAIL: 'room_delete_fail',

  ADD_STUDENT: 'add_student',
  ADD_STUDENT_SUCCESS: 'add_student_success',
  ADD_STUDENT_FAIL: 'add_student_fail',

  UPDATE_TEACHER: 'update_teacher',
  UPDATE_TEACHER_SUCCESS: 'update_teacher_success',
  UPDATE_TEACHER_FAIL: 'update_teacher_fail',
};

export const RoomTypes = {
  FETCH: 'room_types_fetch',
  FETCH_SUCCESS: 'room_types_fetch_success',
  FETCH_FAIL: 'room_types_fetch_fail',
};

export const Schedule = {
  CREATE: 'schedule_create',
  CREATE_SUCCESS: 'schedule_create_success',
  CREATE_FAIL: 'schedule_create_fail',

  COPY: 'schedule_copy',

  ADD_ROOM: 'add_room',
  ADD_ROOM_SUCCESS: 'add_room_success',
  ADD_ROOM_FAIL: 'add_room_fail',

  SET_INTERNAL: 'set_internal',
  SET_INTERNAL_SUCCESS: 'set_internal_SUCCESS',
  SET_INTERNAL_FAIL: 'set_internal_FAIL',

  FETCH_ROOMS: 'fetch_rooms',
  FETCH_ROOMS_SUCCESS: 'fetch_rooms_success',
  FETCH_ROOMS_FAIL: 'fetch_rooms_fail',
};

export const TeacherAppointment = {
  FETCH: 'fetch',
  FETCH_SUCCESS: 'fetch_success',
  FETCH_FAIL: 'fetch_fail',

  UPDATE: 'update',
  UPDATE_SUCCESS: 'update_success',
  UPDATE_FAIL: 'update_fail',
};

export const StudentAppointment = {
  FETCH: 'fetch',
  FETCH_SUCCESS: 'fetch_success',
  FETCH_FAIL: 'fetch_fail',

  UPDATE: 'update',
  UPDATE_SUCCESS: 'update_success',
  UPDATE_FAIL: 'update_fail',

  CHANGE_ROOM: 'change_room',
  CHANGE_ROOM_SUCCESS: 'change_room_success',
  CHANGE_ROOM_FAIL: 'change_room_fail',
};

export const Courses = {
  FETCH: 'courses_fetch',
  FETCH_SUCCESS: 'courses_fetch_success',
  FETCH_FAIL: 'courses_fetch_fail',
};

export const Course = {
  FETCH: 'course_fetch',
  FETCH_SUCCESS: 'course_fetch_success',
  FETCH_FAIL: 'course_fetch_fail',
};

export const Product = {
  CREATE: 'product_create',
  CREATE_SUCCESS: 'product_create_success',
  CREATE_FAIL: 'product_create_fail',
};

export const Products = {
  FETCH: 'products_fetch',
  FETCH_SUCCESS: 'products_fetch_success',
  FETCH_FAIL: 'products_fetch_fail',
};
