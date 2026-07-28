const express = require("express");
const {
  createQuoteRequest,
  getQuoteRequests,
} = require("../controllers/quoteController");

const { requireAuth } = require("../middlewares/authMiddleware");
const { publicFormLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/", publicFormLimiter, createQuoteRequest);
router.get("/", requireAuth, getQuoteRequests);

module.exports = router;