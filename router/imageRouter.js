const express = require("express");
const router = express.Router();
const imageController = require("../controller/imageController");
const upload = require("../helpers/multerConfig");

router.get("/v1/image", imageController.getData);
router.post(
  "/v1/image",
  upload.array("images", null),
  imageController.createItem
);
router.post("/v1/images", imageController.createImage);
router.post(
  "/v2/image",
  upload.array("images", null),
  imageController.createImageMysql
);
router.get("/v2/image", imageController.getImage);
router.get("/v2/image/:id", imageController.getImageId);
module.exports = router;
