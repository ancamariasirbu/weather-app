/* eslint-disable */

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar/SearchBar";

describe("SearchBar", () => {
  test("calls onSearch only on submit with trimmed city name", async () => {
    const onSearchMock = jest.fn();

    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText("Search city…");
    const button = screen.getByRole("button", { name: /icon/i });

    await userEvent.type(input, "  Berlin  ");
    expect(onSearchMock).not.toHaveBeenCalled(); // onSearch should NOT be called while typing

    await userEvent.click(button);
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("Berlin"); // trimmed input

    // Optional: test Enter key submission
    input.value = ""; // reset
    await userEvent.type(input, "  Paris  {enter}"); // type and press Enter
    expect(onSearchMock).toHaveBeenCalledWith("Paris"); // again trimmed
  });
});
