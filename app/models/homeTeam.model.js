module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      logo: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("homeTeam", schema);
};
