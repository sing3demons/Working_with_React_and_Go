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
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>genres </h2>
      <div className="list-group">
        {genres.map((m) => (
          <Link
            key={m.id}
            className="list-group-item list-group-item-action"
            to={{ pathname: `/genres/${m.id}`, genreName: m.genre_name }}
          >
            {m.genre_name}
          </Link>
        ))}
      </div>
    </div>
  )
}
