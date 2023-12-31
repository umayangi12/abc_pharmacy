package migrations
import (
	"gorm.io/gorm"
)

type Invoices struct {
	ID uint `gorm:"primary key;autoIncrement" json: "id"`
	Iname string `json : "iname"`
	Email string `json : "email"`
	Address string `json : "address"`
	Billing string `json : "billing"`
}


func MigrateInvoices(db *gorm.DB) error {
	err := db.AutoMigrate(&Invoices{})
	return err

}