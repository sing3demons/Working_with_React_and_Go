import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function FormInput({
  movie,
  releaseDate,
  onClick,
  isCheckRequire,
}) {
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  let token = localStorage.getItem('token')

  const onSubmit = async (data) => {
    let {
      title,
      description,
      year,
      release_date,
      runtime,
      rating,
      mpaa_rating,
    } = data
    
    if (onClick === 'Edit') {
      if (title === '') title = movie.title
      if (description === '') description = movie.description
      if (year === '') year = movie.year
      if (release_date === '') release_date = movie.release_date
      if (runtime === '') runtime = movie.runtime
      if (rating === '') rating = movie.rating
      if (mpaa_rating === 'Choose..') mpaa_rating = movie.mpaa_rating

      return await axios.put(
        `/admin/edit-movie/${movie.id}`,
        {
          title: title,
          description: description,
          year: year,
          release_date: release_date.split('T')[0],
          runtime: runtime,
          rating: rating,
          mpaa_rating: mpaa_rating.toString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }
    if (mpaa_rating === 'Choose..') return
    await axios.post(
      '/admin/add-movie',
      {
        title,
        description,
        release_date: release_date.split('T')[0],
        year,
        runtime,
        rating,
        mpaa_rating,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    history.replace('/movies')
  }

  const deletMovie = async (id) => {
    await axios.delete(`/admin/delete-movie/${id}`)
    history.replace('/movies')
  }

  return (
    <>
      <h2>
        Add/Edit Movie
        {movie?.id && (
          <div
            className="btn btn-danger btn-sm mx-3"
            onClick={() => deletMovie(movie?.id)}
            role="button"
          >
            Delete: {movie?.id}
          </div>
        )}
      </h2>
      <hr />
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          {errors.title && (
            <div className="alert alert-danger" role="alert">
              {errors.title?.message}title is a required field
            </div>
          )}

          {errors.description && (
            <div className="alert alert-danger" role="alert">
              {errors.description?.message}description is a required field
            </div>
          )}

          {errors.year && (
            <div className="alert alert-danger" role="alert">
              year must be a `number` type, but the final value was: `NaN` (cast
              from the value `""`).
            </div>
          )}
          {errors.release_date && (
            <div className="alert alert-danger" role="alert">
              release_date must be a `date` type, but the final value was:
              `Invalid Date` (cast from the value `""`).
            </div>
          )}
          {errors.runtime && (
            <div className="alert alert-danger" role="alert">
              runtime must be a `number` type, but the final value was: `NaN`
              (cast from the value `""`).
            </div>
          )}
          {errors.rating && (
            <div className="alert alert-danger" role="alert">
              rating must be a `number` type, but the final value was: `NaN`
              (cast from the value `""`).
            </div>
          )}
          {errors.mpaa_rating === 'Choose..' && (
            <div className="alert alert-danger" role="alert">
              {errors.mpaa_rating?.message}
            </div>
          )}

          <label className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors?.title && 'is-invalid'}`}
            id="title"
            name="title"
            {...register('title', { required: isCheckRequire })}
            defaultValue={movie?.title}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            className={`form-control ${errors?.description && 'is-invalid'}`}
            id="description"
            name="description"
            {...register('description', { required: isCheckRequire })}
            row="3"
            defaultValue={movie?.description}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            className={`form-control ${errors?.year && 'is-invalid'}`}
            id="year"
            name="year"
            {...register('year', { required: isCheckRequire })}
            defaultValue={movie?.year}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            className={`form-control ${errors?.release_date && 'is-invalid'}`}
            id="release_date"
            name="release_date"
            {...register('release_date', { required: isCheckRequire })}
            defaultValue={releaseDate}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Runtime</label>
          <input
            type="number"
            className={`form-control ${errors?.runtime && 'is-invalid'}`}
            id="runtime"
            name="runtime"
            {...register('runtime', { required: isCheckRequire })}
            defaultValue={movie?.runtime}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className={`form-control ${errors?.rating && 'is-invalid'}`}
            id="rating"
            name="rating"
            {...register('rating', { required: isCheckRequire })}
            defaultValue={movie?.rating}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mpaa Rating</label>
          <select
            type="text"
            className={`form-select ${errors?.mpaa_rating && 'is-invalid'}`}
            id="mpaa_rating"
            name="mpaa_rating"
            {...register('mpaa_rating', { required: isCheckRequire })}
          >
            <option className="form-select">
              {movie?.mpaa_rating ?? 'Choose..'}
            </option>
            <option className="form-select" value="G">
              G
            </option>
            <option className="form-select" value="PG">
              PG
            </option>
            <option className="form-select" value="PG14">
              PG14
            </option>
            <option className="form-select" value="R">
              R
            </option>
            <option className="form-select" value="NC17">
              NC17
            </option>
          </select>
        </div>
        <hr />

        <button className="btn btn-primary" type="submit">
          save
        </button>
      </form>
    </>
  )
}
