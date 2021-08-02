package main

import (
	"errors"
	"fmt"
	"net/http"
	"sing3demons/backend/models"
	"time"

	"github.com/pascaldekloe/jwt"
	"golang.org/x/crypto/bcrypt"
)

var validUser = models.User{
	ID:       1,
	Email:    "sing@dev.com",
	Password: "$2a$12$lkQf3tYuPpNuQvQqwcQrZOermijz0trW8nhL8FJPi0VXTxXIM9n3q",
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (app *application) Signin(w http.ResponseWriter, r *http.Request) {
	var creds Credentials

	// if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
	// 	app.errorJSON(w, errors.New("unauthorized"))
	// 	return
	// }
	if err := app.Bind(r)(&creds); err != nil {
		app.errorJSON(w, errors.New("unauthorized"))
		return
	}

	hashedPassword := validUser.Password
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(creds.Password)); err != nil {
		app.errorJSON(w, errors.New("unauthorized"))
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(validUser.ID)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "sing@dev.com"
	claims.Audiences = []string{"sing@dev.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))
	if err != nil {
		app.errorJSON(w, errors.New("error signing"))
		return
	}

	app.writeJSON(w, http.StatusOK, string(jwtBytes), "token")
}
