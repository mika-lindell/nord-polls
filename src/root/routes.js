// @flow

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import CreatePoll from '../poll/CreatePoll'
import VotePoll from '../poll/VotePoll'
import ShowPoll from '../poll/ShowPoll'

export default
  <Route path="/">
    <IndexRoute component={CreatePoll}/>
    <Route path="/poll/create" component={CreatePoll}/>
    <Route path="/poll/:id/results" component={ShowPoll}/>
    <Route path="/poll/:id/vote" component={VotePoll}/>
    <Route path="/poll/:id" component={ShowPoll}/>
    <Route path="*" component={CreatePoll}/>
  </Route>
