import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from '../content/Admin'
import Home from '../content/Home'
import MoviesRoutes from '../movies/Routes'
import CategoryRoutes from '../categories/Routes'

export default function Routes() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/movies" component={MoviesRoutes} />
      <Route path="/by-category" component={CategoryRoutes} />
      <Route path="/" component={Home} exact />
    </Switch>
  )
}
