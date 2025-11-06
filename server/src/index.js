const express = require("express");
const app = express();
const PORT = 4000;

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server" });
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
