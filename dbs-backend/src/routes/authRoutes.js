const express = require("express");
const { loginAdmin, getMe } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", requireAuth, getMe);

module.exports = router;