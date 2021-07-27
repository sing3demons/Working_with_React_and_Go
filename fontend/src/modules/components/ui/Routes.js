import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../content/Home'
import MoviesRoutes from '../movies/Routes'
import GenresRoutes from '../categories/Routes.js'
import AdminRoutes from '../admin/Routes'

export default function Routes() {
  return (
    <Switch>
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/movies" component={MoviesRoutes} />
      <Route path="/genres" component={GenresRoutes} />
      <Route path="/" component={Home} exact />
    </Switch>
  )
}
