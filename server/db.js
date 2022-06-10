const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
const mongoURI = MONGO_URI || "mongodb://localhost:27017/kyōyū";
// const mongoURI = "mongodb://localhost:27017/kyōyū";

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Connected to MongoDB successfully");
      }
    );
  } catch (error) {
    console.log(`MongoDb Connection error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectToMongo;
