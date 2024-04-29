const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");

router.get("/v1/image", imageController.getData);
router.post("/v1/image", imageController.createItem);
router.post("/v1/image", imageController.createImage);
router.post("/v2/image", imageController.createImageMysql);
router.get("/v2/image", imageController.getImage);
router.get("/v2/image/:id", imageController.getImageId);
module.exports = router;
