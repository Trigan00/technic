module.exports = (sequelize, DataTypes) => {
  const Technic = sequelize.define(
    "technic",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      fullDescription: DataTypes.TEXT,
      shortDescription: DataTypes.TEXT,
      characteristic: DataTypes.TEXT,
      imgname: DataTypes.STRING,
      imgFileDescription: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Technic;
};
