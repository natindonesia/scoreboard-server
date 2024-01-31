const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const router = express.Router();

// Function to generate a new access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username },
    "your-secret-key",
    { expiresIn: "15m" }
  );
};

// Function to generate a new refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username },
    "refresh-secret-key",
    { expiresIn: "7d" }
  );
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  jwt.verify(refreshToken, "refresh-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
});

module.exports = router;
