const express = require("express");
const {
  createQuoteRequest,
  getQuoteRequests,
} = require("../controllers/quoteController");

const router = express.Router();

router.post("/", createQuoteRequest);
router.get("/", getQuoteRequests);

module.exports = router;