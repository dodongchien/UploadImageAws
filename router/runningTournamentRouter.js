const express = require("express");
const router = express.Router();
const runningController = require("../controller/runningTournamentController");
const upload = require("../helpers/multerConfig");

router.get("/v2/runningTournament", runningController.getRunningTournament);
router.post(
  "/v2/runningTournament",
  upload.single("images"),
  runningController.createRunningTournament
);

module.exports = router;
