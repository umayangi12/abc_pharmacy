package repository

import (
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"github.com/umayangi12/abc_pharmacy/database/migrations"
	"github.com/umayangi12/abc_pharmacy/database/models"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
)

type InvoiceErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var invoiceValidate = validator.New()

func ValidateInvoiceStruct(invoice models.Invoice) []*InvoiceErrorResponse {
	var errors []*InvoiceErrorResponse
	err := invoiceValidate.Struct(invoice)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element InvoiceErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	return errors

}

func (r *Repository) GetInvoices(context *fiber.Ctx) error {
	db := r.DB
	model := db.Model(&migrations.Invoices{})

	pg := paginate.New(&paginate.Config{
		DefaultSize:        20,
		CustomParamEnabled: true,
	})

	page := pg.With(model).Request(context.Request()).Response(&[]migrations.Invoices{})

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"data": page,
	})
	return nil

}
func (r *Repository) CreateInvoice(context *fiber.Ctx) error {
	invoice := models.Invoice{}
	err := context.BodyParser(&invoice)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "Request failed!"})

		return err

	}

	errors := ValidateInvoiceStruct(invoice)

	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	if err := r.DB.Create(&invoice).Error; err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status": "error", "message": "Couldn't create invoice", "data": err})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": " Invoice has been added",
		"data":    invoice})
	return nil

}

func (r *Repository) UpdateInvoice(context *fiber.Ctx) error {
	invoice := models.Invoice{}
	err := context.BodyParser(&invoice)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{
			"message": "Request failed!"})

		return err

	}

	errors := ValidateInvoiceStruct(invoice)

	if errors != nil {
		return context.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := r.DB
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "ID cannot be empty!"})
		return nil
	}

	if db.Model(&invoice).Where("id = ?", id).Updates(&invoice).RowsAffected == 0 {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Could not get Invoice!"})
		return nil
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Invoice Updated successfully!"})
	return nil

}

func (r *Repository) DeleteInvoice(context *fiber.Ctx) error {
	invoiceModel := migrations.Invoices{}
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "ID cannot be empty!"})
		return nil
	}

	err := r.DB.Delete(invoiceModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Could not delete the invoice"})
		return err.Error
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Invoice Deleted successfully!"})
	return nil

}

func (r *Repository) GetInvoiceByID(context *fiber.Ctx) error {
	invoiceModel := &migrations.Invoices{}
	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "ID cannot be empty!"})
		return nil
	}

	err := r.DB.Where("id = ?", id).First(invoiceModel).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Could not get the invoice"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "Invoice fetched successfully!",
	"data" : invoiceModel})
	return nil
}
