# Structure

- `server/` – backend API (Node/Express)
- `web/` – frontend (React)

# API Configuration (Vite)

You can configure the backend API in one of two ways:

## Option 1 — Environment variable

Add a `.env` file in `/web` with:

VITE_API_URL=http://localhost:4000

Then restart your dev server.

In the code:

const BASE_URL = import.meta.env.VITE_API_URL || '';
fetch(`${BASE_URL}/api/hello`);

## Option 2 — Vite proxy

Edit `vite.config.js`:

export default {
server: {
proxy: { '/api': 'http://localhost:4000' },
},
};

Then just call:

fetch('/api/hello');

Both options let you switch between environments easily.

# Start Frontend & Backend at the same time

From the project root (weather-app/), run:

`npm run dev`

This command uses concurrently to start:

the Express backend on http://localhost:4000
the Vite React frontend on http://localhost:5173

Both run in the same terminal window and reload automatically when files change (nodemon for the backend, Vite hot reload for the frontend).
