const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/", addressController.addAddress);
router.delete("/:address", addressController.removeAddress);
router.get("/", addressController.listAddresses);

module.exports = router;