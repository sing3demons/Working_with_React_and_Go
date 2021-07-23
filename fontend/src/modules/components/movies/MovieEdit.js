import React from 'react'
import { useParams } from 'react-router-dom'

const MovieEdit = () => {
  const { id } = useParams()
  console.log(id)
  return <div> movie id : {id}</div>
}

export default MovieEdit
// CategoryPage
