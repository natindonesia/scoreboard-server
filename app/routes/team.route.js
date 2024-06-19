module.exports = (app) => {
  const awayTeam = require("../controllers/team.controller");
  const multer = require("multer");
  const r = require("express").Router();
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });


  r.get("/", awayTeam.findAll);
  r.get("/:id", awayTeam.show);
  r.post("/", upload.single('logo'),awayTeam.create);
  r.put("/:id", awayTeam.update);
  r.delete("/:id", awayTeam.delete);
  r.post("/swap", awayTeam.swapTeams);

  app.use("/team", r);
};
