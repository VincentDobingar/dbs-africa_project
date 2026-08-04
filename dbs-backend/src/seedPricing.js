// ============================================================
// Réparation / initialisation du schéma pricing en production.
//
// Idempotent : peut être exécuté plusieurs fois sans danger.
// - Crée les tables pricing_plans / pricing_plan_features /
//   pricing_addons si elles n'existent pas encore.
// - Si pricing_plans existe avec l'ancienne colonne price_amount
//   (au lieu de price_min/price_max), migre le schéma et les
//   valeurs vers les fourchettes de prix actuelles.
// - Ne réinsère les données de départ (packs, fonctionnalités,
//   options) que si les tables sont vides.
//
// Usage (depuis dbs-backend/, avec le .env de l'environnement
// cible déjà en place) :
//   node src/seedPricing.js
// ============================================================

require("dotenv").config();
const db = require("./config/db");

const PLAN_RANGES = {
  starter: { min: 150000, max: 500000 },
  business: { min: 501000, max: 1200000 },
  enterprise: { min: 1201000, max: null },
};

async function tableExists(name) {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS count FROM information_schema.tables
     WHERE table_schema = DATABASE() AND table_name = ?`,
    [name]
  );
  return rows[0].count > 0;
}

async function columnExists(table, column) {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS count FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    [table, column]
  );
  return rows[0].count > 0;
}

async function ensureTables() {
  if (!(await tableExists("pricing_plans"))) {
    console.log("→ Création de pricing_plans...");
    await db.query(`
      CREATE TABLE pricing_plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tier VARCHAR(50) UNIQUE NOT NULL,
        name_fr VARCHAR(150) NOT NULL,
        name_en VARCHAR(150) NOT NULL,
        description_fr TEXT,
        description_en TEXT,
        price_min DECIMAL(12,2) NOT NULL,
        price_max DECIMAL(12,2) NULL,
        billing VARCHAR(50) DEFAULT 'project',
        popular BOOLEAN DEFAULT FALSE,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
  } else if (
    (await columnExists("pricing_plans", "price_amount")) &&
    !(await columnExists("pricing_plans", "price_min"))
  ) {
    console.log("→ Migration de pricing_plans (price_amount → price_min/price_max)...");
    await db.query("ALTER TABLE pricing_plans ADD COLUMN price_min DECIMAL(12,2) NULL AFTER description_en");
    await db.query("ALTER TABLE pricing_plans ADD COLUMN price_max DECIMAL(12,2) NULL AFTER price_min");

    for (const [tier, range] of Object.entries(PLAN_RANGES)) {
      await db.query(
        "UPDATE pricing_plans SET price_min = ?, price_max = ? WHERE tier = ?",
        [range.min, range.max, tier]
      );
    }

    // Si un pack n'a pas de fourchette connue, on retombe sur son
    // ancien prix fixe pour éviter une valeur NULL non voulue.
    await db.query(
      "UPDATE pricing_plans SET price_min = price_amount WHERE price_min IS NULL"
    );

    await db.query("ALTER TABLE pricing_plans MODIFY COLUMN price_min DECIMAL(12,2) NOT NULL");
    await db.query("ALTER TABLE pricing_plans DROP COLUMN price_amount");
  } else {
    console.log("✓ pricing_plans déjà à jour.");
  }

  if (!(await tableExists("pricing_plan_features"))) {
    console.log("→ Création de pricing_plan_features...");
    await db.query(`
      CREATE TABLE pricing_plan_features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plan_id INT NOT NULL,
        label_fr VARCHAR(255) NOT NULL,
        label_en VARCHAR(255) NOT NULL,
        display_order INT DEFAULT 0,
        FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
  } else {
    console.log("✓ pricing_plan_features déjà présente.");
  }

  if (!(await tableExists("pricing_addons"))) {
    console.log("→ Création de pricing_addons...");
    await db.query(`
      CREATE TABLE pricing_addons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(50) UNIQUE NOT NULL,
        name_fr VARCHAR(150) NOT NULL,
        name_en VARCHAR(150) NOT NULL,
        price_amount DECIMAL(12,2) NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
  } else {
    console.log("✓ pricing_addons déjà présente.");
  }
}

