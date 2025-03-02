const store = require("../data/dataStore");

/**
 * Basic oversimplified validation for a Bitcoin address:
 * - Must be between 25 and 34 characters long.
 */
const isValidBitcoinAddress = (address) => {
  return typeof address === "string" && address.length >= 25 && address.length <= 34;
};

const addAddress = (address) => {
  if (!isValidBitcoinAddress(address)) {
    return { success: false, message: "Invalid Bitcoin address format." };
  }
  if (store.addresses.has(address)) {
    return { success: false, message: "Address already exists" };
  }
  store.addresses.add(address);
  return { success: true, message: "Address added successfully" };
};

const removeAddress = (address) => {
  if (!store.addresses.has(address)) {
    return { success: false, message: "Address not found" };
  }
  store.addresses.delete(address);
  return { success: true, message: "Address removed successfully" };
};

const listAddresses = () => {
  return Array.from(store.addresses);
};

module.exports = { addAddress, removeAddress, listAddresses, isValidBitcoinAddress };
