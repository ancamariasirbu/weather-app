jest.spyOn(global.console, "log").mockImplementation(() => {}); // there was an annoying console.log from dotenv during tests

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/lib/providers/openMeteo", () => ({
  getDailyForecast: jest.fn(() => ({
    daily: {
      time: ["2025-11-18"],
      temperature_2m_min: [1.1],
      temperature_2m_max: [5.9],
      weathercode: [61],
    },
  })),
  getCoordinates: jest.fn(() => ({
    results: [
      {
        name: "Berlin",
        country: "Germany",
        country_code: "DE",
        latitude: 52.52437,
        longitude: 13.41053,
      },
    ],
  })),
}));

describe("/api/forecast", () => {
  //  Happy path
  it("returns daily forecast for a valid city", async () => {
    const res = await request(app).get("/api/forecast?city=Berlin");

    expect(res.statusCode).toBe(200);
    expect(res.body.city).toBeDefined();
    expect(Array.isArray(res.body.daily)).toBe(true);
    expect(res.body.daily.length).toBeGreaterThan(0);
  });
  //  Error path
  it("returns 400 if no city is provided", async () => {
    const res = await request(app).get("/api/forecast"); // no city param

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.message).toBeDefined();
  });

  // Error path - invalid city
  const invalidCities = ["123", "!@#$", "Berlin123"];
  invalidCities.forEach((city) => {
    it(`returns 400 for invalid city: ${city}`, async () => {
      const res = await request(app).get(`/api/forecast?city=${city}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.message).toMatch("city is invalid");
    });
  });
});
