const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Bearer token missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  jwt.verify(
    token,
    "your-secret-key",
    { algorithms: ["HS256"] },
    (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid token", error: err.message });
      }

      req.user = user;
      next();
    }
  );
}

module.exports = authenticateToken;
