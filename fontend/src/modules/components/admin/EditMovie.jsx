import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormInput from './FormInput'
import axios from 'axios'

export default function EditMovie() {
  const [movie, setMovie] = useState({})
  const [releaseDate, setReleaseDate] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/movie/${id}`)
        const formatDate = new Date(data.movie.release_date)
        setMovie(data.movie)
        setReleaseDate(formatDate.toISOString())
      } catch (error) {}
    }

    fetchData()
  }, [id])

  return (
    <>
      <FormInput
        movie={movie}
        releaseDate={releaseDate.split('T')[0]}
        onClick="Edit"
        isCheckRequire={false}
      />
    </>
  )
}
