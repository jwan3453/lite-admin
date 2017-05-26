import auth from '../../common/auth';

const tokenValidate = (nextState, replace, callback) => {
  const loggedIn = auth.loggedIn();

  if (loggedIn) {
    callback();
  } else {
    auth
      .refreshToken()
      .then(() => {
        callback();
      })
      .catch(() => {
        replace('/login');
        callback();
      });
  }
};

export default tokenValidate;
