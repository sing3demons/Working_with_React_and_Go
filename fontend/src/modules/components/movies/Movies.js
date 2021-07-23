import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

var data = [
  { id: 1, title: 'The Shawshank Redemption', runtime: 142 },
  { id: 2, title: 'The Godfather', runtime: 175 },
  { id: 3, title: 'The Dark Knight ', runtime: 153 },
]

export default function Movies() {
  const [movies, setMovies] = useState([])
  const { path } = useRouteMatch()

  useEffect(() => {
    setMovies(data)
  }, [])

  return (
    <>
      <h2>Choose a Movie</h2>
      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            <Link to={`${path}/edit/${m.id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
