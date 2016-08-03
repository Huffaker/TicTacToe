import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import {HomeContainer} from './Home'
import About from './About'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer}/>
    <Route path="/about" component={About}/>
  </Route>
)