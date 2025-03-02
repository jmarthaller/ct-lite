const request = require("supertest");
const express = require("express");
const addressRoutes = require("../src/routes/addressRoutes");

const app = express();
app.use("/addresses", addressRoutes);

describe("GET /addresses", () => {
  it("should return a success message", async () => {
    const response = await request(app).get("/addresses");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Address routes are working!" });
  });
});
