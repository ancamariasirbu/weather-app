jest.spyOn(global.console, "log").mockImplementation(() => {});

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/lib/providers/openWeather", () => ({
  getCurrentWeather: jest.fn(() => ({
    weather: [{ id: 803, main: "Clouds", description: "broken clouds" }],
    main: { temp: 5.7, feels_like: 4.2, humidity: 80 },
    wind: { speed: 5 }, // m/s
    sys: { country: "DE", sunrise: 1700000000, sunset: 1700030000 },
    timezone: 3600,
    name: "Berlin",
  })),
  getCoordinates: jest.fn(() => [
    { name: "Berlin", country: "DE", lat: 52.52437, lon: 13.41053 },
  ]),
}));

describe("/api/weather", () => {
  //  Happy path
  it("returns weather data for a valid city", async () => {
    const res = await request(app).get("/api/weather?city=Berlin");

    expect(res.statusCode).toBe(200);
    expect(res.body.city).toBe("Berlin");
    expect(res.body.country).toBe("Germany"); // DE -> full name
    expect(res.body.temp).toBe(5.7);
    expect(res.body.feelsLike).toBe(4.2);
    expect(res.body.humidity).toBe(80);
    expect(res.body.windKph).toBe(18); // 5 m/s -> 18 km/h
    expect(res.body.condition).toBe("Cloudy"); // id 803
    expect(res.body.sunrise).toMatch(/^\d{2}:\d{2}$/);
  });

  //  Error path
  it("returns 400 if no city is provided", async () => {
    const res = await request(app).get("/api/weather"); // no city param

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.message).toBeDefined();
  });

  // Error path - invalid city
  const invalidCities = ["123", "!@#$", "Berlin123"];
  invalidCities.forEach((city) => {
    it(`returns 400 for invalid city: ${city}`, async () => {
      const res = await request(app).get(`/api/weather?city=${city}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
      expect(res.body.error.message).toMatch("city is invalid");
    });
  });
});
