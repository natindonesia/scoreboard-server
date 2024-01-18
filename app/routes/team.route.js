module.exports = (app) => {
  const awayTeam = require("../controllers/team.controller");
  const r = require("express").Router();

  r.get("/", awayTeam.findAll);
  r.get("/:id", awayTeam.show);
  r.post("/", awayTeam.create);
  r.put("/:id", awayTeam.update);
  r.delete("/:id", awayTeam.delete);

  app.use("/team", r);
};
