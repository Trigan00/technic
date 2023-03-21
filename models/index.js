const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const sequelize = new Sequelize(
  isProduction ? process.env.DATABASE_URL : connectionString
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Person = require("./person")(sequelize, DataTypes);

module.exports = db;
