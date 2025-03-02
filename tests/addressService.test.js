const addressService = require("../src/services/addressService");
const store = require("../src/data/dataStore");

beforeEach(() => {
  store.addresses.clear();
});

describe("Address Service", () => {
  test("should add a new address", () => {
    const result = addressService.addAddress("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd");
    expect(result).toEqual({ success: true, message: "Address added successfully" });
    expect(store.addresses.has("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd")).toBe(true);
  });

  test("should not add a duplicate address", () => {
    addressService.addAddress("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd");
    const result = addressService.addAddress("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd");
    expect(result).toEqual({ success: false, message: "Address already exists" });
  });

  test("should remove an existing address", () => {
    addressService.addAddress("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd");
    const result = addressService.removeAddress("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd");
    expect(result).toEqual({ success: true, message: "Address removed successfully" });
    expect(store.addresses.has("3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd")).toBe(false);
  });

  test("should not remove a non-existent address", () => {
    const result = addressService.removeAddress("nonexistent");
    expect(result).toEqual({ success: false, message: "Address not found" });
  });

  test("should list all addresses", () => {
    addressService.addAddress("addr1");
    addressService.addAddress("addr2");
    const result = addressService.listAddresses();
    expect(result).toEqual(["addr1", "addr2"]);
  });
});
