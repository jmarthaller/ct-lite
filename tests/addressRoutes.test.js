const request = require("supertest");
const express = require("express");
const addressRoutes = require("../src/routes/addressRoutes");
const store = require("../src/data/dataStore");

const app = express();
app.use(express.json());
app.use("/addresses", addressRoutes);

beforeEach(() => {
  store.addresses.clear(); // Reset store before each test
});

describe("Address Routes", () => {
  test("POST /addresses - should add a new address", async () => {
    const response = await request(app)
      .post("/addresses")
      .send({ address: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, message: "Address added successfully" });
  });

  test("POST /addresses - should not add a duplicate address", async () => {
    await request(app).post("/addresses").send({ address: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd" });
    const response = await request(app).post("/addresses").send({ address: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd" });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ success: false, message: "Address already exists" });
  });

  test("DELETE /addresses/:address - should remove an address", async () => {
    await request(app).post("/addresses").send({ address: "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd" });
    const response = await request(app).delete("/addresses/3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, message: "Address removed successfully" });
  });

  test("DELETE /addresses/:address - should return 404 for non-existent address", async () => {
    const response = await request(app).delete("/addresses/nonexistent");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ success: false, message: "Address not found" });
  });

  test("GET /addresses - should list all addresses", async () => {
    await request(app).post("/addresses").send({ address: "addr1" });
    await request(app).post("/addresses").send({ address: "addr2" });

    const response = await request(app).get("/addresses");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ addresses: ["addr1", "addr2"] });
  });
});
