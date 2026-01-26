export function getBaseUrl() {
  if (import.meta.env.PROD) {
    return ""; // same-origin in production
  }
  return "http://localhost:4000"; // backend in dev
}
