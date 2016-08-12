import React from 'react';
import { render } from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import { Router, browserHistory } from 'react-router';
import reducer from '../client/reducer';
import routes from './routes';
import makeStore from '../src/store';
import remoteActionMiddleware from '../client/remote_action_middleware';
import {setState} from '../src/action_creators';


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept();
}