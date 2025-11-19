# Weather App

A simple full-stack weather app with an Express backend and a Vite + React frontend.

### Structure

- `server/` – backend API (Node/Express)
- `web/` – frontend (React)

## Prerequisites

- Node.js ≥ 18 → `node -v`
- npm ≥ 9 → `npm -v`
- Git

---

## Install dependencies

From the project root:

```bash
npm install --prefix server
npm install --prefix web
```

## Run the app

- Option A - recommended (both together)

From the project root (weather-app/):

```bash
npm run dev
```

This starts:

Backend → http://localhost:4000

Frontend → http://localhost:5173

Both run in one terminal using concurrently, and restart automatically on file changes.

- Option B — Run separately

Terminal 1

`cd server && npm run dev` # → http://localhost:4000

Terminal 2

`cd web && npm run dev` # → http://localhost:5173

## API Configuration using Vite (not CRA)

You can configure the backend API in one of two ways:

- Option 1 — Environment variable

Add a `.env` file in `/web` with:

`VITE_API_URL=http://localhost:4000`

Then restart your dev server.

In the code:

```
const BASE_URL = import.meta.env.VITE_API_URL || '';
fetch(`${BASE_URL}/api/hello`);
```

- Option 2 — Vite proxy

Edit `vite.config.js`:

```
export default {
server: {
proxy: { '/api': 'http://localhost:4000' },
},
};
```

Then just call:

`fetch('/api/hello');`

Both options let you switch between environments easily.

## Quick check

curl http://localhost:4000/api/health # → {"ok":true}

curl http://localhost:4000/api/hello # → {"message":"Hello from server"}

## Troubleshooting

- Port already in use: close other processes or change PORT in server/.env.

- CORS error: you likely mixed proxy and absolute URLs; pick one approach and be consistent.

- 404 on /api/hello: confirm the route exists and server is running on 4000.

- Env not applied: restart Vite after editing .env

## Next steps

- API: Wire `/api/weather` and `/api/forecast` (mock → real provider).
- UI: Add React Router routes and a simple “Hello from server” fetch on Home.

# API Contract

## Environment Variables

- `WEATHER_PROVIDER` = `openmeteo`
- `WEATHER_API_KEY` = no key required (leave empty)

## Endpoints

### 1. Get Current Weather

`GET /api/weather?city=Berlin`

**Query parameters:**

- `city` (optional, default: "Berlin")

**Response schema:**

```json
{
  "city": "Berlin",
  "country": "DE",
  "coords": { "lat": 52.52, "lon": 13.405 },
  "temp": 15.8,
  "feelsLike": 15.8,
  "condition": "Cloudy",
  "windKph": 11.5,
  "humidity": 70,
  "sunrise": "07:00",
  "sunset": "16:30",
  "icon": "cloud"
}
```

**Units:**

- Temperature: °C

- Wind: km/h

- Humidity: %

- Time: 24h local

### 2. Get Forecast

`GET /api/forecast?city=Berlin`

**Query parameters:**

`city` (optional, default: "Berlin")

**Response schema:**

```json
{
  "city": "Berlin",
  "daily": [
    {
      "date": "2025-11-03",
      "min": 4.2,
      "max": 9.5,
      "condition": "Cloudy",
      "icon": "cloud"
    },
    {
      "date": "2025-11-04",
      "min": 3.8,
      "max": 8.7,
      "condition": "Rain",
      "icon": "rain"
    }
  ]
}
```

**Units:**

- Temperature: °C

- Date: ISO format YYYY-MM-DD

- Condition icons: semantic tokens (cloud, sun, rain)

### Example cURL Requests:

```json
curl http://localhost:4000/api/weather?city=Berlin
curl http://localhost:4000/api/forecast?city=Berlin
```

## Common Errors

### **400 – BAD_REQUEST**

Returned when:

- `city` contains invalid characters
- `city` query param missing (if you enforce it)
- validation regex fails

Example:

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid city name"
  }
}
```

### **404 – CITY_NOT_FOUND**

Returned when the `city` is not in your static resolver:

```json
{
  "error": {
    "code": "CITY_NOT_FOUND",
    "message": "City 'Gotham' is not supported"
  }
}
```

### **429 – TOO_MANY_REQUESTS**

Returned when the per-IP limit is exceeded:

```json
{
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Too many requests, please try again later"
  }
}
```

### Caching

This API uses in-memory caching with [node-cache](https://www.npmjs.com/package/node-cache)  
to store successful `/api/weather` and `/api/forecast` responses for ~10 minutes.

### Logging

All requests are logged automatically in the terminal when running `npm run dev`. Each log line shows:

- HTTP method (GET, POST, etc.)
- Request path
- Response status code
- Duration in milliseconds
- Cache info (`cache:hit` or `cache:miss`) if applicable

Example:

```bash
GET /api/weather?city=Berlin 200 42ms cache:miss
GET /api/weather?city=Berlin 200 3ms cache:hit
GET /api/forecast?city=Berlin 200 58ms cache:miss
```

Logs are disabled when `NODE_ENV=test`.