async function seedIfEmpty() {
  const [[{ count: plansCount }]] = await db.query(
    "SELECT COUNT(*) AS count FROM pricing_plans"
  );

  if (plansCount === 0) {
    console.log("→ Insertion des packs par défaut...");

    await db.query(
      `INSERT INTO pricing_plans
        (tier, name_fr, name_en, description_fr, description_en, price_min, price_max, billing, popular, display_order)
       VALUES
        ('starter', 'Starter', 'Starter', 'Idéal pour les petites structures et projets simples', 'Ideal for small businesses and simple projects', 150000, 500000, 'project', FALSE, 0),
        ('business', 'Business', 'Business', 'Pour PME et entreprises en croissance', 'For growing SMEs and companies', 501000, 1200000, 'project', TRUE, 1),
        ('enterprise', 'Enterprise', 'Enterprise', 'Solution complète pour grandes organisations', 'Full solution for large organizations', 1201000, NULL, 'project', FALSE, 2)`
    );

    await db.query(
      `INSERT INTO pricing_plan_features (plan_id, label_fr, label_en, display_order) VALUES
        ((SELECT id FROM pricing_plans WHERE tier = 'starter'), 'Site vitrine 5 pages', '5-page website', 0),
        ((SELECT id FROM pricing_plans WHERE tier = 'starter'), 'Design responsive', 'Responsive design', 1),
        ((SELECT id FROM pricing_plans WHERE tier = 'starter'), 'Formulaire de contact', 'Contact form', 2),
        ((SELECT id FROM pricing_plans WHERE tier = 'starter'), 'Support 3 mois', '3 months support', 3),

        ((SELECT id FROM pricing_plans WHERE tier = 'business'), 'Site professionnel avancé', 'Advanced business website', 0),
        ((SELECT id FROM pricing_plans WHERE tier = 'business'), 'Dashboard admin', 'Admin dashboard', 1),
        ((SELECT id FROM pricing_plans WHERE tier = 'business'), 'Intégration API', 'API integration', 2),
        ((SELECT id FROM pricing_plans WHERE tier = 'business'), 'SEO optimisé', 'SEO optimized', 3),
        ((SELECT id FROM pricing_plans WHERE tier = 'business'), 'Support 6 mois', '6 months support', 4),

        ((SELECT id FROM pricing_plans WHERE tier = 'enterprise'), 'Plateforme sur mesure', 'Custom platform', 0),
        ((SELECT id FROM pricing_plans WHERE tier = 'enterprise'), 'BI & Data dashboards', 'BI & Data dashboards', 1),
        ((SELECT id FROM pricing_plans WHERE tier = 'enterprise'), 'Architecture scalable', 'Scalable architecture', 2),
        ((SELECT id FROM pricing_plans WHERE tier = 'enterprise'), 'Sécurité avancée', 'Advanced security', 3),
        ((SELECT id FROM pricing_plans WHERE tier = 'enterprise'), 'Support premium 12 mois', 'Premium 12 months support', 4)`
    );
  } else {
    console.log(`✓ pricing_plans contient déjà ${plansCount} pack(s), pas de réinsertion.`);
  }

  const [[{ count: addonsCount }]] = await db.query(
    "SELECT COUNT(*) AS count FROM pricing_addons"
  );

  if (addonsCount === 0) {
    console.log("→ Insertion des options par défaut...");

    await db.query(
      `INSERT INTO pricing_addons (slug, name_fr, name_en, price_amount, display_order) VALUES
        ('maintenance', 'Maintenance', 'Maintenance', 150000, 0),
        ('seo', 'SEO avancé', 'Advanced SEO', 200000, 1),
        ('mobile_app', 'Application mobile', 'Mobile app', 800000, 2)`
    );
  } else {
    console.log(`✓ pricing_addons contient déjà ${addonsCount} option(s), pas de réinsertion.`);
  }
}

(async () => {
  try {
    await ensureTables();
    await seedIfEmpty();
    console.log("✅ Schéma pricing vérifié et prêt.");
  } catch (error) {
    console.error("❌ Erreur lors de la vérification du schéma pricing :", error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
})();
