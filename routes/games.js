const express = require("express");
const router = express.Router();
const { getAllGames, getGame, createGame, deleteGame, updateGame, relatedGames, discoverGames } = require("../controllers/games");
const auth = require("../middleware/authMiddleware");

router.route("/").get(getAllGames).post(createGame);
router.route("/detail/:id").get(getGame).delete(deleteGame).put(updateGame);
router.route("/relatedGames").post(relatedGames);
router.route("/discoverGames").get(discoverGames);

module.exports = router;
