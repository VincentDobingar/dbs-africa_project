const express = require("express");
const {
    getDashboardStats,
    getMessages,
    updateMessageStatus,
    deleteMessage,
    getQuotes,
    updateQuoteStatus,
    deleteQuote,
    getUsers,
    createUser,
    updateUserRole,
    updateUserPassword,
    deleteUser,
} = require("../controllers/adminController");

const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(requireAuth);

router.get("/dashboard", getDashboardStats);

router.get("/messages", getMessages);
router.patch("/messages/:id/status", updateMessageStatus);
router.delete("/messages/:id", deleteMessage);

router.get("/quotes", getQuotes);
router.patch("/quotes/:id/status", updateQuoteStatus);
router.delete("/quotes/:id", deleteQuote);

router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/password", updateUserPassword);
router.delete("/users/:id", deleteUser);

module.exports = router;