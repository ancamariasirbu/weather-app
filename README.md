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
