module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      no: String,
      // photo: {
      //   data: Buffer,
      //   contentType: String,
      // },
      photo: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("playerHome", schema);
};
