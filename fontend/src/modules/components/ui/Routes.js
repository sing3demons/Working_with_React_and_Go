import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from '../content/Admin'
import Home from '../content/Home'
import MoviesRoutes from '../movies/Routes'
import GenresRoutes from '../categories/Routes.js'

export default function Routes() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />{' '}
      <Route path="/movies" component={MoviesRoutes} />{' '}
      <Route path="/genres" component={GenresRoutes} />{' '}
      <Route path="/" component={Home} exact />
    </Switch>
  )
}
