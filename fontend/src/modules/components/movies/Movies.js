import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const { path } = useRouteMatch()
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const { data } = await axios.get('/movies')
    setMovies(data.movies)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <React.Fragment>
      <h2> Choose a Movie </h2>
      <div className="list-group">
        {movies.map((m) => (
          <Link
            key={m.id}
            className="list-group-item list-group-item-action"
            to={`${path}/${m.id}`}
          >
            {m.title}
          </Link>
        ))}
      </div>
    </React.Fragment>
  )
}
