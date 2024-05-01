const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const connect = require("./helpers/mongodb");
const db = require("./models");
const port = process.env.PORT || 3001;
//
const image = require("./router/imageRouter");
const runningTournament = require("./router/runningTournamentRouter");

// connect();

//api
app.use("/api", image);
app.use("/api", runningTournament);
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server running on the: http://localhost:${port}`);
  });
});
