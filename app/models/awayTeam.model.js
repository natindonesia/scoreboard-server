module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      logo: String,
      formation: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("awayTeam", schema);
};
