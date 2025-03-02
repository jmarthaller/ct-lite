const rateLimit = require("express-rate-limit");

// Max 100 requests per 15 minutes per IP address
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "You have made too many requests, please try again later." },
  headers: true,
});

module.exports = apiLimiter;
