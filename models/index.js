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

const Person = require("./person")(sequelize, DataTypes);
const Technic = require("./technic")(sequelize, DataTypes);
const Allorders = require("./allorders")(sequelize, DataTypes);

Person.hasMany(Allorders);
Allorders.belongsTo(Person);
Technic.hasOne(Allorders);
Allorders.belongsTo(Technic);

db.models = {
  Person,
  Technic,
  Allorders,
};

module.exports = db;
