const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

// ============================================================
// HELPERS
// ============================================================

const hashActivationToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(String(token))
    .digest("hex");
};

const isStrongPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
};

const normalizeIdentifier = (identifier) => {
  if (typeof identifier !== "string") {
    return "";
  }

  return identifier.trim();
};

// ============================================================
// ACTIVATION DU COMPTE PARTENAIRE
// POST /api/partners/auth/activate
// ============================================================

const activatePartnerAccount = async (
  req,
  res
) => {
  try {
    const {
      token,
      password,
      password_confirmation,
    } = req.body;

    if (
      !token ||
      !password ||
      !password_confirmation
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le jeton, le mot de passe et sa confirmation sont obligatoires.",
      });
    }

    if (
      password !== password_confirmation
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Les deux mots de passe ne correspondent pas.",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
      });
    }

    const tokenHash =
      hashActivationToken(token);

    const [partners] = await db.query(
      `
        SELECT
          id,
          partner_code,
          full_name,
          email,
          status,
          activated_at,
          activation_token_expires_at
        FROM partners
        WHERE activation_token_hash = ?
          AND activation_token_expires_at > NOW()
        LIMIT 1
      `,
      [tokenHash]
    );

    if (partners.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Le lien d’activation est invalide ou a expiré.",
      });
    }

    const partner = partners[0];

    if (partner.status !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          "Cette demande de partenariat n’est pas encore approuvée.",
      });
    }

    if (partner.activated_at) {
      return res.status(409).json({
        success: false,
        message:
          "Ce compte partenaire est déjà activé.",
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 12);

    await db.query(
      `
        UPDATE partners
        SET
          password_hash = ?,
          activation_token_hash = NULL,
          activation_token_expires_at = NULL,
          activated_at = NOW()
        WHERE id = ?
      `,
      [
        passwordHash,
        partner.id,
      ]
    );

    await db.query(
      `
        INSERT INTO partner_activity_logs (
          partner_id,
          action,
          description
        )
        VALUES (?, ?, ?)
      `,
      [
        partner.id,
        "PARTNER_ACCOUNT_ACTIVATED",
        "Le partenaire a activé son compte.",
      ]
    );

    return res.json({
      success: true,
      message:
        "Votre compte partenaire a été activé. Vous pouvez maintenant vous connecter.",
      data: {
        partner_code:
          partner.partner_code,
        full_name:
          partner.full_name,
        email:
          partner.email,
      },
    });
  } catch (error) {
    console.error(
      "Erreur activation partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant l’activation du compte partenaire.",
    });
  }
};

// ============================================================
// CONNEXION PARTENAIRE
// POST /api/partners/auth/login
// ============================================================

