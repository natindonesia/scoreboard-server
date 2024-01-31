const firebase = require("firebase/app");
require("firebase/auth");
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const jwtMiddleware = require("./app/middlewares/jsMiddleware");
const db = require("./app/models");
const matchRoutes = require("./app/routes/homeTeam.route");
const multer = require("multer");
require("dotenv").config();

// Middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

const corsOptions = {
  origin: "*",
};

// Create an Express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.IO instance attached to the server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Connect to the database
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(`${process.env.DATABASE_URL}express`, mongooseConfig)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(`Failed to connect to the database: ${err.message}`);
    process.exit();
  });

// Include your existing routes here
require("./app/routes/mahasiswa.routes")(app);
require("./app/routes/coach.route")(app);
require("./app/routes/homeTeam.route")(app);
require("./app/routes/awayTeam.route")(app);
require("./app/routes/team.route")(app);
require("./app/routes/score.route")(app);
require("./app/routes/playerHome.route")(app);
require("./app/routes/playerAway.route")(app);
app.use("/auth", require("./app/routes/auth.route"));
app.use("/protected", jwtMiddleware);
router.get("/protected/data", jwtMiddleware, (req, res) => {
  // Access the protected data using req.user
  res.json({ message: "Protected data accessed successfully", user: req.user });
});

// Routes

const pictureRoutes = require("./app/routes/picture.route");
app.use("/pictures", pictureRoutes);

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
