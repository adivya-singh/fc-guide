const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      name: "Lionel Messi",
      rating: 113,
      position: "RW",
    },
    {
      name: "Cristiano Ronaldo",
      rating: 111,
      position: "ST",
    },
  ]);
});

module.exports = router;
