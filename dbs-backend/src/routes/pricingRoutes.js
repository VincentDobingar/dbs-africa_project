const express = require("express");

const pricingController = require("../controllers/pricingController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");

const router = express.Router();

const requireAdmin = [requireAuth, requireRole("admin", "superadmin")];

// Lecture publique (page /pricing)
router.get("/", pricingController.getPublicPricing);

// Administration — packs
router.get(
  "/admin/plans",
  requireAdmin,
  pricingController.getAdminPlans
);
router.post(
  "/admin/plans",
  requireAdmin,
  pricingController.createPlan
);
router.put(
  "/admin/plans/:id",
  requireAdmin,
  pricingController.updatePlan
);
router.delete(
  "/admin/plans/:id",
  requireAdmin,
  pricingController.deletePlan
);

// Administration — options (addons)
router.get(
  "/admin/addons",
  requireAdmin,
  pricingController.getAdminAddons
);
router.post(
  "/admin/addons",
  requireAdmin,
  pricingController.createAddon
);
router.put(
  "/admin/addons/:id",
  requireAdmin,
  pricingController.updateAddon
);
router.delete(
  "/admin/addons/:id",
  requireAdmin,
  pricingController.deleteAddon
);

module.exports = router;
