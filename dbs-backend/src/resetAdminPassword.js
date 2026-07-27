require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("./config/db");

const resetAdminPassword = async () => {
  try {
    const email =
      process.env.ADMIN_RESET_EMAIL
        ?.trim()
        .toLowerCase();

    const password =
      process.env.ADMIN_RESET_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_RESET_EMAIL et ADMIN_RESET_PASSWORD sont obligatoires."
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

    const [admins] = await db.query(
      `
        SELECT id, full_name, email, role
        FROM admin_users
        WHERE LOWER(email) = LOWER(?)
        LIMIT 1
      `,
      [email]
    );

    if (admins.length === 0) {
      throw new Error(
        `Aucun administrateur trouvé avec l’adresse ${email}.`
      );
    }

    const passwordHash =
      await bcrypt.hash(password, 12);

    await db.query(
      `
        UPDATE admin_users
        SET password = ?
        WHERE id = ?
      `,
      [
        passwordHash,
        admins[0].id,
      ]
    );

    console.log(
      `✅ Mot de passe réinitialisé pour ${admins[0].email}`
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

resetAdminPassword();