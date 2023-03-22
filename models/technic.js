module.exports = (sequelize, DataTypes) => {
  const Technic = sequelize.define(
    "technic",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: DataTypes.STRING,
      characteristic: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Technic;
};
