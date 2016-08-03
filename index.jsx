import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router'
import reducer from './src/reducer';
import routes from './modules/routes'
import makeStore from './src/store'
import * as actionCreators from './src/action_creators'

const store = makeStore(reducer);

// Initial action
store.dispatch(actionCreators.resetGame());

render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)