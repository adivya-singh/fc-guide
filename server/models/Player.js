const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    nickname: String,

    position: {
      type: String,
      required: true,
    },

    roles: String,

    nation: String,

    rating: {
      type: Number,
      required: true,
    },

    card: String,

    image: String,

    review: {
      type: String,
      default: "",
    },

    pros: {
      type: [String],
      default: [],
    },

    cons: {
      type: [String],
      default: [],
    },

    recommended: {
      type: Boolean,
      default: false,
    },

    underrated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Player", playerSchema);
