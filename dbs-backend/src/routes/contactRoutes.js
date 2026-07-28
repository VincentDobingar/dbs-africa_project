const express = require("express");

const {
  createContactMessage,
  getContactMessages,
} = require("../controllers/contactController");

const { requireAuth } = require("../middlewares/authMiddleware");
const { publicFormLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/", publicFormLimiter, createContactMessage);
router.get("/", requireAuth, getContactMessages);

module.exports = router;