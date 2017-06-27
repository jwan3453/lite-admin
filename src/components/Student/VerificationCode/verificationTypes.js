export const STUDENT_RESET_PASSWORD = 0;
export const STUDENT_SIGN_UP = 1;

const TYPES = [
  {
    value: STUDENT_RESET_PASSWORD,
    text: '用户重置密码',
  },
  {
    value: STUDENT_SIGN_UP,
    text: '用户注册验证',
  },
];

const TYPE_MAP = {};

TYPES.forEach((item) => { TYPE_MAP[item.value] = item; });

export default TYPES;

export { TYPE_MAP };

