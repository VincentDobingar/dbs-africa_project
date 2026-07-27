const bcrypt = require("bcryptjs");
const db = require("./config/db");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    const fullName = process.env.ADMIN_SEED_NAME || "DBS Africa Admin";
    const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
    const plainPassword = process.env.ADMIN_SEED_PASSWORD;
    const role = "superadmin";

    if (!email || !plainPassword) {
      throw new Error(
        "ADMIN_SEED_EMAIL et ADMIN_SEED_PASSWORD sont obligatoires (voir .env)."
      );
    }

    if (
      plainPassword.length < 8 ||
      !/[A-Z]/.test(plainPassword) ||
      !/[a-z]/.test(plainPassword) ||
      !/\d/.test(plainPassword)
    ) {
      throw new Error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
      );
    }

    const [existing] = await db.query(
      "SELECT id FROM admin_users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      console.log("ℹ️ Admin existe déjà :", email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db.query(
      `INSERT INTO admin_users
       (full_name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [fullName, email, hashedPassword, role]
    );

    console.log("✅ Admin créé avec succès");
    console.log("Email :", email);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur seed admin :", error.message);
    process.exit(1);
  }
};

seedAdmin();