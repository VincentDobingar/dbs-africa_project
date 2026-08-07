// ============================================================
// Attache une image de couverture à chaque article de blog qui en
// a besoin (formations + actualités dont l'image référencée était
// manquante/cassée).
//
// Copie l'image correspondante depuis assets/blog-images/ (suivi
// par git) vers uploads/ (non versionné, servi statiquement), puis
// met à jour blog_posts.image_url. Idempotent : peut être exécuté
// plusieurs fois sans risque, y compris si l'article ou le fichier
// a déjà été traité.
//
// Usage (depuis dbs-backend/, avec le .env de l'environnement
// cible déjà en place) :
//   node src/attachBlogImages.js
// ============================================================

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const db = require("./config/db");

const ASSETS_DIR = path.join(__dirname, "../assets/blog-images");
const UPLOADS_DIR = path.join(__dirname, "../uploads");

const IMAGES = [
  {
    slug: "formation-power-bi-reporting-decisionnel",
    filename: "formation-power-bi-reporting-decisionnel.png",
  },
  {
    slug: "formation-developpement-web-react-nodejs",
    filename: "formation-developpement-web-react-nodejs.png",
  },
  {
    slug: "formation-cybersecurite-systeme-information",
    filename: "formation-cybersecurite-systeme-information.png",
  },
  {
    slug: "transformation-digitale-reussie",
    filename: "transformation-digitale-reussie.png",
  },
  {
    slug: "automatisation-rapports-sql-powerbi",
    filename: "automatisation-rapports-sql-powerbi.png",
  },
  {
    slug: "react-nodejs-applications-modernes",
    filename: "react-nodejs-applications-modernes.png",
  },
  {
    slug: "data-decision-strategique",
    filename: "data-decision-strategique.png",
  },
  {
    slug: "telecom-mobile-money-afrique",
    filename: "telecom-mobile-money-afrique.png",
  },
  {
    slug: "power-bi-reporting-moderne",
    filename: "power-bi-reporting-moderne.png",
  },
];

(async () => {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    for (const image of IMAGES) {
      const sourcePath = path.join(ASSETS_DIR, image.filename);

      if (!fs.existsSync(sourcePath)) {
        console.log(`⚠️  Fichier source introuvable, ignoré : ${image.filename}`);
        continue;
      }

      const destPath = path.join(UPLOADS_DIR, image.filename);
      fs.copyFileSync(sourcePath, destPath);

      const [result] = await db.query(
        "UPDATE blog_posts SET image_url = ? WHERE slug = ?",
        [`/uploads/${image.filename}`, image.slug]
      );

      if (result.affectedRows > 0) {
        console.log(`→ Image attachée : ${image.slug}`);
      } else {
        console.log(`⚠️  Aucun article avec ce slug : ${image.slug}`);
      }
    }

    console.log("✅ Images des articles vérifiées et prêtes.");
  } catch (error) {
    console.error("❌ Erreur lors de l'attachement des images :", error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
})();
