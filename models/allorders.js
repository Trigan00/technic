module.exports = (sequelize, DataTypes) => {
  const Allorders = sequelize.define(
    "allorders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // userid: DataTypes.INTEGER,
      // technicid: DataTypes.INTEGER,
      username: DataTypes.STRING,
      useremail: DataTypes.STRING,
      technicname: DataTypes.STRING,
      dates: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Allorders;
};
