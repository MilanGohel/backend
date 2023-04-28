const mongoose = require("mongoose");
const server = "127.0.0.1:27017";
const database = "Mukh";
mongoose.set("strictQuery", false);
const connectToMongo = async () => {
  try {
    mongoose.connect(`mongodb://${server}/${database}`);
    console.log("Successfull");
  } catch (err) {
    console.log("Failed to connect mongodb", err);
  }
};
module.exports = connectToMongo;
