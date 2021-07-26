import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function OneGenre() {
  const { id } = useParams()
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

 

  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <h2>Genre</h2>
      <div className="list-group">
        {movies?.map((m) => (
          <div className="list-group-item list-group-item-action">
            {m.title}
          </div>
        ))}
      </div>
    </>
  )
}
