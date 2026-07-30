const bcrypt = require("bcryptjs");

/**
 * Génère une instruction SQL INSERT prête à coller dans phpMyAdmin
 * pour créer le premier compte admin_users, sans exposer le mot de
 * passe en clair nulle part (hash bcrypt calculé localement).
 *
 * Usage :
 *   node src/generateAdminSql.js "email@dbs-africa.org" "MotDePasseFort1" "Nom complet"
 */

const escapeSql = (value) => value.replace(/'/g, "''");

const [, , email, plainPassword, fullName = "DBS Africa Admin"] =
  process.argv;

if (!email || !plainPassword) {
  console.error(
    'Usage: node src/generateAdminSql.js "email@dbs-africa.org" "MotDePasseFort1" "Nom complet (optionnel)"'
  );
  process.exit(1);
}

if (
  plainPassword.length < 8 ||
  !/[A-Z]/.test(plainPassword) ||
  !/[a-z]/.test(plainPassword) ||
  !/\d/.test(plainPassword)
) {
  console.error(
    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
  );
  process.exit(1);
}

(async () => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const sql = `INSERT INTO admin_users (full_name, email, password, role)
VALUES ('${escapeSql(fullName)}', '${escapeSql(
    email.trim().toLowerCase()
  )}', '${hashedPassword}', 'superadmin');`;

  console.log("\nCopie l'instruction ci-dessous dans phpMyAdmin (onglet SQL) :\n");
  console.log(sql);
  console.log("");
})();
