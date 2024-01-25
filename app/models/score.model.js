module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      home: String,
      away: String,
      massageHome: String,
      massageAway: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("score", schema);
};
