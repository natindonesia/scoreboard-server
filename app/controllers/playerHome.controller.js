const db = require("../models");
const PlayerHome = db.playerHome;
const path = require("path");
const fs = require("fs");

// exports.create = async (req, res) => {
//   try {
//     const { name, no, Position } = req.body;

//     const newPlayer = new PlayerHome({
//       name,
//       no,
//       Position,
//     });

//     if (req.file) {
//       newPlayer.photo = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//       };
//     }

//     await newPlayer.save();

//     res.status(201).send({ message: "Data berhasil disimpan" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.create = async (req, res) => {
  try {
    const { name, no, Position } = req.body;

    // Create a new PlayerHome instance
    const newPlayer = new PlayerHome({
      name,
      no,
      Position,
    });

    // Add photo information if available
    if (req.file) {
      const uploadDir = "uploads"; // Directory where files will be saved
      const filename = `${Date.now()}_${req.file.originalname}`;
      const filePath = path.join(uploadDir, filename);

      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Save file to disk
      fs.writeFileSync(filePath, req.file.buffer);

      // Store file path in the database
      newPlayer.photo = filePath;
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

    // Construct the absolute file path to the photo
    const filePath = path.join(__dirname, "..", "..", player.photo);

    // Send the photo data as the response
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const playerId = req.params.id;
    const { name, no } = req.body; // Only update name and no

    // Find the player by ID
    let player = await PlayerHome.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update player fields
    player.name = name || player.name;
    player.no = no || player.no;

    // Save updated player to the database
    await player.save();

    res.json({ message: "Player updated successfully", player });
  } catch (error) {
    console.error("Error updating player:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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

exports.updatePhoto = async (req, res) => {
  try {
    const playerId = req.params.id;

    // Find the player by ID
    let player = await PlayerHome.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update photo if a new file is provided
    if (req.file) {
      const uploadDir = "uploads"; // Directory where files will be saved
      const filename = `${Date.now()}_${req.file.originalname}`;
      const filePath = path.join(uploadDir, filename);

      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Save file to disk
      fs.writeFileSync(filePath, req.file.buffer);

      // Store file path in the database
      player.photo = filePath;

      // Save updated player to the database
      await player.save();

      return res.json({ message: "Photo updated successfully", player });
    } else {
      return res.status(400).json({ message: "No photo provided" });
    }
  } catch (error) {
    console.error("Error updating photo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.clearPhoto = async (req, res) => {
  try {
    const playerId = req.params.id;

    // Find the player by ID
    const player = await PlayerHome.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Remove the photo field from the player document
    player.photo = undefined; // or null

    // Save the updated player document
    await player.save();

    res.json({ message: "Photo deleted successfully", player });
  } catch (error) {
    console.error("Error deleting photo:", error);
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

exports.clearAllData = async (req, res) => {
  try {
    await PlayerHome.deleteMany({});
    res.status(200).json({ message: "All data cleared successfully" });
  } catch (error) {
    console.error("Error clearing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
