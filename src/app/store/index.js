/**
 *
 * USER: chenlingguang
 * TIME: 16/5/24 上午11:48
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
