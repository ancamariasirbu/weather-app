const app = require("./app");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../web/dist");

  if (!fs.existsSync(distPath)) {
    console.error(" Frontend build not found at:", distPath);
    process.exit(1);
  }

  app.use(require("express").static(distPath));

  app.get("/.*/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
