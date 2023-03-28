const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const option = { logging: false };
const sequelize = new Sequelize(
  isProduction ? process.env.DATABASE_URL : connectionString,
  option
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Person = require("./person")(sequelize, DataTypes);
db.models.Technic = require("./technic")(sequelize, DataTypes);
db.models.Allorders = require("./allorders")(sequelize, DataTypes);

module.exports = db;
