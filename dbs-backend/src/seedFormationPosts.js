// ============================================================
// Publication des articles "Formation" dans blog_posts.
//
// Idempotent : peut être exécuté plusieurs fois sans danger. Un
// article n'est inséré que si aucun autre avec le même slug
// n'existe déjà (les slugs sont uniques dans blog_posts).
//
// Usage (depuis dbs-backend/, avec le .env de l'environnement
// cible déjà en place) :
//   node src/seedFormationPosts.js
// ============================================================

require("dotenv").config();
const db = require("./config/db");

const POSTS = [
  {
    title:
      "Formation Power BI : de l'analyse de données au reporting décisionnel",
    slug: "formation-power-bi-reporting-decisionnel",
    summary:
      "Apprenez à modéliser vos données, construire des tableaux de bord percutants et automatiser vos rapports avec Power BI.",
    content:
      "Cette formation s'adresse aux professionnels souhaitant exploiter pleinement Power BI pour transformer leurs données en tableaux de bord décisionnels. Le programme couvre la connexion et le nettoyage des données avec Power Query, la modélisation relationnelle, l'écriture de mesures DAX, la conception de rapports interactifs et le partage sécurisé des tableaux de bord au sein de l'organisation. À l'issue de la formation, les participants sont capables de construire de façon autonome des reportings fiables, automatisés et adaptés aux besoins de pilotage de leur structure. Elle s'adresse aux analystes, chargés de suivi-évaluation, contrôleurs de gestion et toute personne manipulant régulièrement des données. Organisée en présentiel ou à distance, elle alterne apports théoriques et exercices pratiques sur des cas concrets. Contactez-nous pour connaître les prochaines sessions et modalités d'inscription.",
  },
  {
    title: "Formation Développement Web avec React & Node.js",
    slug: "formation-developpement-web-react-nodejs",
    summary:
      "Une formation pratique pour concevoir des applications web modernes, du frontend React à l'API Node.js.",
    content:
      "Cette formation propose une introduction complète au développement d'applications web modernes avec React côté frontend et Node.js côté backend. Les participants apprennent à structurer une interface utilisateur avec des composants réutilisables, gérer l'état d'une application, consommer et construire des API REST, et connecter leur application à une base de données. Le programme met l'accent sur les bonnes pratiques de développement (organisation du code, gestion de version, sécurité des API) à travers la réalisation d'un projet pratique de bout en bout. Elle s'adresse aux développeurs juniors, étudiants en informatique et professionnels souhaitant se reconvertir vers le développement web. Un accompagnement personnalisé est proposé pour adapter le contenu au niveau des participants. Contactez-nous pour connaître les prochaines sessions et modalités d'inscription.",
  },
  {
    title:
      "Formation Cybersécurité : protéger efficacement son système d'information",
    slug: "formation-cybersecurite-systeme-information",
    summary:
      "Sensibilisation et bonnes pratiques pour anticiper les risques et protéger durablement votre système d'information.",
    content:
      "Cette formation sensibilise les équipes aux risques informatiques actuels et transmet les bonnes pratiques essentielles pour protéger un système d'information. Le programme aborde la reconnaissance des tentatives de phishing et d'ingénierie sociale, la gestion des mots de passe et des accès, les principes de sécurisation des postes de travail et des réseaux, ainsi que les premiers réflexes à adopter en cas d'incident. Une attention particulière est portée aux cas pratiques issus de contextes réels d'entreprises et d'organisations en Afrique. Elle s'adresse aux collaborateurs non techniques comme aux équipes IT souhaitant structurer une démarche de sensibilisation à la sécurité au sein de leur organisation. Contactez-nous pour connaître les prochaines sessions et modalités d'inscription.",
  },
];

(async () => {
  try {
    for (const post of POSTS) {
      const [existing] = await db.query(
        "SELECT id FROM blog_posts WHERE slug = ?",
        [post.slug]
      );

      if (existing.length > 0) {
        console.log(`✓ Déjà présent, ignoré : ${post.title}`);
        continue;
      }

      const [result] = await db.query(
        `INSERT INTO blog_posts (title, slug, summary, content, image_url, status)
         VALUES (?, ?, ?, ?, NULL, 'published')`,
        [post.title, post.slug, post.summary, post.content]
      );

      console.log(`→ Publié (id=${result.insertId}) : ${post.title}`);
    }

    console.log("✅ Articles de formation vérifiés et prêts.");
  } catch (error) {
    console.error("❌ Erreur lors de la publication des articles :", error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
})();
