module.exports = (app) => {
  const awayTeam = require("../controllers/team.controller");
  const r = require("express").Router();
  const upload = require("../middlewares/upload");


  r.get("/", awayTeam.findAll);
  r.get("/:id", awayTeam.show);
  r.post("/", upload.single('logo'),awayTeam.create);
  r.put("/:id", awayTeam.update);
  r.delete("/:id", awayTeam.delete);
  r.post("/swap", awayTeam.swapTeams);

  app.use("/team", r);
};
