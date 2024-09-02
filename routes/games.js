const express = require("express");
const router = express.Router();
const { getAllGames, getGame, createGame, deleteGame, updateGame, relatedGames } = require("../controllers/games");

router.route("/").get(getAllGames).post(createGame);
router.route("/:id").get(getGame).delete(deleteGame).put(updateGame);
router.route("/relatedGames").post(relatedGames)

module.exports = router;
