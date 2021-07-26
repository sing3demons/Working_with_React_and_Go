import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Movies from './Movies'
import OneMovie from './OneMovie'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:id`} component={OneMovie} />
      <Route path={path} component={Movies} />
    </Switch>
  )
}
