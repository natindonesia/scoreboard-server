module.exports = (app) => {
  const score = require("../controllers/score.controller");
  const r = require("express").Router();

  r.get("/", score.findAll);
  r.get("/:id", score.show);
  r.post("/", score.create);
  r.put("/:id", score.update);
  r.delete("/:id", score.delete);

  app.use("/score", r);
};
