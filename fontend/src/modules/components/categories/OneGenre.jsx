import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../ui/LoadingPage.jsx'

export default function OneGenre({ location }) {
  const { id } = useParams()
  const { genreName } = location

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data } = await axios.get(`/movies/${id}`)
      setMovies(data.movies)
      setIsLoading(false)
    }
    fetchData()
  }, [id])

  if (isLoading) return <LoadingPage />
  
  return (
    <>
      <h2>Genre: {genreName}</h2>
      <div className="list-group">
        {movies?.map((m) => (
          <Link
            to={`/movies/${m.id}`}
            className="list-group-item list-group-item-action"
          >
            {m.title}
          </Link>
        ))}
      </div>
    </>
  )
}
