const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const System = sequelize.define(
  "System",
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
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = System;
