import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MovieEdit from './MovieEdit'
import Movies from './Movies'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/edit/:id`} component={MovieEdit} />
      <Route path={path} component={Movies} />
    </Switch>
  )
}
