import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Category from './Category'
import CategoryPage from './CategoryPage'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/comedy`} component={Category} />
      <Route path={path} component={CategoryPage} />
    </Switch>
  )
}
