const addressService = require("../src/services/addressService");
const store = require("../src/data/dataStore");

beforeEach(() => {
  store.addresses.clear();
});

describe("Bitcoin Address Validation", () => {
  test("should validate correct P2PKH and P2SH BTC addresses", () => {
    expect(addressService.isValidBitcoinAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")).toBe(true);
    expect(addressService.isValidBitcoinAddress("3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy")).toBe(true);
  });

  test("should reject an address that is too short or too long", () => {
    expect(addressService.isValidBitcoinAddress("1A1zP1eP5Q")).toBe(false);
    expect(addressService.isValidBitcoinAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNaX123")).toBe(false); 
  });
});

describe("Address Service", () => {
  test("should add a valid BTC address", () => {
    const result = addressService.addAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    expect(result).toEqual({ success: true, message: "Address added successfully" });
    expect(store.addresses.has("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")).toBe(true);
  });

  test("should not add a duplicate BTC address", () => {
    addressService.addAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    const result = addressService.addAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    expect(result).toEqual({ success: false, message: "Address already exists" });
  });

  test("should not add an invalid BTC address", () => {
    const result = addressService.addAddress("invalid-address");
    expect(result).toEqual({ success: false, message: "Invalid Bitcoin address format." });
  });

  test("should remove an existing BTC address", () => {
    addressService.addAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    const result = addressService.removeAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    expect(result).toEqual({ success: true, message: "Address removed successfully" });
    expect(store.addresses.has("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")).toBe(false);
  });

  test("should not remove a non-existent BTC address", () => {
    const result = addressService.removeAddress("nonexistent");
    expect(result).toEqual({ success: false, message: "Address not found" });
  });

  test("should list all BTC addresses", () => {
    addressService.addAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    addressService.addAddress("3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy");
    const result = addressService.listAddresses();
    expect(result).toEqual([
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    ]);
  });
});
