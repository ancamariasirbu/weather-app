jest.spyOn(global.console, "log").mockImplementation(() => {}); // there was an annoying console.log from dotenv during tests

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/lib/providers/openmeteo", () => ({
  getDailyForecast: jest.fn(() => ({
    city: "Berlin",
    daily: [
      {
        date: "2025-11-18",
        min: 1.1,
        max: 5.9,
        condition: "Rain",
        icon: "rain",
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
