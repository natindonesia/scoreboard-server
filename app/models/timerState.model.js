// app/models/timerState.model.js
const mongoose = require("mongoose");

const timerStateSchema = new mongoose.Schema({
  totalSeconds: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
});

const TimerState = mongoose.model("TimerState", timerStateSchema);

module.exports = TimerState;
