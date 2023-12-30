package models

//establish connection
type Item struct {
	Name string `json : "name" validate:"required,min=3, max=48"`
	Price string `json : "price" validate:"required,min=3, max=48"`
	Category string `json : "category" validate:"required,min=3, max=48"`
}