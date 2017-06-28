export const STUDENT_REGISTER = 0;
export const STUDENT_LOGIN = 1;
export const STUDENT_RESET_PASSWORD = 2;
export const STUDENT_BINDING_MOBILE = 3;

const TYPES = [
  {
    value: STUDENT_REGISTER,
    text: '用户注册验证',
  },
  {
    value: STUDENT_LOGIN,
    text: '用户登录验证',
  },
  {
    value: STUDENT_RESET_PASSWORD,
    text: '用户重置密码',
  },
  {
    value: STUDENT_BINDING_MOBILE,
    text: '用户绑定手机号',
  },
];

const TYPE_MAP = {};

TYPES.forEach((item) => { TYPE_MAP[item.value] = item; });

export default TYPES;

export { TYPE_MAP };

