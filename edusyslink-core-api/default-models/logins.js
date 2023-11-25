const Sequelize = require("sequelize");
const database = require("../resources/database");

const Login = database.define("logins", {
  login_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login_photo_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  login_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_by: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

// Login.sync();

module.exports = Login;
