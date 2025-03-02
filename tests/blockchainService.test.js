const axios = require("axios");
const blockchainService = require("../src/services/blockchainService");

jest.mock("axios");

describe("Blockchain Service", () => {
  test("should fetch balance for a valid Bitcoin address", async () => {
    const mockResponse = {
      data: {
        "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa": { final_balance: 123456789 }
      }
    };
    
    axios.get.mockResolvedValue(mockResponse);

    const result = await blockchainService.getBalance("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");

    expect(result).toEqual({ success: true, balance: 123456789 });
    expect(axios.get).toHaveBeenCalledWith("https://blockchain.info/balance?active=1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
  });

  test("should return an error for invalid Bitcoin address balance request", async () => {
    axios.get.mockRejectedValue(new Error("Request failed"));

    const result = await blockchainService.getBalance("invalid-address");

    expect(result).toEqual({ success: false, message: "Error fetching balance from Blockchain.com" });
  });

  test("should fetch transactions for a valid Bitcoin address with default pagination", async () => {
    const mockResponse = {
      data: {
        txs: [{ hash: "sampleTxHash", value: 5000000 }]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await blockchainService.getTransactions("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");

    expect(result).toEqual({ success: true, transactions: [{ hash: "sampleTxHash", value: 5000000 }] });
    expect(axios.get).toHaveBeenCalledWith(
      "https://blockchain.info/rawaddr/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?limit=10&offset=0"
    );
  });

  test("should fetch transactions for a valid Bitcoin address with custom pagination", async () => {
    const mockResponse = {
      data: {
        txs: [{ hash: "tx11", value: 4500000 }]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await blockchainService.getTransactions("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", 5, 10);

    expect(result).toEqual({ success: true, transactions: [{ hash: "tx11", value: 4500000 }] });
    expect(axios.get).toHaveBeenCalledWith(
      "https://blockchain.info/rawaddr/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?limit=5&offset=10"
    );
  });

  test("should return an error for invalid Bitcoin address transaction request", async () => {
    axios.get.mockRejectedValue(new Error("Request failed"));

    const result = await blockchainService.getTransactions("invalid-address");

    expect(result).toEqual({ success: false, message: "Error fetching transactions from Blockchain.com" });
  });
});
