module.exports = (app) => {
  const awayTeam = require("../controllers/awayTeam.controller");
  const r = require("express").Router();

  r.get("/", awayTeam.findAll);
  r.get("/:id", awayTeam.show);
  r.post("/", awayTeam.create);
  r.put("/:id", awayTeam.update);
  r.delete("/:id", awayTeam.delete);

  app.use("/awayTeam", r);
};
