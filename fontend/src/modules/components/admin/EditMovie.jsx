import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormInput from './FormInput'
import axios from 'axios'
import LoadingPage from '../ui/LoadingPage.jsx'

export default function EditMovie() {
  const [movie, setMovie] = useState({})
  const [releaseDate, setReleaseDate] = useState('')
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`/movie/${id}`)
        const formatDate = new Date(data.movie.release_date)
        setMovie(data.movie)
        setReleaseDate(formatDate.toISOString())
        setIsLoading(false)
      } catch (error) {}
    }

    fetchData()
  }, [id])

  if (isLoading) return <LoadingPage />

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
