const Player = require("../models/Player");
const getPlayers = async (req, res) => {
  try {
    const { search, position, sort } = req.query;
    let filter = {};
    if (position) {
      filter.position = position;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { nickname: { $regex: search, $options: "i" } },
        { nation: { $regex: search, $options: "i" } },
      ];
    }

    let query = Player.find(filter);

    if (sort === "rating-desc") {
      query = query.sort({ rating: -1 });
    }

    if (sort === "rating-asc") {
      query = query.sort({ rating: 1 });
    }

    if (sort === "name") {
      query = query.sort({ name: 1 });
    }

    const players = await query;

    res.json(players);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findOne({ id: req.params.id });

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);

    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    res.json(player);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndDelete({
      id: req.params.id,
    });

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    res.json({
      message: "Player deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
