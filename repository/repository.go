package repository

//gorm simplifies database interaction
import (
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}
