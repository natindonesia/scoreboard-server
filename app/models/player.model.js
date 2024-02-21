module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: String,
            no: String,
            team: String,
            photo: String,
        },
        {
            timestamps: true,
        }
    );

    return mongoose.model("player", schema);
};
