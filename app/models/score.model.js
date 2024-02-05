module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      home: String,
      away: String,
      messagesHome: Array,
      minutesHome: Array,
      messagesAway: Array,
      minutesAway: Array,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("score", schema);
};
