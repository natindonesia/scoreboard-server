module.exports = (app) => {
  const playerHome = require("../controllers/PlayerHome.controller");
  const r = require("express").Router();

  r.get("/", playerHome.findAll);
  r.get("/:id", playerHome.show);
  r.post("/", playerHome.create);
  r.put("/:id", playerHome.update);
  r.put("/update-all-names", playerHome.updateAllNames);
  r.delete("/:id", playerHome.delete);

  app.use("/playerHome", r);
};
