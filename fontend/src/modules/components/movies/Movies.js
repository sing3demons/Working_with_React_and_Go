import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import LoadingPage from '../ui/LoadingPage.jsx'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const { path } = useRouteMatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data } = await axios.get('/movies')
      setMovies(data.movies)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const token = localStorage.getItem('token')

  if (isLoading) return <LoadingPage />

  return (
    <>
      <h2> Choose a Movie </h2>
      <div className="list-group">
        {movies?.map(({ id, title }) => (
          <div className="list-group-item list-group-item-action d-flex justify-content-between">
            <Link key={id} to={`${path}/${id}`}>
              {title}
            </Link>

            {token && (
              <Link
                to={`/admin/movies/edit/${id}`}
                className="btn btn-outline-danger btn-sm"
              >
                edit
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
