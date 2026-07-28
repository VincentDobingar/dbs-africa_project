const express = require("express");
const {
  createQuoteRequest,
  getQuoteRequests,
} = require("../controllers/quoteController");

const { requireAuth } = require("../middlewares/authMiddleware");
const { publicFormLimiter } = require("../middlewares/rateLimiter");
const validate = require("../middlewares/validate");
const { quoteSchema } = require("../validators");

const router = express.Router();

router.post(
  "/",
  publicFormLimiter,
  validate(quoteSchema),
  createQuoteRequest
);
router.get("/", requireAuth, getQuoteRequests);

module.exports = router;