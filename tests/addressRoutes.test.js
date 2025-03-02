const request = require("supertest");
const express = require("express");
const addressRoutes = require("../src/routes/addressRoutes");
const store = require("../src/data/dataStore");

const app = express();
app.use(express.json());
app.use("/addresses", addressRoutes);

beforeEach(() => {
  store.addresses.clear();
});

describe("Address Routes", () => {
  test("POST /addresses - should add a new valid address", async () => {
    const response = await request(app)
      .post("/addresses")
      .send({ address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, message: "Address added successfully" });
  });

  test("DELETE /addresses/:address - should remove an address", async () => {
    await request(app).post("/addresses").send({ address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" });
    const response = await request(app).delete("/addresses/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, message: "Address removed successfully" });
  });

  test("DELETE /addresses/:address - should return 404 for non-existent address", async () => {
    const response = await request(app).delete("/addresses/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ success: false, message: "Address not found" });
  });

  test("GET /addresses - should list all addresses", async () => {
    await request(app).post("/addresses").send({ address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" });
    await request(app).post("/addresses").send({ address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy" });

    const response = await request(app).get("/addresses");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      addresses: ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"],
    });
  });

  test("POST /addresses - should reject invalid Bitcoin address", async () => {
    const response = await request(app)
      .post("/addresses")
      .send({ address: "invalid-btc-address" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ success: false, message: "Invalid Bitcoin address format." });
  });
});
