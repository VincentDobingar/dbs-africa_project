// ============================================================
// DBS AFRICA API
// Fichier principal du serveur Express
// ============================================================

// Charger les variables d’environnement avant les autres modules
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Initialisation de la connexion MySQL
require("./config/db");

// ============================================================
// IMPORTATION DES ROUTES
// ============================================================

const contactRoutes = require("./routes/contactRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");
const projectRoutes = require("./routes/projectRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const geoRoutes = require("./routes/geoRoutes");

// ============================================================
// INITIALISATION EXPRESS
// ============================================================

const app = express();

/*
 * Le backend tourne derrière Apache/Passenger sur cPanel.
 * Cette configuration permet à Express de reconnaître correctement
 * le protocole HTTPS et l’adresse IP réelle du client.
 */
app.set("trust proxy", 1);

// ============================================================
// CONFIGURATION CORS
// ============================================================

const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://dbs-africa.org",
  "https://www.dbs-africa.org",
];

const environmentOrigins = (
  process.env.FRONTEND_URLS ||
  process.env.FRONTEND_URL ||
  ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [
  ...new Set([
    ...defaultOrigins,
    ...environmentOrigins,
  ]),
].map((origin) => origin.replace(/\/+$/, ""));

const corsOptions = {
  origin(origin, callback) {
    /*
     * Les requêtes provenant de curl, Postman, PowerShell
     * ou d’autres services backend peuvent ne pas avoir Origin.
     */
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/+$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.warn(`⚠️ Origine CORS refusée : ${origin}`);

    const corsError = new Error(
      "Origine non autorisée par la politique CORS."
    );

    corsError.status = 403;

    return callback(corsError);
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
  ],

  exposedHeaders: [
    "Content-Length",
    "Content-Type",
  ],

  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

// ============================================================
// MIDDLEWARES GLOBAUX
// ============================================================

// CORS doit être placé avant les routes
app.use(cors(corsOptions));

/*
 * Il n’est pas nécessaire d’ajouter app.options("*", ...).
 * Le middleware CORS répond déjà automatiquement aux requêtes OPTIONS.
 */

// Sécurité HTTP
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// Journalisation HTTP
app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? "combined"
      : "dev"
  )
);

// Lecture des requêtes JSON
app.use(
  express.json({
    limit: "10mb",
  })
);

// Lecture des formulaires URL-encoded
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/*
 * Ne pas ajouter de redirection HTTPS dans Express.
 * HTTPS est déjà géré par Apache/cPanel.
 *
 * Une redirection ici pourrait produire un code 307 ou 308
 * sans les bons en-têtes CORS.
 */

// ============================================================
// FICHIERS STATIQUES
// ============================================================

const uploadsDirectory = path.join(
  __dirname,
  "../uploads"
);

app.use(
  "/uploads",
  express.static(uploadsDirectory, {
    setHeaders(response) {
      response.setHeader(
        "Cross-Origin-Resource-Policy",
        "cross-origin"
      );

      response.setHeader(
        "Access-Control-Allow-Origin",
        "*"
      );
    },
  })
);

// ============================================================
// ROUTE PRINCIPALE ET SANTÉ DE L’API
// ============================================================

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "API DBS Africa opérationnelle",
  });
});

app.get("/health", (req, res) => {
  return res.json({
    success: true,
    status: "OK",
    environment:
      process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// ROUTES API
// ============================================================

app.use("/api/contact", contactRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blog-posts", blogPostRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/geo", geoRoutes);

// ============================================================
// ROUTE INTROUVABLE
// ============================================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message:
      `Route introuvable : ${req.method} ${req.originalUrl}`,
  });
});

// ============================================================
// GESTION GLOBALE DES ERREURS
// ============================================================

app.use((error, req, res, next) => {
  console.error("❌ Erreur serveur :", error);

  if (res.headersSent) {
    return next(error);
  }

  const status =
    error.status ||
    error.statusCode ||
    500;

  return res.status(status).json({
    success: false,
    message:
      status === 500
        ? "Une erreur interne est survenue."
        : error.message,
  });
});

// ============================================================
// DÉMARRAGE DU SERVEUR
// ============================================================

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `✅ API DBS Africa démarrée sur le port ${PORT}`
  );

  console.log(
    "✅ Origines CORS autorisées :",
    allowedOrigins
  );

  console.log(
    `✅ Répertoire uploads : ${uploadsDirectory}`
  );
});

// ============================================================
// ARRÊT PROPRE DU SERVEUR
// ============================================================

const shutdown = (signal) => {
  console.log(
    `\n${signal} reçu. Arrêt du serveur...`
  );

  server.close(() => {
    console.log("✅ Serveur HTTP arrêté.");
    process.exit(0);
  });
};

process.on(
  "SIGINT",
  () => shutdown("SIGINT")
);

process.on(
  "SIGTERM",
  () => shutdown("SIGTERM")
);