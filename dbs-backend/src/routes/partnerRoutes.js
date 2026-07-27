const express = require("express");

const {
  registerPartner,
  getPartners,
  getPartnerById,
  updatePartnerStatus,
  updatePartnerSettings,
  getPartnerStatistics,
} = require(
  "../controllers/partnerController"
);

const {
  activatePartnerAccount,
  loginPartner,
  getPartnerProfile,
} = require(
  "../controllers/partnerAuthController"
);

const {
  createPartnerLead,
  getMyPartnerLeads,
  getMyPartnerLeadById,
  getAdminPartnerLeads,
  updatePartnerLeadStatus,
} = require(
  "../controllers/partnerLeadController"
);

const {
  getMyCommissions,
  getAdminCommissions,
  approveCommission,
  payCommission,
} = require(
  "../controllers/partnerCommissionController"
);

const {
  requireAuth,
} = require(
  "../middlewares/authMiddleware"
);

const {
  requirePartnerAuth,
} = require(
  "../middlewares/partnerAuthMiddleware"
);

const router = express.Router();

// ============================================================
// ROUTES PUBLIQUES
// ============================================================

// Inscription d’un nouveau partenaire
router.post(
  "/register",
  registerPartner
);

// Activation après approbation
router.post(
  "/auth/activate",
  activatePartnerAccount
);

// Connexion du partenaire
router.post(
  "/auth/login",
  loginPartner
);

// ============================================================
// ESPACE PARTENAIRE PROTÉGÉ
// ============================================================

// Profil et performances du partenaire connecté
router.get(
  "/auth/me",
  requirePartnerAuth,
  getPartnerProfile
);

// ============================================================
// PROSPECTS DU PARTENAIRE CONNECTÉ
// ============================================================

router.post(
  "/leads",
  requirePartnerAuth,
  createPartnerLead
);

router.get(
  "/leads",
  requirePartnerAuth,
  getMyPartnerLeads
);

router.get(
  "/leads/:id",
  requirePartnerAuth,
  getMyPartnerLeadById
);

// ============================================================
// COMMISSIONS DU PARTENAIRE CONNECTÉ
// ============================================================

router.get(
  "/commissions",
  requirePartnerAuth,
  getMyCommissions
);

// ============================================================
// GESTION ADMINISTRATIVE DES PROSPECTS
// ============================================================

router.get(
  "/admin/leads",
  requireAuth,
  getAdminPartnerLeads
);

router.patch(
  "/admin/leads/:id/status",
  requireAuth,
  updatePartnerLeadStatus
);

// ============================================================
// GESTION ADMINISTRATIVE DES COMMISSIONS
// ============================================================

router.get(
  "/admin/commissions",
  requireAuth,
  getAdminCommissions
);

router.patch(
  "/admin/commissions/:id/approve",
  requireAuth,
  approveCommission
);

router.patch(
  "/admin/commissions/:id/pay",
  requireAuth,
  payCommission
);

// ============================================================
// ROUTES D’ADMINISTRATION PROTÉGÉES
// ============================================================

// Statistiques globales
router.get(
  "/statistics/summary",
  requireAuth,
  getPartnerStatistics
);

// Liste des partenaires
router.get(
  "/",
  requireAuth,
  getPartners
);

// Détail d’un partenaire
router.get(
  "/:id",
  requireAuth,
  getPartnerById
);

// Approbation, rejet ou suspension
router.patch(
  "/:id/status",
  requireAuth,
  updatePartnerStatus
);

// Niveau et taux de commission
router.patch(
  "/:id/settings",
  requireAuth,
  updatePartnerSettings
);

module.exports = router;