const app = require("./app");
const PORT = process.env.PORT || 4000;
const express = require("express");

const path = require("path");
const fs = require("fs");

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../web/dist");

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get(/.*/, (req, res, next) => {
      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) next(err);
      });
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
