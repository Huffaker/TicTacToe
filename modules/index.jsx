import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import { Router, browserHistory } from 'react-router'
import reducer from '../src/reducer';
import routes from './routes'
import makeStore from '../src/store'
import * as actionCreators from '../src/action_creators'

const store = makeStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('connection', state =>{
  debugger;
    console.log(state.toString())
  }
);


// Initial action
store.dispatch(actionCreators.resetGame());

render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept();
}