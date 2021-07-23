import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Category from './Category'

export default function CategoryPage() {
  const { path } = useRouteMatch()

  return (
    <div>
      <h2>CategoryPage</h2>
      <ul>
        <li>
          <Link to={`${path}/comedy`}>
            <Category title={`Comedy`} />
          </Link>
        </li>
        <li>
          <Link>Drama</Link>
        </li>
      </ul>
    </div>
  )
}
