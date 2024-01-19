module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("coach", schema);
};
