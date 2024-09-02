const Game = require("../models/Game");
const Genre = require("../models/Genre");
const System = require("../models/System");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllGames = asyncWrapper(async (req, res, next) => {
  const getTypes = ["best", "free", "newest"];
  let isQuery = false;
  // If have
  if (req.query?.type && getTypes.find((t) => t === req.query.type)) {
    switch (req.query?.type) {
      case "best": {
        isQuery = { limit: 4, order: [["score", "DESC"]] };
        break;
      }
      case "free": {
        isQuery = { limit: 4, where: { price: 0 } };
        break;
      }
      case "newest": {
        isQuery = { limit: 4, order: [["release_date", "DESC"]] };
        break;
      }
      default: 
        isQuery = {}
    }
  }
  const allGames = await Game.findAll({
    include: [
      {
        model: Genre,
        as: 'genres',
        attributes: ['id', 'name'],
        through: { attributes: [] },
        required: true,
      },
    ],
    ...isQuery
  })
  if (!allGames) { // No game with id
    return next(createCustomError(`Games could not be brought`));
  }
  res.status(201).json({ status: "success", response: allGames });
});

const getGame = asyncWrapper(async (req, res, next) => {
  const game = await Game.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Genre,
        as: 'genres',
        attributes: ['id', 'name'],
        through: { attributes: [] },
        required: true
      },
      {
        model: System,
        as: 'systems',
        attributes: ['id', 'name', 'logo'],
        through: { attributes: [] },
        required: true
      }
    ]
  })
  if (!game) { // No game with id
    return next(createCustomError(`No game with id: ${req.params.id}`));
  }
  res.status(201).json({ status: "success", response: game });
});

const createGame = asyncWrapper(async (req, res, next) => {
  const game = await Game.create(req.body);
  if (!game) { // No game with id
    return next(createCustomError(`The game could not created`));
  }
  res.status(201).json({ status: "success", response: game });
});

const deleteGame = async (req, res, next) => {
  const game = await Game.destroy({ where: { id: req.params.id } });
  if (!game) { // No game with id
    return next(createCustomError(`No game with id: ${req.params.id}`));
  }
  res.status(201).json({ status: "success", response: {} });
};

const updateGame = async (req, res, next) => {
  const game = await Game.update(req.body, { where: { id: req.params.id } });
  if (!game[0]) { // No game with id
    return next(createCustomError(`No game with id or parameter is not exist: ${req.params.id}`));
  }
  res.status(201).json({ status: "success", response: game });
};

const relatedGames = async (req, res, next) => {
  const relatedGames = await Game.findAll({
    include: [
      {
        model: Genre,
        as: 'genres',
        attributes: ['id', 'name'],
        through: { attributes: [] },
        required: true,
        where: {
          id: req.body?.genre_ids
        }
      },
    ],
    limit: 4,
    order: [["score", "DESC"]]
  })
  if (!relatedGames) { // No game with genre_ids
    return next(createCustomError(`No game with ids: ${req.body.ids}`));
  }
  res.status(201).json({ status: "success", response: relatedGames });
}

module.exports = { getAllGames, getGame, createGame, deleteGame, updateGame, relatedGames };