const loginPartner = async (req, res) => {
  try {
    const {
      identifier,
      password,
    } = req.body;

    const normalizedIdentifier =
      normalizeIdentifier(identifier);

    if (
      !normalizedIdentifier ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "L’email ou le code partenaire et le mot de passe sont obligatoires.",
      });
    }

    if (!process.env.PARTNER_JWT_SECRET) {
      console.error(
        "PARTNER_JWT_SECRET absent du fichier .env"
      );

      return res.status(500).json({
        success: false,
        message:
          "La configuration de l’authentification partenaire est incomplète.",
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
          password_hash,
          phone,
          country,
          city,
          status,
          level,
          commission_rate,
          activated_at
        FROM partners
        WHERE LOWER(email) = LOWER(?)
           OR UPPER(partner_code) = UPPER(?)
        LIMIT 1
      `,
      [
        normalizedIdentifier,
        normalizedIdentifier,
      ]
    );

    if (partners.length === 0) {
      return res.status(401).json({
        success: false,
        message:
          "Identifiants partenaire incorrects.",
      });
    }

    const partner = partners[0];

    if (partner.status === "pending") {
      return res.status(403).json({
        success: false,
        message:
          "Votre demande de partenariat est toujours en cours d’examen.",
      });
    }

    if (partner.status === "rejected") {
      return res.status(403).json({
        success: false,
        message:
          "Votre demande de partenariat n’a pas été approuvée.",
      });
    }

    if (partner.status === "suspended") {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte partenaire est suspendu. Veuillez contacter DBS Africa.",
      });
    }

    if (partner.status !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte partenaire n’est pas autorisé.",
      });
    }

    if (
      !partner.password_hash ||
      !partner.activated_at
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Votre compte partenaire n’a pas encore été activé.",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        partner.password_hash
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Identifiants partenaire incorrects.",
      });
    }

    const accessToken = jwt.sign(
      {
        partner_id: partner.id,
        partner_code:
          partner.partner_code,
        email:
          partner.email,
        type:
          "partner",
      },
      process.env.PARTNER_JWT_SECRET,
      {
        expiresIn:
          process.env
            .PARTNER_JWT_EXPIRES_IN ||
          "8h",
      }
    );

    await db.query(
      `
        UPDATE partners
        SET last_login_at = NOW()
        WHERE id = ?
      `,
      [partner.id]
    );

    await db.query(
      `
        INSERT INTO partner_activity_logs (
          partner_id,
          action,
          description
        )
        VALUES (?, ?, ?)
      `,
      [
        partner.id,
        "PARTNER_LOGIN",
        "Connexion réussie à l’espace partenaire.",
      ]
    );

    return res.json({
      success: true,
      message:
        "Connexion partenaire réussie.",
      token: accessToken,
      partner: {
        id:
          partner.id,

        partner_code:
          partner.partner_code,

        partner_type:
          partner.partner_type,

        full_name:
          partner.full_name,

        company_name:
          partner.company_name,

        email:
          partner.email,

        phone:
          partner.phone,

        country:
          partner.country,

        city:
          partner.city,

        level:
          partner.level,

        commission_rate:
          partner.commission_rate,
      },
    });
  } catch (error) {
    console.error(
      "Erreur connexion partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant la connexion partenaire.",
    });
  }
};

// ============================================================
// PROFIL ET PERFORMANCES DU PARTENAIRE CONNECTÉ
// GET /api/partners/auth/me
// ============================================================

const getPartnerProfile = async (
  req,
  res
) => {
  try {
    if (!req.partner?.id) {
      return res.status(401).json({
        success: false,
        message:
          "Session partenaire invalide.",
      });
    }

    const [rows] = await db.query(
      `
        SELECT
          p.id,
          p.partner_code,
          p.partner_type,
          p.full_name,
          p.company_name,
          p.email,
          p.country_code,
          p.phone,
          p.country,
          p.city,
          p.address,
          p.profession,
          p.experience,
          p.preferred_services,
          p.coverage_areas,
          p.status,
          p.level,
          p.commission_rate,
          p.approved_at,
          p.activated_at,
          p.last_login_at,
          p.created_at,

          COALESCE(
            pp.total_leads,
            0
          ) AS total_leads,

          COALESCE(
            pp.new_leads,
            0
          ) AS new_leads,

          COALESCE(
            pp.active_leads,
            0
          ) AS active_leads,

          COALESCE(
            pp.won_leads,
            0
          ) AS won_leads,

          COALESCE(
            pp.lost_leads,
            0
          ) AS lost_leads,

          COALESCE(
            pp.generated_revenue,
            0
          ) AS generated_revenue,

          COALESCE(
            pp.unpaid_commissions,
            0
          ) AS unpaid_commissions,

          COALESCE(
            pp.paid_commissions,
            0
          ) AS paid_commissions,

          COALESCE(
            pp.conversion_rate,
            0
          ) AS conversion_rate

        FROM partners p

        LEFT JOIN partner_performance pp
          ON pp.partner_id = p.id

        WHERE p.id = ?
        LIMIT 1
      `,
      [req.partner.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Profil partenaire introuvable.",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(
      "Erreur profil partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le chargement du profil partenaire.",
    });
  }
};

module.exports = {
  activatePartnerAccount,
  loginPartner,
  getPartnerProfile,
};