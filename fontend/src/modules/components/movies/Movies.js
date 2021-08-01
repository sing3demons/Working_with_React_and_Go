import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import LoadingPage from '../ui/LoadingPage.jsx'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const { path } = useRouteMatch()
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const fetchData = async () => {
    setIsLoading(true)
    const { data } = await axios.get('/movies')
    setMovies(data.movies)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const token = localStorage.getItem('token')

  if (isLoading) return <LoadingPage />

  return (
    <React.Fragment>
      <h2> Choose a Movie </h2>
      <div className="list-group">
        {movies.map((m) => (
          <div className="list-group-item list-group-item-action d-flex justify-content-between">
            <Link key={m.id} className="" to={`${path}/${m.id}`}>
              {m.title}
            </Link>
            {token && (
              <Link
                key={m.id}
                to={`/admin/movies/edit/${m.id}`}
                className="btn btn-outline-danger  btn-sm"
              >
                edit
              </Link>
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
