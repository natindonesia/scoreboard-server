module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      no: String,
      position: { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("playerHome", schema);
};
