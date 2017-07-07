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

  UPDATE_ROLE: 'admin_update_role',
  UPDATE_ROLE_SUCCESS: 'admin_update_role_success',
  UPDATE_ROLE_FAIL: 'admin_update_role_fail',

  UPDATE_NONCE: 'admin_update_nonce',
  UPDATE_NONCE_SUCCESS: 'admin_update_nonce_success',
  UPDATE_NONCE_FAIL: 'admin_update_nonce_fail',

  ENABLE: 'admin_enable',
  ENABLE_SUCCESS: 'admin_enable_success',
  ENABLE_FAIL: 'admin_enable_fail',

  SEARCH: 'admin_search',
  SEARCH_SUCCESS: 'admin_search_success',
  SEARCH_FAIL: 'admin_search_fail',
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

  UPDATE_LEVEL: 'student_update_level',
  UPDATE_LEVEL_SUCCESS: 'student_update_level_success',
  UPDATE_LEVEL_FAIL: 'student_update_level_fail',

  FETCH_ENTRY_SURVEY_QUESTION: 'fetch_entry_survey_question',
  FETCH_ENTRY_SURVEY_QUESTION_SUCCESS: 'fetch_entry_survey_question_success',
  FETCH_ENTRY_SURVEY_QUESTION_FAIL: 'fetch_entry_survey_question_fail',

  FETCH_SIMPLE_LIST: 'fetch_simple_list',
  FETCH_SIMPLE_LIST_SUCCESS: 'fetch_simple_list_success',
  FETCH_SIMPLE_LIST_FAIL: 'fetch_simple_list_fail',

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

  FETCH_RESUME: 'resume_fetch',
  FETCH_RESUME_SUCCESS: 'resume_fetch_success',
  FETCH_RESUME_FAIL: 'resume_fetch_fail',

  CHANGE_STATUS: 'change_status',
  CHANGE_STATUS_SUCCESS: 'change_status_success',
  CHANGE_STATUS_FAIL: 'change_status_failed',

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

  REMOVE_STUDENT: 'room_remove_student',
  REMOVE_STUDENT_SUCCESS: 'room_remove_student_success',
  REMOVE_STUDENT_FAIL: 'room_remove_student_fail',

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

  SEND_FEEDBACK_REMINDER: 'send_feedback_reminder',
  SEND_FEEDBACK_REMINDER_SUCCESS: 'send_feedback_reminder_success',
  SEND_FEEDBACK_REMINDER_FAIL: 'send_feedback_reminder_fail',
};

export const Courses = {
  FETCH: 'courses_fetch',
  FETCH_SUCCESS: 'courses_fetch_success',
  FETCH_FAIL: 'courses_fetch_fail',
};

