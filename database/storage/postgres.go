package storage

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

//configuration to establish db connection
type Config struct {
	Host string
	Port string
	Password string
	User string
	DBName string
	SSLMode string
}

func NewConnection(config *Config) (*gorm.DB, error ) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", 
	config.Host, config.Port, config.User, config.Password, config.DBName, config.SSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{}) //opening new gorm db with the postgresql driver

	//error checking
	if err != nil {
		return db, err
	}
	
	return db, nil

}