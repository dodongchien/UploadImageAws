const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");

router.get("/image/v1", imageController.getData);
router.post("/image/v1", imageController.createItem);
router.post("/image/v2", imageController.createImage);
module.exports = router;
