const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://ppimchan40:kUBD82DBqSAd8pkB@node-express.knhfg1c.mongodb.net/todo-tdd",
      { useNewUrlParser: true }
    );
    console.log("DB connect");
  } catch (error) {
    console.error("Error connecting to mongodb");
    console.error(error);
  }
}

module.exports = { connect };
