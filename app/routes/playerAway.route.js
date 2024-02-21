module.exports = (app) => {
  const playerAway = require("../controllers/playerAway.controller");
  const r = require("express").Router();
  const multer = require("multer");
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  r.get("/", playerAway.findAll);
  r.get("/:id", playerAway.show);
  r.post("/", upload.single("file"), playerAway.create);
  r.put("/:id", playerAway.update);
  r.put("/:id/photo", upload.single("file"), playerAway.updatePhoto);
  r.put("/update-all-names", playerAway.updateAllNames);
  r.delete("/:id", playerAway.delete);
  r.get("/:id/photo", playerAway.getPhoto);
  r.post("/swap", playerAway.swapTeams);
  r.put("/:id/photoDelete", playerAway.clearPhoto);

  app.use("/playerAway", r);
};
