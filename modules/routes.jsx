import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import {HomeContainer} from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer}/>
  </Route>
)