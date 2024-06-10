module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: String,
            no: String,
            team: String,
            photo: {
                data: Buffer,
                contentType: String,
            },
        },
        {
            timestamps: true,
        }
    );

    return mongoose.model("player", schema);
};
