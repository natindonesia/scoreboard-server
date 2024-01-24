const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
