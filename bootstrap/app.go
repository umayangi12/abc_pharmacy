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

//initialize the web app
func InitializeApp(app *fiber.App) {
	_, ok := os.LookupEnv("APP_ENV") //check the app_env is set

	if !ok {
		err := godotenv.Load(".env") //load environment variables
		if err != nil {
			log.Fatal(err)
		}
	}

	//create configuration for the db using environment variables
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASSWORD"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	//establish db connection
	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("Could not load the database")
	}

	//perform db migration
	err = migrations.MigrateItems(db)
	err = migrations.MigrateInvoices(db)

	if err != nil {
		log.Fatal("Could not migrate db")
	}

	//create repo using established db connection
	repo := repository.Repository{
		DB: db,
	}
	
	//handdle cross-origin req
	app.Use(cors.New(cors.Config{AllowCredentials: true}))

	//det up routes
	repo.SetUpRoutes(app)

	//start application
	app.Listen(":8081")
}