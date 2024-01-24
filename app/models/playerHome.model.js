module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      no: String,
      Position: String,
      photo: {
        data: Buffer,
        contentType: String,
      },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("playerHome", schema);
};
