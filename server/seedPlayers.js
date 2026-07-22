const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Player = require("./models/Player");

dotenv.config();

const players = require("./data/players.json");

const importPlayers = async () => {
  try {
    await connectDB();

    await Player.deleteMany();

    await Player.insertMany(players);

    console.log("Players Imported Successfully!");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importPlayers();
