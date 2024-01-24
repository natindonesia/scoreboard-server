const express = require("express");
const router = express.Router();
const Picture = require("../models/picture.model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload a picture
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newPicture = new Picture({
      filename: req.file.originalname,
      data: req.file.buffer,
    });

    await newPicture.save();

    res.status(201).json({ message: "Picture uploaded successfully" });
  } catch (error) {
    console.error("Error uploading picture:", error);
    res
      .status(500)
      .json({ error: `Error uploading picture: ${error.message}` });
  }
});

// Fetch all pictures
router.get("/", async (req, res) => {
  try {
    const pictures = await Picture.find({}, { _id: 1, filename: 1 });
    res.json(pictures);
  } catch (error) {
    console.error("Error fetching pictures:", error);
    res
      .status(500)
      .json({ error: `Error fetching pictures: ${error.message}` });
  }
});

// Fetch picture by ID
router.get("/:id", async (req, res) => {
  try {
    const pictureId = req.params.id;
    const picture = await Picture.findById(pictureId);

    if (!picture) {
      return res.status(404).json({ error: "Picture not found" });
    }

    res.set("Content-Type", "image/jpeg"); // Set the appropriate content type
    res.send(picture.data);
  } catch (error) {
    console.error("Error fetching picture by ID:", error);
    res
      .status(500)
      .json({ error: `Error fetching picture by ID: ${error.message}` });
  }
});

module.exports = router;
