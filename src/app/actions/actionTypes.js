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

  FETCH: 'student_fetch',
  FETCH_SUCCESS: 'student_fetch_success',
  FETCH_FAIL: 'student_fetch_fail',

  FETCH_MOBILE: 'student_fetch_mobile',
  FETCH_MOBILE_SUCCESS: 'student_fetch_mobile_success',
  FETCH_MOBILE_FAIL: 'student_fetch_mobile_fail',
};

export const StudentProduct = {
  FETCH: 'student_product_fetch',
  FETCH_SUCCESS: 'student_product_fetch_success',
  FETCH_FAIL: 'student_product_fetch_fail',

  GIFT: 'student_product_gift',
  GIFT_SUCCESS: 'student_product_gift_success',
  GIFT_FAIL: 'student_product_gift_fail',
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

  ADD_STUDENT: 'room_add_student',
  ADD_STUDENT_SUCCESS: 'room_add_student_success',
  ADD_STUDENT_FAIL: 'room_add_student_fail',

  UPDATE_TEACHER: 'room_update_teacher',
  UPDATE_TEACHER_SUCCESS: 'room_update_teacher_success',
  UPDATE_TEACHER_FAIL: 'room_update_teacher_fail',
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

  ADD_ROOM: 'schedule_add_room',
  ADD_ROOM_SUCCESS: 'schedule_add_room_success',
  ADD_ROOM_FAIL: 'schedule_add_room_fail',

  UPDATE: 'schedule_update',
  UPDATE_SUCCESS: 'schedule_update_success',
  UPDATE_FAIL: 'schedule_update_fail',

  FETCH_ROOMS: 'schedule_fetch_rooms',
  FETCH_ROOMS_SUCCESS: 'schedule_fetch_rooms_success',
  FETCH_ROOMS_FAIL: 'schedule_fetch_rooms_fail',
};

export const TeacherAppointment = {
  FETCH: 'teacher_appointment_fetch',
  FETCH_SUCCESS: 'teacher_appointment_fetch_success',
  FETCH_FAIL: 'teacher_appointment_fetch_fail',

  UPDATE: 'teacher_appointment_update',
  UPDATE_SUCCESS: 'teacher_appointment_update_success',
  UPDATE_FAIL: 'teacher_appointment_update_fail',
};

export const StudentAppointment = {
  FETCH: 'student_appointment_fetch',
  FETCH_SUCCESS: 'student_appointment_fetch_success',
  FETCH_FAIL: 'student_appointment_fetch_fail',

  UPDATE: 'student_appointment_update',
  UPDATE_SUCCESS: 'student_appointment_update_success',
  UPDATE_FAIL: 'student_appointment_update_fail',

  CHANGE_ROOM: 'student_appointment_change_room',
  CHANGE_ROOM_SUCCESS: 'student_appointment_change_room_success',
  CHANGE_ROOM_FAIL: 'student_appointment_change_room_fail',
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

  UPDATE: 'product_update',
  UPDATE_SUCCESS: 'product_update_success',
  UPDATE_FAIL: 'product_update_fail',
};

export const Products = {
  MANAGE: 'products_manage',
  MANAGE_SUCCESS: 'products_manage_success',
  MANAGE_FAIL: 'products_manage_fail',

  FETCH_SIMPLE_LIST: 'products_fetch_simple_list',
  FETCH_SIMPLE_LIST_SUCCESS: 'products_fetch_simple_list_success',
  FETCH_SIMPLE_LIST_FAIL: 'products_fetch_simple_list_fail',
};
