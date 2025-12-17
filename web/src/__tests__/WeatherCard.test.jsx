/* eslint-disable */

import { render, screen } from "@testing-library/react";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { FavoritesProvider } from "../contexts/FavoritesContext";

test("renders city, temperature, and condition", () => {
  render(
    <FavoritesProvider>
      <WeatherCard
        city="London"
        country="UK"
        temp={15}
        condition="Sunny"
        icon="☀️"
        feelsLike={14}
        windKph={10}
        humidity={60}
      />
    </FavoritesProvider>
  );

  expect(screen.getByText(/London/)).toBeInTheDocument();
  expect(screen.getByText(/15/)).toBeInTheDocument();
  expect(screen.getByText(/Sunny/)).toBeInTheDocument();
});
