import 'whatwg-fetch';
import { AUTH_SERVER, REFRESH_SERVER } from '../configs';

// 1000 * 60 * 5;
const THRESHOLD = 300000;
// 1000 * 60 * 2;
const REFRESH_INTERVAL = 120000;
const MILLISECOND = 1000;

function toMillSecond(second) {
  return second * MILLISECOND;
}

function persistentToLocalStorage(token) {
  global.localStorage.token = JSON.stringify(
    Object.assign(
      {
        expires: toMillSecond(token.expires_in) + Date.now(),
      },
      token,
    ),
  );
}

function extractJSON(response) {
  const contentType = response.headers.get('content-type');
  const isJSONResponse =
    contentType && contentType.indexOf('application/json') !== -1;
  const isResponseSuccess = response.ok;

  if (!isJSONResponse) {
    throw new Error('unknown error');
  }

  return response.json().then((json) => {
    if (!isResponseSuccess) {
      throw new Error(json.message);
    }

    return json;
  });
}

const auth = {
  refreshTokenTimer: null,

  login(mobile, password, authCode) {
    if (this.loggedIn()) {
      return Promise.resolve();
    }

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return global.fetch(AUTH_SERVER, {
      mode: 'cors',
      method: 'POST',
      headers,
      body: JSON.stringify({
        mobile,
        password,
        nonce: authCode,
      }),
    })
      .then(extractJSON)
      .then(persistentToLocalStorage);
  },

  logout() {
    global.localStorage.removeItem('token');

    return Promise.resolve();
  },

  loggedIn() {
    // skip login if not in production mode.
    // if (process.env.NODE_ENV !== 'production') {
    //   return true;
    // }

    const token = this.deSerializeToken();

    return token && token.expires > Date.now();
  },

  getAccessToken() {
    const token = this.deSerializeToken();

    if (token) {
      return token.access_token;
    }

    return null;
  },

  deSerializeToken() {
    const { token } = global.localStorage;

    if (!token) {
      return null;
    }

    try {
      return JSON.parse(token);
    } catch (e) {
      return null;
    }
  },

  initFreshTokenTimmer() {
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer);
    }

    this.refreshTokenTimer = setTimeout(
      this.refreshToken.bind(this),
      REFRESH_INTERVAL,
    );
  },

  refreshToken() {
    this.initFreshTokenTimmer();

    const token = this.deSerializeToken();

    if (!token) {
      return Promise.reject(new Error('token not exist'));
    }

    if (token.expires > Date.now() + THRESHOLD) {
      return Promise.resolve();
    }

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return global.fetch(REFRESH_SERVER, {
      mode: 'cors',
      method: 'POST',
      headers,
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    })
      .then(extractJSON)
      .then(persistentToLocalStorage);
  },
};

auth.initFreshTokenTimmer();

export default auth;
