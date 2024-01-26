module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      home: String,
      away: String,
      messagesHome: Array, // Change here
      messagesAway: Array, // Change here
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("score", schema);
};
