package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/umayangi12/abc_pharmacy/bootstrap"
	"github.com/umayangi12/abc_pharmacy/repository"
)

type Repository repository.Repository

func main () {
	app := fiber.New()
	bootstrap.InitializeApp(app)
}