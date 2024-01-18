const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Your other imports and middleware...

// Middleware for JWT authentication
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

// Logout route
router.post("/logout", authenticateToken, (req, res) => {
  // Perform any additional cleanup, e.g., invalidate the token on the server side
  // Clearing tokens on the client side is typically done by removing the token from storage

  res.json({ message: "Logout successful" });
});

module.exports = router;
