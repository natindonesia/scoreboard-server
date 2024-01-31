const db = require("../models");
const PlayerHome = db.playerHome;

exports.create = async (req, res) => {
  try {
    const { name, no, Position } = req.body;

    // Check if the required fields are provided

    // Create a new PlayerHome instance
    const newPlayer = new PlayerHome({
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
    const player = await PlayerHome.findById(playerId);

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
  PlayerHome.find()
    .then((mahasiswas) => res.send(mahasiswas))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  PlayerHome.findById(req.params.id)
    .then((mahasiswa) => res.send(mahasiswa))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = async (req, res) => {
  const playerId = req.params.id;

  try {
    // Find the player by ID
    const player = await PlayerHome.findById(playerId);

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
    const player = await PlayerHome.findById(playerId);

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
      { $set: { "playerHome.name": newName } }
    );

    res.json({ message: "All names updated successfully", updatedMatches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PlayerHome.findByIdAndDelete(id)
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

exports.swapTeams = async (req, res) => {
  const { team1Id, team2Id } = req.body;

  try {
    // Fetch all teams
    const teams = await PlayerHome.find();

    // Call the helper function to swap teams in the array
    const swappedTeams = await swapTeamsArray(teams, team1Id, team2Id);

    res.send({
      message: "Teams swapped successfully",
      teams: swappedTeams,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Helper function to swap teams in an array
const swapTeamsArray = async (teams, team1Id, team2Id) => {
  const team1Index = teams.findIndex((team) => team._id.toString() === team1Id);
  const team2Index = teams.findIndex((team) => team._id.toString() === team2Id);

  if (team1Index === -1 || team2Index === -1) {
    throw new Error("One or more teams not found");
  }

  // Swap the teams in the array
  [teams[team1Index], teams[team2Index]] = [
    teams[team2Index],
    teams[team1Index],
  ];

  // Save the updated array back to the database
  await PlayerHome.deleteMany({}); // Remove all teams from the database
  await PlayerHome.insertMany(teams); // Insert the updated teams array

  return teams;
};
