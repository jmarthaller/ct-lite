# CoinTracker Lite Backend Service

## Overview
CoinTracker Lite is a lightweight backend service that allows users to track Bitcoin addresses, fetch balances, and retrieve transaction histories using the [Blockchain.com API](https://www.blockchain.com/api/blockchain_api).

This project was developed to demonstrate my experience with backend design, API integration, and testing best practices.

---

## Features
- Add and remove Bitcoin addresses  
- List all tracked Bitcoin addresses  
- Fetch real-time balances for Bitcoin addresses  
- Retrieve transaction history for Bitcoin addresses  
- Rate limiting to prevent abuse  
- Fully tested with unit and integration tests 

---

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express  
- **API Client:** Axios  
- **Testing:** Jest, Supertest  
- **Mocking:** Jest Mocks  
- **Rate Limiting:** Express-Rate-Limit  

---

## Setup Instructions
### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/cointracker-lite.git
cd cointracker-lite
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the Server**
```sh
npm run dev
```
The server will run on http://localhost:3000.

---

## Endpoints

### 1️⃣ Bitcoin Address Management

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | /addresses         | Add a new Bitcoin address  |
| GET    | /addresses         | List all tracked addresses |
| DELETE | /addresses/:address| Remove a Bitcoin address   |

#### Example Request: Add an Address

```sh
curl -X POST http://localhost:3000/addresses \
     -H "Content-Type: application/json" \
     -d '{"address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"}'
```

##### Example Successful Response (201 Created)
```sh
{
  "success": true,
  "message": "Address added successfully."
}
```
##### Example Error Response (400 Bad Request - Invalid Address)
```sh
{
  "success": false,
  "message": "Invalid Bitcoin address format."
}
```
##### Example Error Response (409 Conflict - Address Already Exists)
```sh
{
  "success": false,
  "message": "Address already exists."
}
```

### 2️⃣ Bitcoin Balance & Transactions

| Method | Endpoint                           | Description                    |
|--------|------------------------------------|--------------------------------|
| GET    | /addresses/:address/balance        | Fetch balance for an address   |
| GET    | /addresses/:address/transactions   | Fetch transaction history      |

#### Example Request: Get Balance

```sh
curl -X GET http://localhost:3000/addresses/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/balance
```
##### Example Successful Response (200 OK)
```sh
{
  "success": true,
  "balance": 123456789
}
```
##### Example Error Response (404 Not Found - Address Not Tracked)
```sh
{
  "success": false,
  "message": "Address not found."
}
```

#### Example Request: Get Transactions (Paginated)
```sh
curl -X GET "http://localhost:3000/addresses/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/transactions"
```
##### Example Successful Response (200 OK)
```sh
{
  "success": true,
  "transactions": [
    {
      "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
      "value": 5000000,
      "timestamp": 1640995200
    },
    {
      "hash": "a3e2bcc9a5f776112497a32b05f4b9e5b2405ed9",
      "value": 2500000,
      "timestamp": 1641081600
    }
  ]
}
```
##### Example Error Response (500 Internal Server Error - API Fetch Failure)
```sh
{
  "success": false,
  "message": "Error fetching transactions from Blockchain.com."
}
```

---

## Testing
### Run All Tests
```sh
npm test
```
### What's covered
- **Unit Tests:** Individual functions (validation, API calls, etc.)
- **Integration Tests:** API endpoint tests using Supertest

---

## Design Decisions
### **1. In-Memory Storage**
- To keep things simple, all Bitcoin addresses are stored in memory instead of a database.
- If this were a production system, a database like PostgreSQL or DynamoDB would be used.

### **2. Error Handling & Rate Limiting**
- Basic validation is included to ensure valid Bitcoin addresses are stored.
- Express-Rate-Limit protects the API from abuse.

### **3. External API Integration**
- Uses Blockchain.com API to fetch real-time balances and transaction history.

---

## Potential Improvements
- Persist data to Database (preferrably Postgres or DynamoDB)
- Improve Bitcoin address validation (support Bech32 format)
- Add authentication (JWT or API keys)
- Implement WebSockets for real-time balance updates

---

Authored by Jacob Marthaller
