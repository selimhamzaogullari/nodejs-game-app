const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Game_Supported_System = sequelize.define(
  "Game_Supported_System",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    game_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    system_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Game_Supported_System;
