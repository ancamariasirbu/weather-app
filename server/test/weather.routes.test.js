jest.spyOn(global.console, "log").mockImplementation(() => {});

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/lib/providers/openMeteo", () => ({
  getCurrentWeather: jest.fn(() => ({
    current_weather: {
      temperature: 5.7,
      windspeed: 18.5,
      weathercode: 3,
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
