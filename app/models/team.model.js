module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
        logo: {
            data: Buffer,
            contentType: String,
        },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model("team", schema);
};
