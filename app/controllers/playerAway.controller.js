const db = require("../models");
const PlayerAway = db.playerAway;

exports.create = async (req, res) => {
  try {
    const { name, no, Position } = req.body;

    // Check if the required fields are provided

    // Create a new PlayerAway instance
    const newPlayer = new PlayerAway({
      name,
      no,
      Position,
    });

    // Add photo information if available
    if (req.file) {
      newPlayer.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Save the new player to the database
    await newPlayer.save();

    res.status(201).send({ message: "Data berhasil disimpan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const playerId = req.params.id;

    // Find the player by ID
    const player = await PlayerAway.findById(playerId);

    if (!player || !player.photo) {
      return res.status(404).send("Photo not found");
    }

    // Send the photo data as the response
    res.set("Content-Type", player.photo.contentType);
    res.send(player.photo.data);
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.findAll = (req, res) => {
  PlayerAway.find()
    .then((mahasiswas) => res.send(mahasiswas))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  PlayerAway.findById(req.params.id)
    .then((mahasiswa) => res.send(mahasiswa))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = async (req, res) => {
  const playerId = req.params.id;

  try {
    // Find the player by ID
    const player = await PlayerAway.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update the player's fields
    player.name = req.body.name || player.name;
    player.no = req.body.no || player.no;

    // Update the photo if a new file is provided
    if (req.file) {
      player.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Save the updated player document
    await player.save();

    res.json({ message: "Player updated successfully", player });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePhoto = async (req, res) => {
  const playerId = req.params.id;

  try {
    // Find the player by ID
    const player = await PlayerAway.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update the player's photo if a new file is provided
    if (req.file) {
      player.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Save the updated player document
    await player.save();

    res.json({ message: "Player photo updated successfully", player });
  } catch (error) {
    console.error("Error updating player photo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateAllNames = async (req, res) => {
  try {
    const newName = req.body.newName; // Assuming you send the new name in the request body

    // Update all names in the collection
    const updatedMatches = await Match.updateMany(
      {},
      { $set: { "playerAway.name": newName } }
    );

    res.json({ message: "All names updated successfully", updatedMatches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PlayerAway.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Tidak dapat menemukan data untuk dihapus" });
      }
      res.send({ message: "Data berhasil dihapus" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
