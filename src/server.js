const express = require("express");
const addressRoutes = require("./routes/addressRoutes");
const apiLimiter = require("./middleware/rateLimit");

const app = express();
app.use(express.json());

app.use(apiLimiter);

app.use("/addresses", addressRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
