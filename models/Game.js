const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Game = sequelize.define(
  "Game",
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publisher_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    image_poster: {
      type: DataTypes.TEXT,
    },
    image_header: {
      type: DataTypes.TEXT,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    score: {
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Game;
