package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)

	router.HandlerFunc(http.MethodGet, "/v1/genre/:id", app.getGenre)
	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getGenres)

	return app.enableCORS(router)
}
