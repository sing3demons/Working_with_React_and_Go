import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const { data } = await axios.get('/genres')
    setGenres(data.genres)
    // console.log(data.movies)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(genres)

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>genres </h2>
      <ul>
        {genres.map((m) => (
          <li key={m.id}>
            <Link to={`/genre/${m.id}`}>{m.genre_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
