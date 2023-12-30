package bootstrap

import (
	"log"
	"os"

	"github.com/umayangi12/abc_pharmacy/database/storage"
	"github.com/umayangi12/abc_pharmacy/repository"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/umayangi12/abc_pharmacy/database/migrations"
)

func InitializeApp(app *fiber.App) {
	_, ok := os.LookupEnv("APP_ENV")

	if !ok {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal(err)
		}
	}
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASSWORD"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("Could not load the database")
	}

	err = migrations.MigrateItems(db)

	if err != nil {
		log.Fatal("Could not migrate db")
	}

	repo := repository.Repository{
		DB: db,
	}
	app.Use(cors.New(cors.Config{AllowCredentials: true}))
	repo.SetUpRoutes(app)
	app.Listen(":8081")
}