module.exports = (app) => {
  const coach = require("../controllers/coach.controller");
  const r = require("express").Router();

  r.get("/", coach.findAll);
  r.get("/:id", coach.show);
  r.post("/", coach.create);
  r.put("/:id", coach.update);
  r.delete("/:id", coach.delete);

  app.use("/coach", r);
};
