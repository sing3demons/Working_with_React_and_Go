import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import AddMovie from './AddMovie.jsx'
import Admin from './Admin.js'
import EditMovie from './EditMovie'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/movies/edit/:id`} component={EditMovie} />
      <Route path={`${path}/movies/add`} exact component={AddMovie} />
      <Route path={`${path}/movies/delete/:id`} exact component={EditMovie} />
      <Route path={path} component={Admin} />
    </Switch>
  )
}
