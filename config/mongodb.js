const mongoose = require("mongoose");
require("dotenv").require;
async function connect() {
  try {
    mongoose.connect(process.env.DATABASE);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = connect;
