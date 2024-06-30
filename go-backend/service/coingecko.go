package service

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const (
	coingeckoAPIURL = "https://api.coingecko.com/api/v3"
)

type CoinGeckoResponse struct {
	ID           string  `json:"id"`
	Symbol       string  `json:"symbol"`
	Name         string  `json:"name"`
	CurrentPrice float64 `json:"current_price"`
	PriceChange  float64 `json:"price_change_percentage_24h"`
	Image        string  `json:"image"`
}

type CoinData struct {
	Name         string  `json:"name"`
	Symbol       string  `json:"symbol"`
	CurrentPrice float64 `json:"current_price"`
	Change24h    float64 `json:"change_24h"`
	Status       string  `json:"status"`
	Image        string  `json:"image"`
}

func GetTopCoins(limit int) ([]CoinData, error) {
	url := fmt.Sprintf("%s/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=%d&page=1", coingeckoAPIURL, limit)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("error: status code %d", resp.StatusCode)
	}

	var result []CoinGeckoResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	var topCoins []CoinData
	for _, coin := range result {
		status := "up"
		if coin.PriceChange < 0 {
			status = "down"
		}
		topCoins = append(topCoins, CoinData{
			Name:         coin.Name,
			Symbol:       coin.Symbol,
			CurrentPrice: coin.CurrentPrice,
			Change24h:    coin.PriceChange,
			Status:       status,
			Image:        coin.Image,
		})
	}

	return topCoins, nil
}
