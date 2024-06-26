const db = require("../models");
const Player = db.player;

exports.create = async (req, res) => {
    try {
        const { name, no, Position, team } = req.body;

        // Check if the required fields are provided

        // Create a new PlayerHome instance
        const newPlayer = new Player({
            name,
            no,
            Position,
            team
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
        res.send({ message: "Data berhasil disimpan", newPlayer });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const players = await Player.find();
        res.send(players);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.show = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).send({ message: "Player not found" });
        }
        res.send(player);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false,
            new: true, // Return the updated document
        });

        if (!updatedPlayer) {
            return res.status(404).send({ message: "Tidak dapat mengupdate data" });
        }

        res.send({ message: "Data berhasil diupdate", player: updatedPlayer });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedPlayer = await Player.findByIdAndDelete(id);

        if (!deletedPlayer) {
            return res
                .status(404)
                .send({ message: "Tidak dapat menemukan data untuk dihapus" });
        }

        res.send({ message: "Data berhasil dihapus", player: deletedPlayer });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
