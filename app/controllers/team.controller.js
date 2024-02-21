// team controller
const db = require("../models");
const Team = db.team;

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const logo = req.file ? req.file.path : null;
    const team = await Team.create({ name, logo });
    res.send({ message: "Data berhasil disimpan", team });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const teams = await Team.find();
    res.send(teams);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.show = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send({ message: "Team not found" });
    }
    res.send(team);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true, // Return the updated document
    });

    if (!updatedTeam) {
      return res.status(404).send({ message: "Tidak dapat mengupdate data" });
    }

    res.send({ message: "Data berhasil diupdate", team: updatedTeam });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res
        .status(404)
        .send({ message: "Tidak dapat menemukan data untuk dihapus" });
    }

    res.send({ message: "Data berhasil dihapus", team: deletedTeam });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.swapTeams = async (req, res) => {
  const { team1Id, team2Id } = req.body;

  try {
    // Fetch all teams
    const teams = await Team.find();

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
  await Team.deleteMany({}); // Remove all teams from the database
  await Team.insertMany(teams); // Insert the updated teams array

  return teams;
};
