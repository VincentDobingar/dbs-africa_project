const jwt = require("jsonwebtoken");
const db = require("../config/db");

const requirePartnerAuth = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Accès partenaire non autorisé. Token manquant.",
      });
    }

    if (
      !process.env.PARTNER_JWT_SECRET
    ) {
      console.error(
        "PARTNER_JWT_SECRET absent du fichier .env"
      );

      return res.status(500).json({
        success: false,
        message:
          "Configuration de l’authentification partenaire incomplète.",
      });
    }

    const token =
      authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Token partenaire manquant.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.PARTNER_JWT_SECRET
    );

    if (
      decoded.type !== "partner" ||
      !decoded.partner_id
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Token partenaire invalide.",
      });
    }

    const [partners] = await db.query(
      `
        SELECT
          id,
          partner_code,
          partner_type,
          full_name,
          company_name,
          email,
          country,
          status,
          level,
          commission_rate,
          activated_at
        FROM partners
        WHERE id = ?
        LIMIT 1
      `,
      [decoded.partner_id]
    );

    if (partners.length === 0) {
      return res.status(401).json({
        success: false,
        message:
          "Compte partenaire introuvable.",
      });
    }

    const partner = partners[0];

    if (partner.status !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte partenaire n’est pas actif.",
      });
    }

    if (!partner.activated_at) {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte partenaire doit être activé.",
      });
    }

    req.partner = partner;

    return next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Votre session partenaire a expiré.",
      });
    }

    if (
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Token partenaire invalide.",
      });
    }

    console.error(
      "Erreur authentification partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant l’authentification partenaire.",
    });
  }
};

module.exports = {
  requirePartnerAuth,
};