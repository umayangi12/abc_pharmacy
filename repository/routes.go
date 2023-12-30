package repository

import (
	"github.com/gofiber/fiber/v2"
)

func (repo *Repository) SetUpRoutes(app *fiber.App){

	//list of items
	api := app.Group("/api")

	api.Get("/items", repo.GetItems)
	api.Post("/items", repo.CreateItem)
	api.Patch("/items/:id", repo.UpdateItem)
	api.Delete("/items/:id", repo.DeleteItem)
	api.Get("/items/:id", repo.GetItemByID)
	
}