const express = require("express");

const app = express();

app.use(express.json()); 

const addressRoutes = require("./routes/addressRoutes");

app.use("/addresses", addressRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("CoinTracker Lite API is running...");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
