package main

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) wrap(next http.Handler) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		//pass httprouter.Params to request context
		ctx := context.WithValue(r.Context(), "params", ps)
		//call next middleware with new context
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func (app *application) routes() http.Handler {
	router := httprouter.New()
	secure := alice.New(app.checkToken)

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodPost, "/v1/signin", app.Signin)

	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodGet, "/v1/movies/:genre_id", app.getAllMoviesByGenre)

	router.HandlerFunc(http.MethodGet, "/v1/genre/:id", app.getGenre)
	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getGenres)

	router.DELETE("/v1/admin/delete-movie/:id", app.wrap(secure.ThenFunc(app.deleteMovie)))
	router.POST("/v1/admin/add-movie", app.wrap(secure.ThenFunc(app.insertMovie)))
	router.PUT("/v1/admin/edit-movie/:id", app.wrap(secure.ThenFunc(app.updateMovie)))

	// router.HandlerFunc(http.MethodPost, "/v1/admin/add-movie", app.insertMovie)
	// router.HandlerFunc(http.MethodPut, "/v1/admin/edit-movie/:id", app.updateMovie)
	// router.HandlerFunc(http.MethodDelete, "/v1/admin/delete-movie/:id", app.deleteMovie)

	return app.enableCORS(router)
}
