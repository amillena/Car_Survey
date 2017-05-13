// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
  },
  make: {
    type: Sequelize.STRING
  },
  color: {
  type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  swap: {
  type: Sequelize.BOOLEAN
  },
  photo: {
  type: Sequelize.TEXT
  }

}, {
  timestamps: false
});

// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;
