// models/index.js
const dbConfig = require("../config/database");
const mongoose = require("mongoose");
const TimerState = require("./timerState.model")(mongoose);

module.exports = {
  mongoose,
  url: dbConfig.url,
  mahasiswa: require("./mahasiswa.model")(mongoose),
  homeTeam: require("./homeTeam.model")(mongoose),
  awayTeam: require("./awayTeam.model")(mongoose),
  team: require("./team.model")(mongoose),
  score: require("./score.model")(mongoose),
  playerHome: require("./playerHome.model")(mongoose),
  playerAway: require("./playerAway.model")(mongoose),
  coach: require("./coach.model")(mongoose),
  formation: require("./formation.model")(mongoose),
  TimerState, // Include the TimerState model
};
