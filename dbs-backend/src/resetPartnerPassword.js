require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("./config/db");

const resetPartnerPassword = async () => {
  try {
    const identifier =
      process.env.PARTNER_RESET_IDENTIFIER
        ?.trim();

    const password =
      process.env.PARTNER_RESET_PASSWORD;

    if (!identifier || !password) {
      throw new Error(
        "L’identifiant et le nouveau mot de passe sont obligatoires."
      );
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      throw new Error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
      );
    }

    const [partners] = await db.query(
      `
        SELECT
          id,
          partner_code,
          full_name,
          email,
          status
        FROM partners
        WHERE LOWER(email) = LOWER(?)
           OR UPPER(partner_code) = UPPER(?)
        LIMIT 1
      `,
      [
        identifier,
        identifier,
      ]
    );

    if (partners.length === 0) {
      throw new Error(
        "Aucun partenaire ne correspond à cet identifiant."
      );
    }

    const partner = partners[0];

    if (partner.status !== "approved") {
      throw new Error(
        `Le compte partenaire possède le statut "${partner.status}" et ne peut pas se connecter.`
      );
    }

    const passwordHash =
      await bcrypt.hash(password, 12);

    await db.query(
      `
        UPDATE partners
        SET
          password_hash = ?,
          activated_at =
            COALESCE(activated_at, NOW()),
          activation_token_hash = NULL,
          activation_token_expires_at = NULL
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
        "PARTNER_PASSWORD_RESET",
        "Mot de passe partenaire réinitialisé administrativement.",
      ]
    );

    console.log(
      `✅ Mot de passe réinitialisé pour ${partner.full_name} (${partner.partner_code})`
    );
  } catch (error) {
    console.error(
      "❌ Réinitialisation impossible :",
      error.message
    );

    process.exitCode = 1;
  } finally {
    await db.end();
  }
};

resetPartnerPassword();