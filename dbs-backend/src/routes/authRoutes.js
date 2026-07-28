const express = require("express");
const { loginAdmin, getMe } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");
const { authLimiter } = require("../middlewares/rateLimiter");
const validate = require("../middlewares/validate");
const { adminLoginSchema } = require("../validators");

const router = express.Router();

router.post(
  "/login",
  authLimiter,
  validate(adminLoginSchema),
  loginAdmin
);
router.get("/me", requireAuth, getMe);

module.exports = router;