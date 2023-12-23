const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Time for some red cabbage!");
});

app.listen(port, () => {
  console.log(`This server listens on port ${port}`);
});
