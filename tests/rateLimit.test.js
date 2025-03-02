const request = require("supertest");
const express = require("express");
const rateLimit = require("../src/middleware/rateLimit");

const app = express();
app.use(rateLimit);
app.get("/", (req, res) => res.json({ success: true, message: "Request successful" }));

describe("Rate Limiting Middleware", () => {
  test("should allow requests under the limit", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, message: "Request successful" });
  });

  test("should return 429 after exceeding the limit", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app).get("/");
    }
    
    const response = await request(app).get("/");
    expect(response.status).toBe(429);
    expect(response.body).toEqual({ success: false, message: "You have made too many requests, please try again later." });
  });
});
