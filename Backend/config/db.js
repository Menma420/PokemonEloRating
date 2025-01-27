const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://uttkarshmalviya690:AtlasMongo@cluster0.mzas2.mongodb.net/PokemonDb"

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports =ConnectDB;
