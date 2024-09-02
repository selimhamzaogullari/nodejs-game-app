const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Genre = sequelize.define(
  "Genre",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Genre;
