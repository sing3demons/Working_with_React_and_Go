package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodPost, "/v1/signin", app.Signin)

	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodGet, "/v1/movies/:genre_id", app.getAllMoviesByGenre)

	router.HandlerFunc(http.MethodGet, "/v1/genre/:id", app.getGenre)
	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getGenres)

	router.HandlerFunc(http.MethodPost, "/v1/admin/add-movie", app.insertMovie)
	router.HandlerFunc(http.MethodPut, "/v1/admin/edit-movie/:id", app.updateMovie)
	router.HandlerFunc(http.MethodDelete, "/v1/admin/delete-movie/:id", app.deleteMovie)

	return app.enableCORS(router)
}
