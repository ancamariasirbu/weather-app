jest.spyOn(global.console, "log").mockImplementation(() => {}); // there was an annoying console.log from dotenv during tests

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/lib/providers/openWeather", () => ({
  getDailyForecast: jest.fn(() => ({
    city: { name: "Berlin", timezone: 3600 },
    list: [
      {
        dt: 1700000000,
        dt_txt: "2023-11-14 21:00:00",
        main: { temp_min: 1.1, temp_max: 5.9 },
        weather: [{ id: 500 }],
      },
      {
        dt: 1700010800,
        dt_txt: "2023-11-15 00:00:00",
        main: { temp_min: 0.4, temp_max: 6.8 },
        weather: [{ id: 800 }],
      },
    ],
  })),
  getCoordinates: jest.fn(() => [
    { name: "Berlin", country: "DE", lat: 52.52437, lon: 13.41053 },
  ]),
}));

describe("/api/forecast", () => {
  //  Happy path
  it("returns daily forecast for a valid city", async () => {
    const res = await request(app).get("/api/forecast?city=Berlin");

    expect(res.statusCode).toBe(200);
    expect(res.body.city).toBe("Berlin");
    expect(Array.isArray(res.body.daily)).toBe(true);
    expect(res.body.daily.length).toBeGreaterThan(0);

    const day = res.body.daily[0];
    expect(day.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(typeof day.min).toBe("number");
    expect(typeof day.max).toBe("number");
    expect(day.max).toBeGreaterThanOrEqual(day.min);
    expect(day.condition).toBeDefined();
    expect(day.icon).toBeDefined();
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
