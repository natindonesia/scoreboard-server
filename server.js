const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const corsOptions = {
  origin: "*",
};

// Create an Express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

// Create an HTTP server using the Express app
const server = http.createServer(app);

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

// Include existing routes
require("./app/routes/mahasiswa.routes")(app);
require("./app/routes/coach.route")(app);
require("./app/routes/player.route")(app)
require("./app/routes/homeTeam.route")(app);
require("./app/routes/awayTeam.route")(app);
require("./app/routes/team.route")(app);
require("./app/routes/score.route")(app);
require("./app/routes/playerHome.route")(app);
require("./app/routes/playerAway.route")(app);
require("./app/routes/formation.route")(app);

const pictureRoutes = require("./app/routes/picture.route");
app.use("/pictures", pictureRoutes);

const IP_ADDRESS = process.env.IP || "localhost";
const PORT = process.env.PORT || 8000;
server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server running on http://${IP_ADDRESS}:${PORT}`);
});
