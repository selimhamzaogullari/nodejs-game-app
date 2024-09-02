const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Game = require("./Game");

const Game_Genre = sequelize.define(
  "Game_Genre",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    game_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Game,
        key: "id",
      },
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Game_Genre;
