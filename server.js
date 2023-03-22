const app = require("./app");
const { connection } = require("./db/connection");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    connection();
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
};

start();
