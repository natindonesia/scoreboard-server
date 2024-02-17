module.exports = (app) => {
  const formation = require("../controllers/formation.controller");
  const r = require("express").Router();

  r.get("/", formation.findAll);
  r.get("/:id", formation.show);
  r.post("/", formation.create);
  r.put("/:id", formation.update);
  r.delete("/:id", formation.delete);

  app.use("/formation", r);
};
