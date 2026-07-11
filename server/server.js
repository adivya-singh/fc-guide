const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();
const app = express();
app.use(cors());
const PORT = 3000;

// Import Routes
const playerRoutes = require("./routes/playerRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/players", playerRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("FC Guide Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
