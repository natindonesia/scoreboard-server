const db = require("../models");
const PlayerHome = db.playerHome;

exports.create = (req, res) => {
  PlayerHome.create(req.body)
    .then(() => res.send({ message: "data berhasil disimpan" }))
    .catch((err) => res.status(500).send({ message: err.message }));
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

exports.update = (req, res) => {
  const id = req.params.id;

  PlayerHome.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "tidak dapat mengupdate data" });
      }
      res.send({ message: "Data berhasil di update" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
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
