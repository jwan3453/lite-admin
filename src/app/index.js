/**
 *
 * USER: chenlingguang
 * TIME: 16/5/24 上午11:44
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}

