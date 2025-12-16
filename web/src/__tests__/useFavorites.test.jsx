/* eslint-disable */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FavoritesProvider, useFavorites } from "../contexts/FavoritesContext";
import { waitFor } from "@testing-library/react";

function TestComponent() {
  const { favorites, add, remove } = useFavorites();

  return (
    <div>
      <ul>
        {favorites.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
      <button onClick={() => add("Berlin")}>Add Berlin</button>
      <button onClick={() => remove("Berlin")}>Remove Berlin</button>
    </div>
  );
}

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  Storage.prototype.setItem = jest.fn();
});

test("useFavorites adds/removes cities and updates localStorage", async () => {
  render(
    <FavoritesProvider>
      <TestComponent />
    </FavoritesProvider>
  );

  const addBtn = screen.getByText("Add Berlin");
  const removeBtn = screen.getByText("Remove Berlin");

  expect(screen.queryByText("Berlin")).not.toBeInTheDocument();

  userEvent.click(addBtn);
  const berlinElement = await screen.findByText("berlin");
  expect(berlinElement).toBeInTheDocument();
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "weather:favorites",
    JSON.stringify(["berlin"])
  );

  userEvent.click(removeBtn);

  await waitFor(() => {
    expect(screen.queryByText("berlin")).not.toBeInTheDocument();
  });
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "weather:favorites",
    JSON.stringify([])
  );
});
