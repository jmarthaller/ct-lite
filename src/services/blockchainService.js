const axios = require("axios");

const BASE_URL = "https://blockchain.info";

/**
 * Fetch balance for a Bitcoin address
 * @param {string} address - Bitcoin address
 * @returns {Promise<object>} Balance details including final balance and total received
 */
const getBalance = async (address) => {
  try {
    const response = await axios.get(`${BASE_URL}/balance?active=${address}`);
    if (response.data[address]) {
      return { success: true, balance: response.data[address].final_balance };
    }
    return { success: false, message: "Invalid Bitcoin address or no data available." };
  } catch (error) {
    return { success: false, message: "Error fetching balance from Blockchain.com" };
  }
};

/**
 * Fetch transactions for a Bitcoin address with pagination
 * @param {string} address - Bitcoin address
 * @param {number} limit - Number of transactions per page (default: 10, max: 50)
 * @param {number} offset - Number of transactions to skip (default: 0)
 * @returns {Promise<object>} Transaction history with pagination
 */
const getTransactions = async (address, limit = 10, offset = 0) => {
    try {
      limit = Math.min(limit, 50);
  
      const response = await axios.get(`${BASE_URL}/rawaddr/${address}?limit=${limit}&offset=${offset}`);
      
      return { success: true, transactions: response.data.txs };
    } catch (error) {
      return { success: false, message: "Error fetching transactions from Blockchain.com" };
    }
  };

module.exports = { getBalance, getTransactions };
