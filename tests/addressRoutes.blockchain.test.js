const request = require("supertest");
const express = require("express");
const addressRoutes = require("../src/routes/addressRoutes");
const blockchainService = require("../src/services/blockchainService");

jest.mock("../src/services/blockchainService");

const app = express();
app.use(express.json());
app.use("/addresses", addressRoutes);

describe("Address Routes - Blockchain API", () => {
  test("GET /addresses/:address/balance - should return balance", async () => {
    blockchainService.getBalance.mockResolvedValue({ success: true, balance: 123456789 });

    const response = await request(app).get("/addresses/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/balance");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, balance: 123456789 });
    expect(blockchainService.getBalance).toHaveBeenCalledWith("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
  });

  test("GET /addresses/:address/transactions - should return transactions", async () => {
    blockchainService.getTransactions.mockResolvedValue({ success: true, transactions: [{ hash: "tx123" }] });
  
    const response = await request(app).get("/addresses/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/transactions");
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, transactions: [{ hash: "tx123" }] });
  
    // Ensure function is called with default limit and offset
    expect(blockchainService.getTransactions).toHaveBeenCalledWith("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", 10, 0);
  });

  test("GET /addresses/:address/balance - should return error on failure", async () => {
    blockchainService.getBalance.mockResolvedValue({ success: false, message: "Error fetching balance from Blockchain.com" });

    const response = await request(app).get("/addresses/invalid-address/balance");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: "Error fetching balance from Blockchain.com" });
  });

  test("GET /addresses/:address/transactions - should return error on failure", async () => {
    blockchainService.getTransactions.mockResolvedValue({ success: false, message: "Error fetching transactions from Blockchain.com" });

    const response = await request(app).get("/addresses/invalid-address/transactions");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: "Error fetching transactions from Blockchain.com" });
  });
});
