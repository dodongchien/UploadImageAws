const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  images: [{ type: String }],
});

module.exports = mongoose.model("Image", imageSchema);
