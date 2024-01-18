module.exports = (app) => {
  const homeTeam = require("../controllers/homeTeam.controller");
  const r = require("express").Router();

  r.get("/", homeTeam.findAll);
  r.get("/:id", homeTeam.show);
  r.post("/", homeTeam.create);
  r.put("/:id", homeTeam.update);
  r.delete("/:id", homeTeam.delete);

  app.use("/homeTeam", r);
};
