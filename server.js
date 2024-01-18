// ... (other imports)

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const jwtMiddleware = require("./app/middlewares/jsMiddleware");
const db = require("./app/models");
const matchRoutes = require("./app/routes/homeTeam.route");

const corsOptions = {
  origin: "*",
};

// Create an Express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.IO instance attached to the server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Store the stopwatch state
let stopwatchState = {
  running: false,
  initialTime: null,
};

// Connect to the database
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect("mongodb://localhost:27017/express_api", mongooseConfig)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(`Failed to connect to the database: ${err.message}`);
    process.exit();
  });

// Include your existing routes here
require("./app/routes/mahasiswa.routes")(app);
require("./app/routes/homeTeam.route")(app);
require("./app/routes/awayTeam.route")(app);
require("./app/routes/team.route")(app);
require("./app/routes/score.route")(app);
require("./app/routes/playerHome.route")(app);
require("./app/routes/playerAway.route")(app);
app.use("/auth", require("./app/routes/auth.route"));
app.use("/protected", jwtMiddleware);

// Define the stopwatch state schema
const stopwatchStateSchema = new mongoose.Schema({
  running: Boolean,
  initialTime: Date,
});

// Create the StopwatchState model
const StopwatchState = mongoose.model("StopwatchState", stopwatchStateSchema);

// Load the stopwatch state from the database on server startup
StopwatchState.findOne({})
  .exec()
  .then((data) => {
    if (data) {
      stopwatchState = data;
    }
  })
  .catch((err) => {
    console.error("Error loading stopwatch state:", err);
  });

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send the current stopwatch state to the newly connected client
  io.to(socket.id).emit("initialState", stopwatchState);

  // Handle start event
  socket.on("start", () => {
    stopwatchState = {
      running: true,
      initialTime: stopwatchState.initialTime || Date.now(),
    };
    io.emit("start", stopwatchState);

    // Save the updated stopwatch state to the database
    StopwatchState.findOneAndUpdate({}, stopwatchState, { upsert: true })
      .exec()
      .then(() => {
        console.log("Stopwatch state updated successfully");
      })
      .catch((err) => {
        console.error("Error updating stopwatch state:", err);
      });
  });

  // Handle stop event
  socket.on("stop", () => {
    stopwatchState = {
      running: false,
      initialTime: stopwatchState.running
        ? Date.now()
        : stopwatchState.initialTime,
    };
    io.emit("stop", stopwatchState);

    // Save the updated stopwatch state to the database
    StopwatchState.findOneAndUpdate({}, stopwatchState, { upsert: true })
      .exec()
      .then(() => {
        console.log("Stopwatch state updated successfully");
      })
      .catch((err) => {
        console.error("Error updating stopwatch state:", err);
      });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
