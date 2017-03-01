// @flow

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Poll from '../poll/Poll'

export default
  <Route path="/">
    <IndexRoute component={Poll}/>
  </Route>
