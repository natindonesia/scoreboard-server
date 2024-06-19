module.exports = (app) => {
    const player = require("../controllers/player.controller.js");
    const multer = require("multer");
    const r = require("express").Router();
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    r.get("/", player.findAll);
    r.get("/:id", player.show);
    r.post("/", upload.single('photo'),player.create);
    r.put("/:id", player.update);
    r.delete("/:id", player.delete);

    app.use("/player", r);
};
