package handler

import (
	"net/http"
	"strconv"

	"github.com/LGROW101/Blockchain-Explorer/service"

	"github.com/labstack/echo/v4"
)

func GetTopCoins(c echo.Context) error {
	limitParam := c.QueryParam("limit")
	limit, err := strconv.Atoi(limitParam)
	if err != nil || limit <= 0 {
		limit = 20
	}

	topCoins, err := service.GetTopCoins(limit)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, topCoins)
}
