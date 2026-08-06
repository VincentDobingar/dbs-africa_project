const express = require("express");

const { getClientLocation } = require("../controllers/geoController");
const { geoLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.get("/", geoLimiter, getClientLocation);

module.exports = router;
