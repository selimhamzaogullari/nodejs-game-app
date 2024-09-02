const express = require("express");
const app = express();
const cors = require("cors");
// const authRoute = require("./routes/authentication")
const gamesRoute = require("./routes/games");
const usersRoute = require("./routes/authentication");
const connectDb = require("./db/connect");
const notFraund = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const path = require("path");
const Game = require("./models/Game");
const Genre = require("./models/Genre");
const Game_Genre = require("./models/GameGenre");
const System = require("./models/System");
const Game_Supported_System = require("./models/GameSupportedSystem");

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api/auth", usersRoute);
app.use("/api/games", gamesRoute);
app.use(notFraund);
app.use(errorHandler);

app.use("/images", express.static(path.join(__dirname, "public/images")));

const port = process.env.PORT || 3000;

connectDb.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connectDb.threadId);

  Game.belongsToMany(Genre, { through: Game_Genre, as: 'genres', foreignKey: 'game_id' });
  Genre.belongsToMany(Game, { through: Game_Genre, as:'games', foreignKey: 'genre_id' });
  Game.belongsToMany(System, { through: Game_Supported_System, as: 'systems', foreignKey: 'game_id' });
  System.belongsToMany(Game, { through: Game_Supported_System, as: 'games', foreignKey: 'system_id' });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
