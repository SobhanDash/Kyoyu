const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
const mongoURI = MONGO_URI || "mongodb://localhost:27017/kyōyū";

const connectToMongo = () => {
  try {
    mongoose.connect(
      mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Connected to MongoDB successfully");
      }
    );
  } catch (error) {
    console.log(`MongoDb Connection error: ${error}`);
  }
};

module.exports = connectToMongo;
