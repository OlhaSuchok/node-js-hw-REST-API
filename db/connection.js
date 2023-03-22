const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.CONNECTION_STRING;

mongoose.set("strictQuery", false);

const connection = async () => {
  return mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connection,
};
