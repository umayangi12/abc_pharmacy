package repository

import (
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"github.com/umayangi12/abc_pharmacy/database/migrations"
	"github.com/umayangi12/abc_pharmacy/database/models"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New() //creating validaotor instance

func ValidateStruct(item models.Item) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(item) //validate the given structure

	if err != nil {
		//iterate through the errors
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	return errors

}

func (r *Repository) GetItems(context *fiber.Ctx) error {
	db := r.DB //getting gorm db instance
	model := db.Model(&migrations.Items{}) //creating gorm model

	pg := paginate.New(&paginate.Config{ //creating pagination instance
		DefaultSize:        20, //item per page
		CustomParamEnabled: true,
	})

	//perform pagination on the model based in the req
	page := pg.With(model).Request(context.Request()).Response(&[]migrations.Items{})

	//sending paginated data as a JSON response
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"data": page,
	})
	return nil

}
func (r *Repository) CreateItem(context *fiber.Ctx) error {
	item := models.Item{} //initiating a empty item structure
	err := context.BodyParser(&item) //parse the request body 

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "Request failed!"})

		return err

	}

	//validate the item
	errors := ValidateStruct(item)

	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	//create a new item in the db
	if err := r.DB.Create(&item).Error; err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{ //error validatio
			"status": "error", "message": "Couldn't create item", "data": err})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{ //success response
		"message": " Item has been added",
		"data":    item})
	return nil

}

func (r *Repository) UpdateItem(context *fiber.Ctx) error {
	item := models.Item{}
	err := context.BodyParser(&item)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "Request failed!"})

		return err

	}

	errors := ValidateStruct(item)

	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := r.DB
	id := context.Params("id") //obtain the id

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "ID cannot be empty!"})
		return nil
	}

	if db.Model(&item).Where("id = ?", id).Updates(&item).RowsAffected == 0 {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Could not get Item!"})
		return nil
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Item Updated successfully!"})
	return nil

}

func (r *Repository) DeleteItem(context *fiber.Ctx) error {
	itemModel := migrations.Items{}
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "ID cannot be empty!"})
		return nil
	}

	err := r.DB.Delete(itemModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Could not delete the item"})
		return err.Error
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Item Deleted successfully!"})
	return nil

}

func (r *Repository) GetItemByID(context *fiber.Ctx) error {
	itemModel := &migrations.Items{}
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "ID cannot be empty!"})
		return nil
	}

	err := r.DB.Where("id = ?", id).First(itemModel).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Could not get the item"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Item fetched successfully!",
	"data" : itemModel})
	return nil
}
