const rateLimit = require("express-rate-limit");

/**
 * Connexion admin/partenaire : protège contre le brute-force.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de tentatives de connexion. Réessayez plus tard.",
  },
});

/**
 * Formulaires publics (contact, devis) : protège contre le spam.
 */
const publicFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de requêtes envoyées. Réessayez plus tard.",
  },
});

module.exports = {
  authLimiter,
  publicFormLimiter,
};