export const UserCourse = {
  FETCH: 'user_course_fetch',
  FETCH_SUCCESS: 'user_course_fetch_success',
  FETCH_FAIL: 'user_course_fetch_fail',
  UPDATE_LESSON_STATUS: 'update_lesson_status',
  UPDATE_LESSON_STATUS_SUCCESS: 'update_lesson_status_success',
  UPDATE_LESSON_STATUS_FAIL: 'update_lesson_status_fail',
  UPDATE_COURSE_ACTIVE: 'update_course_active',
  UPDATE_COURSE_ACTIVE_SUCCESS: 'update_course_active_success',
  UPDATE_COURSE_ACTIVE_FAIL: 'update_course_active_fail',
  FETCH_COURSE_ACTIVE: 'fetch_course_active',
  FETCH_COURSE_ACTIVE_SUCCESS: 'fetch_course_active_success',
  FETCH_COURSE_ACTIVE_FAIL: 'fetch_course_active_fail',
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

export const Scholarship = {
  FETCH_SUMMARY: 'scholarship_fetch_summary',
  FETCH_SUMMARY_SUCCESS: 'scholarship_fetch_summary_success',
  FETCH_SUMMARY_FAIL: 'scholarship_fetch_summary_fail',

  FETCH_HISTORY_LIST: 'scholarship_fetch_history_list',
  FETCH_HISTORY_LIST_SUCCESS: 'scholarship_fetch_history_list_success',
  FETCH_HISTORY_LIST_FAIL: 'scholarship_fetch_history_list_fail',

  APPLY_FIRST_SHARE_SCHOLARSHIP: 'apply_first_share_scholarship',
  APPLY_FIRST_SHARE_SCHOLARSHIP_SUCCESS: 'apply_first_share_scholarship_success',
  APPLY_FIRST_SHARE_SCHOLARSHIP_FAIL: 'apply_first_share_scholarship_fail',
};

export const Ticket = {
  CREATE: 'ticket_create',
  CREATE_SUCCESS: 'ticket_create_success',
  CREATE_FAIL: 'ticket_create_fail',

  FETCH_BY_USER: 'ticket_fetch_by_user',
  FETCH_BY_USER_SUCCESS: 'ticket_fetch_by_user_success',
  FETCH_BY_USER_FAIL: 'ticket_fetch_by_user_fail',

  UPDATE: 'ticket_update',
  UPDATE_SUCCESS: 'ticket_update_success',
  UPDATE_FAIL: 'ticket_update_fail',

  DELETE: 'ticket_delete',
  DELETE_SUCCESS: 'ticket_delete_success',
  DELETE_FAIL: 'ticket_delete_fail',

  MANAGE: 'ticket_manage',
  MANAGE_SUCCESS: 'ticket_manage_success',
  MANAGE_FAIL: 'ticket_manage_fail',
};

export const Crm = {
  FETCH_CRM: 'crm_fetch',
  FETCH_CRM_SUCCESS: 'crm_fetch_success',
  FETCH_CRM_FAIL: 'crm_fetch_fail',

  UPDATE_CRM_STATUS: 'update_crm_status',
  UPDATE_CRM_STATUS_SUCCESS: 'update_crm_status_success',
  UPDATE_CRM_STATUS_FAIL: 'update_crm_status_fail',

  DELETE_CRM: 'delete_crm',
  DELETE_CRM_SUCCESS: 'delete_crm_success',
  DELETE_CRM_FAIL: 'delete_crm_fail',

  CREATE_CRM: 'create_crm',
  CREATE_CRM_SUCCESS: 'create_crm_success',
  CREATE_CRM_FAIL: 'create_crm_fail',
};

export const StudentFeedback = {
  FETCH_STUDENT_FEEDBACK: 'student_feedback_fetch',
  FETCH_STUDENT_FEEDBACK_SUCCESS: 'student_feedback_fetch_success',
  FETCH_STUDENT_FEEDBACK_FAIL: 'student_feedback_fetch_fail',

  UPDATE_STUDENT_FEEDBACK: 'update_student_feedback_status',
  UPDATE_STUDENT_FEEDBACK_SUCCESS: 'update_student_feedback_status_success',
  UPDATE_STUDENT_FEEDBACK_FAIL: 'update_student_feedback_status_fail',
};

export const VerificationCode = {
  FETCH_VERIFICATION_CODE: 'verification_code_fetch',
  FETCH_VERIFICATION_CODE_SUCCESS: 'verification_code_fetch_success',
  FETCH_VERIFICATION_CODE_FAIL: 'verification_code_fetch_fail',
};

export const TeacherStandby = {
  FETCH: 'fetch_teacher_standby',
  FETCH_SUCCESS: 'fetch_teacher_standby_success',
  FETCH_FAIL: 'fetch_teacher_standby_fail',

  CREATE: 'create_teacher_standby',
  CREATE_SUCCESS: 'create_teacher_standby_success',
  CREATE_FAIL: 'create_teacher_standby_fail',

  UPDATE: 'update_teacher_standby',
  UPDATE_SUCCESS: 'update_teacher_standby_success',
  UPDATE_FAIL: 'update_teacher_standby_fail',
};

export const TeacherBonus = {
  SEARCH_TEACHER_BONUS: 'search_teacher_bonus',
  SEARCH_TEACHER_BONUS_SUCCESS: 'search_teacher_bonus_success',
  SEARCH_TEACHER_BONUS_FAIL: 'search_teacher_bonus_fail',

  CREATE_TEACHER_BONUS: 'create_teacher_bonus',
  CREATE_TEACHER_BONUS_SUCCESS: 'create_teacher_bonus_success',
  CREATE_TEACHER_BONUS_FAIL: 'create_teacher_bonus_fail',
};
