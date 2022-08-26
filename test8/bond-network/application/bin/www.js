"use strict";
const app = require("../app");

const PORT = process.env.PORT || 8000;
const HOST = "0.0.0.0";

app.listen(HOST, PORT, () => {
  console.log("Server started on Port 8000");
  console.log(`Running on http://${HOST}:${PORT}`);
});
