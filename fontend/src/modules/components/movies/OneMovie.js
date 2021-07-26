import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function OneMovie() {
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data } = await axios.get(`/movie/${id}`)
      setGenres(Object.values(data.movie.genres))
      setMovie(data.movie)
      setIsLoading(false)
    }

    fetchData()
  }, [id])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h2>
        Movie: {movie.title} ({movie.year})
      </h2>

      <div className="float-start">
        <small>Rating: {movie.mpaa_rating}</small>
      </div>
      <div className="float-end">
        {genres.map((m, index) => (
          <span className="badge bg-secondary me-1">{m}</span>
        ))}
      </div>
      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>Title:</strong>
            </td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>
              <strong>Description:</strong>
            </td>
            <td>{movie.description}</td>
          </tr>
          <tr>
            <td>
              <strong>Run time:</strong>
            </td>
            <td>{movie.runtime} minutes</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
