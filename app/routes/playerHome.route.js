module.exports = (app) => {
  const playerHome = require("../controllers/PlayerHome.controller");
  const r = require("express").Router();
  const multer = require("multer");
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  r.get("/", playerHome.findAll);
  r.get("/:id", playerHome.show);
  r.post("/", upload.single("file"), playerHome.create); // Handle file upload in the create route
  r.put("/:id", playerHome.update);
  r.put("/:id/photo", upload.single("file"), playerHome.updatePhoto);
  r.put("/update-all-names", playerHome.updateAllNames);
  r.delete("/:id", playerHome.delete);
  r.get("/:id/photo", playerHome.getPhoto);

  app.use("/playerHome", r);
};
