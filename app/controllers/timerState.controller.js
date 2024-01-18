// app/controllers/timerState.controller.js
const TimerState = require("../models/timerState.model");

// Controller function to get the current timer state
const getTimerState = async (req, res) => {
  try {
    const timerState = await TimerState.findOne({});
    res.json(timerState);
  } catch (error) {
    console.error("Error fetching timer state:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTimerState };
