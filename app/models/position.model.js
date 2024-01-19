// models/positionModel.js
const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: String,
});

const Position = mongoose.model("Position", positionSchema);

module.exports = Position;
