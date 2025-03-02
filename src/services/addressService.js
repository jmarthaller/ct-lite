const store = require("../data/dataStore");

const addAddress = (address) => {
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

module.exports = { addAddress, removeAddress, listAddresses };
