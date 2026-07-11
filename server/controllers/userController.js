const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "Registration Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json(user.favorites);
};

const toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  const playerId = req.params.id;

  if (user.favorites.includes(playerId)) {
    user.favorites = user.favorites.filter((id) => id !== playerId);
  } else {
    user.favorites.push(playerId);
  }

  await user.save();

  res.json(user.favorites);
};
const getSquad = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json(user.squad);
};
const saveSquad = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.squad = req.body.squad;

  await user.save();

  res.json(user.squad);
};
module.exports = {
  registerUser,
  loginUser,
  getFavorites,
  toggleFavorite,
  getSquad,
  saveSquad,
};
