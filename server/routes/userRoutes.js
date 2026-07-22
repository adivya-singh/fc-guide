const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getFavorites,
  toggleFavorite,
  getSquad,
  saveSquad,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/favorites", protect, getFavorites);

router.put("/favorites/:id", protect, toggleFavorite);
router.get("/squad", protect, getSquad);

router.put("/squad", protect, saveSquad);

module.exports = router;
