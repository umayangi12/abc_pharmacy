package migrations
import (
	"gorm.io/gorm"
)

type Items struct {
	ID uint `gorm:"primary key;autoIncrement" json: "id"`
	Name string `json : "name"`
	Price string `json : "price"`
	Category string `json : "category"`
}


func MigrateItems(db *gorm.DB) error {
	err := db.AutoMigrate(&Items{})
	return err

}