// @flow

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import CreatePoll from '../poll/CreatePoll'
import Poll from '../poll/Poll'

export default
  <Route path="/">
    <IndexRoute component={CreatePoll}/>
    <Route path="/poll/create" component={CreatePoll}/>
    <Route path="/poll/:id" component={Poll}/>
    <Route path="*" component={CreatePoll}/>
  </Route>
