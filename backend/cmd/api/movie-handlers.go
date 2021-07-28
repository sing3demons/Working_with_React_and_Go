package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"sing3demons/backend/models"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	movie, err := app.models.DB.Get(id)

	err = app.writeJSON(w, http.StatusOK, movie, "movie")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}

}

func (app *application) getGenre(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}
	app.logger.Print(id)
	genre, err := app.models.DB.Genre(id)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	err = app.writeJSON(w, http.StatusOK, genre, "genre")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := app.models.DB.GenresAll()
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	err = app.writeJSON(w, http.StatusOK, genres, "genres")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllMoviesByGenre(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	genreID, err := strconv.Atoi(params.ByName("genre_id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	movies, err := app.models.DB.All(genreID)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	app.writeJSON(w, http.StatusOK, movies, "movies")
}

func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {}

type createMovie struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Year        string `json:"year"`
	ReleaseDate string `json:"release_date"`
	Runtime     string `json:"runtime"`
	Rating      string `json:"rating"`
	MPAARating  string `json:"mpaa_rating"`
}

func (app *application) insertMovie(w http.ResponseWriter, r *http.Request) {
	var form createMovie
	json.NewDecoder(r.Body).Decode(&form)
	newDate, _ := time.Parse("2006-01-02", form.ReleaseDate)

	var movie models.Movie

	app.logger.Println(form)

	// movie.ID, _ = strconv.Atoi(form.ID)
	movie.Title = form.Title
	movie.Description = form.Description
	movie.Year, _ = strconv.Atoi(form.Year)
	movie.ReleaseDate = newDate
	movie.Runtime, _ = strconv.Atoi(form.Runtime)
	movie.Rating, _ = strconv.Atoi(form.Rating)
	movie.MPAARating = form.MPAARating
	movie.CreatedAt = time.Now()
	movie.UpdatedAt = time.Now()

	result, err := app.models.DB.InsertMovie(movie)
	if err != nil {
		app.logger.Println(err)
		app.errorJSON(w, err)
		return
	}

	app.logger.Println(result)

	w.Header().Set("Content-Type", "application/json; charset=UTF8")
	w.WriteHeader(http.StatusCreated)
}
func (app *application) updateMovie(w http.ResponseWriter, r *http.Request) {
	var form createMovie
	json.NewDecoder(r.Body).Decode(&form)

	params := httprouter.ParamsFromContext(r.Context())

	id, _ := strconv.Atoi(params.ByName("id"))
	newDate, _ := time.Parse("2006-01-02", form.ReleaseDate)

	var movie models.Movie
	movie.ID = id
	movie.Description = form.Description
	movie.Year, _ = strconv.Atoi(form.Year)
	movie.ReleaseDate = newDate
	movie.Runtime, _ = strconv.Atoi(form.Runtime)
	movie.Rating, _ = strconv.Atoi(form.Rating)
	movie.MPAARating = form.MPAARating
	movie.UpdatedAt = time.Now()

	_, err := app.models.DB.UpdateMovie(movie)
	if err != nil {
		app.logger.Println(err)
		app.errorJSON(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF8")
	w.WriteHeader(http.StatusOK)
	app.logger.Println(http.StatusOK)
}
func (app *application) searchMovie(w http.ResponseWriter, r *http.Request) {}
