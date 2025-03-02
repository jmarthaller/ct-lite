const addressService = require("../services/addressService");
const blockchainService = require("../services/blockchainService");

const addAddress = (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ success: false, message: "Address is required" });
  }
  const result = addressService.addAddress(address);
  return res.status(result.success ? 201 : 400).json(result);
};

const removeAddress = (req, res) => {
  const { address } = req.params;
  const result = addressService.removeAddress(address);
  return res.status(result.success ? 200 : 404).json(result);
};

const listAddresses = (req, res) => {
  const addresses = addressService.listAddresses();
  return res.json({ addresses });
};

const getBalance = async (req, res) => {
  const { address } = req.params;
  const result = await blockchainService.getBalance(address);
  return res.status(result.success ? 200 : 500).json(result);
};

const getTransactions = async (req, res) => {
  const { address } = req.params;
  const result = await blockchainService.getTransactions(address);
  return res.status(result.success ? 200 : 500).json(result);
};

module.exports = { addAddress, removeAddress, listAddresses, getBalance, getTransactions };
