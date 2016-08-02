import React from 'react'
import { render } from 'react-dom'
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router'
import routes from './modules/routes'

render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
)