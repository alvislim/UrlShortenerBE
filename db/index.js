const mongoose = require("mongoose");
const MONGO_SERVER = process.env.MONGO_SERVER || process.env.MONGO_URI;

module.exports = {
  async connect() {
    try {
      await mongoose.connect(`${MONGO_SERVER}`);
      console.log(`Connecting to db on ${MONGO_SERVER}`);
    } catch (err) {
      console.log(`Error connecting to db: ${err}`);
    }
  },
  disconnect() {
    return mongoose.connection.close(() => {
      console.log("Database connection closed");
    });
  },
};
