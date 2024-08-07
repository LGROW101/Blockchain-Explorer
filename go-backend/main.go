package main

import (
	"github.com/LGROW101/Blockchain-Explorer/handler"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/coins/top", handler.GetTopCoins)

	e.Start(":8080")
}
