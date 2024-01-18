module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nama_lengkap: String,
      jenis_kelamin: String,
      tempat_lahir: String,
      tanggal_lahir: Date,
      alamat: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("mahasiswa", schema);
};
