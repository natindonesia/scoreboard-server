// routes/positions.js
const express = require("express");
const router = express.Router();
const Position = require("../models/positionModel");

// Endpoint to save positions to the database
router.post("/positions", async (req, res) => {
  try {
    const positions = [
      "GK",
      "DL",
      "DC",
      // ... add other positions
      "Coach",
    ];

    const savedPositions = await Position.create(
      positions.map((name) => ({ name }))
    );

    res.status(201).json(savedPositions);
  } catch (error) {
    console.error("Error saving positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
