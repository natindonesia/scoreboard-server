module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      home: String,
      away: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("score", schema);
};
