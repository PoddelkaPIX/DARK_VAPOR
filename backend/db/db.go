package db
import (
	"database/sql"
	"fmt"
)
var Dbpool *sql.DB

func Connect(cfg SettingServer) error {
	var err error
	fmt.Println(cfg.Database)
	Dbpool, err = sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", cfg.Database.DbHost, cfg.Database.DbPort, cfg.Database.DbUser, cfg.Database.DbPass, cfg.Database.DbName))
	if err != nil {
		return err
	}

	return nil
}