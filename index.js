const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const connect = require("./helpers/mongodb");
const port = process.env.PORT || 3001;
const image = require("./router/imageRouter");
connect();
app.use("/api", image);
app.listen(port, () => {
  console.log(`server running on the: http://localhost:${port}`);
});
