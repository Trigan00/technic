module.exports = (sequelize, DataTypes) => {
  const Allorders = sequelize.define(
    "allorders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userid: DataTypes.INTEGER,
      technicid: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Allorders;
};
