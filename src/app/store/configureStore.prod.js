/**
 *
 * USER: chenlingguang
 * TIME: 16/5/24 上午11:49
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jqApi from '../middlewares/jqApi';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, jqApi));
}
