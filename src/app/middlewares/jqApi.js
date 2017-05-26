import { assign } from 'lodash';
import 'whatwg-fetch';

import auth from '../../common/auth';
import { API_ROOT } from '../../configs';

function buildQueryString(params) {
  if (!params) return '';
  const componets = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
  );

  return `?${componets.join('&')}`;
}

export const CALL_JQ_API = Symbol('Call JQ API');

export default () => next => (action) => {
  const JQAPI = action[CALL_JQ_API];
  if (typeof JQAPI === 'undefined') {
    return next(action);
  }

  const { types, uri, method } = action[CALL_JQ_API];
  const { body } = action[CALL_JQ_API];
  const [requestType, successType, failureType] = types;
  next(
    assign({}, action, {
      type: requestType,
    }),
  );

  if (!auth.loggedIn()) {
    return next(
      assign({}, action, {
        type: failureType,
        code: 'token.timeout',
        error: '登录超时',
      }),
    );
  }

  const token = auth.getAccessToken();
  const bodyString = method.toUpperCase() === 'GET'
    ? null
    : JSON.stringify(body);
  const queryString = method.toUpperCase() === 'GET'
    ? buildQueryString(body)
    : '';
  return global.fetch(API_ROOT + uri + queryString, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: bodyString,
  })
    .then(response =>
      response.text().then((text) => {
        try {
          const json = JSON.parse(text);
          return { json, response };
        } catch (e) {
          return {
            json: text,
            response,
          };
        }
      }),
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response =>
        next(
          assign({}, action, {
            response,
            type: successType,
          }),
        ),
      error =>
        next(
          assign({}, action, {
            type: failureType,
            error: error.message || 'unknown_error',
          }),
        ),
    );
};
