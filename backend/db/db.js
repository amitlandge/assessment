const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DataBase Connect Succesfully");
    })
    .catch(() => {
      console.log("Database Connection Failed");
    });
};

module.exports = connection;
