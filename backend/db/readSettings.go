package db

import (
	"encoding/json"
	"fmt"
	"os"
	_ "github.com/lib/pq"
)

type SettingServer struct {
	Host                      string
	Port                      string
	SecretWordForOrganisation string
	Database                  SettingDatabase
}

type SettingDatabase struct {
	DbHost string
	DbPort string
	DbUser string
	DbPass string
	DbName string
}

func Load(filePath string) (setting *SettingServer) {
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Файл не открылся!")
		return nil
	}
	defer file.Close()
	decoder := json.NewDecoder(file)
	e := decoder.Decode(&setting)
	if e != nil {
		fmt.Println("Не удалось декодировать файл конфигурации!")
		return nil
	}
	return setting
}