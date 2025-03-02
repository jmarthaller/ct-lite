const express = require("express");
const router = express.Router();

// Placeholder route
router.get("/", (req, res) => {
  res.json({ message: "Address routes are working!" });
});

module.exports = router;
