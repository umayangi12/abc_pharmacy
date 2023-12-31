package models

//establish connection
type Invoice struct {
	Iname string `json : "iname" validate:"required,min=3, max=48"`
	mobile string `json : "mobile" validate:"required,min=3, max=48"`
	Email string `json : "email" validate:"required,min=3, max=48"`
	Address string `json : "address" validate:"required,min=3, max=48"`
	Billing string `json : "billing" validate:"required,min=3, max=48"`
}