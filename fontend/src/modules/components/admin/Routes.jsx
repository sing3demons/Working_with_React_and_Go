import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import AddMovie from './AddMovie.jsx'
import Admin from './Admin.js'
import EditMovie from './EditMovie'

export default function Routes() {
  const { path } = useRouteMatch()
  const token = localStorage.getItem('token')

  if (token === null) return <Redirect to="/login" />
  return (
    <Switch>
      <Route path={`${path}/movies/edit/:id`} component={EditMovie} />
      <Route path={`${path}/movies/add`} exact component={AddMovie} />
      <Route path={path} component={Admin} />
    </Switch>
  )
}
