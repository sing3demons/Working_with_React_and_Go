import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
export default function FormInput({ movie, releaseDate, onClick }) {
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({
    title,
    description,
    year,
    release_date,
    runtime,
    rating,
    mpaa_rating,
  }) => {
    if (onClick === 'Edit') {
      if (title === '') title = movie.title
      if (description === '') description = movie.description
      if (year === '') year = movie.year
      if (release_date === '') release_date = movie.release_date
      if (runtime === '') runtime = movie.runtime
      if (rating === '') rating = movie.rating
      if (mpaa_rating === 'Choose..') mpaa_rating = movie.mpaa_rating

      console.log(rating)

      return await axios.put('/admin/edit-movie', {
        title: title,
        description: description,
        year: year,
        release_date: release_date,
        runtime: runtime.toString(),
        rating: rating.toString(),
        mpaa_rating: mpaa_rating.toString(),
      })
    }

    await axios.post('/admin/add-movie', {
      title: title,
      description: description,
      year: year,
      release_date: release_date,
      runtime: runtime,
      rating: rating,
      mpaa_rating: mpaa_rating,
    })
  }
  return (
    <>
      <h2>Add/Edit Movie</h2>
      <hr />
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            {...register('title', { required: false })}
            defaultValue={movie?.title}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            defaultValue={movie?.description}
            {...register('description')}
            row="3"
          >
            {movie?.description}
          </textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            id="year"
            name="year"
            {...register('year')}
            defaultValue={movie?.year}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
            {...register('release_date')}
            defaultValue={releaseDate}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Runtime</label>
          <input
            type="number"
            className="form-control"
            id="runtime"
            name="runtime"
            {...register('runtime')}
            defaultValue={movie?.runtime}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            name="rating"
            {...register('rating')}
            defaultValue={movie?.rating}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mpaa Rating</label>
          <select
            type="text"
            className="form-select"
            id="mpaa_rating"
            name="mpaa_rating"
            {...register('mpaa_rating')}
            // defaultValue={movie?.mpaa_rating}
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
