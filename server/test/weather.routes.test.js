jest.spyOn(global.console, "log").mockImplementation(() => {});

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/lib/providers/openmeteo", () => ({
  getCurrentWeather: jest.fn(() => ({
    city: "Berlin",
    country: "Germany",
    coords: {
      lat: 52.52437,
      lon: 13.41053,
    },
    temp: 5.7,
    feelsLike: 5.7,
    condition: "Cloudy",
    windKph: 18.5,
    humidity: 70,
    sunrise: "07:00",
    sunset: "16:30",
    icon: "cloud",
  })),
}));

describe("/api/weather", () => {
  //  Happy path
  it("returns weather data for a valid city", async () => {
    const res = await request(app).get("/api/weather?city=Berlin");

    expect(res.statusCode).toBe(200);
    expect(res.body.city).toBeDefined();
    expect(typeof res.body.temp).toBe("number");
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
