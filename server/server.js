const express = require("express");

const app = express();

const PORT = 3000;

// Import Routes
const playerRoutes = require("./routes/playerRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/players", playerRoutes);

app.get("/", (req, res) => {
  res.send("FC Guide Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
