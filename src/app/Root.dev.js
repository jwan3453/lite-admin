import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import configureStore from './store';
import routes from './routes';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
      </Provider>
    );
  }
}
