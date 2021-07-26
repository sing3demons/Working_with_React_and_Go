import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Genres from './Genres.jsx'
import OneGenre from './OneGenre.jsx'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:id`} component={OneGenre} />
      <Route path={path} component={Genres} />
    </Switch>
  )
}
