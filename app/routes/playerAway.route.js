module.exports = (app) => {
  const playerAway = require("../controllers/playerAway.controller");
  const r = require("express").Router();

  r.get("/", playerAway.findAll);
  r.get("/:id", playerAway.show);
  r.post("/", playerAway.create);
  r.put("/:id", playerAway.update);
  r.delete("/:id", playerAway.delete);

  app.use("/playerAway", r);
};
