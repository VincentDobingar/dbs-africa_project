const express = require("express");

const {
  createContactMessage,
  getContactMessages,
} = require("../controllers/contactController");

const { requireAuth } = require("../middlewares/authMiddleware");
const { publicFormLimiter } = require("../middlewares/rateLimiter");
const validate = require("../middlewares/validate");
const { contactSchema } = require("../validators");

const router = express.Router();

router.post(
  "/",
  publicFormLimiter,
  validate(contactSchema),
  createContactMessage
);
router.get("/", requireAuth, getContactMessages);

module.exports = router;