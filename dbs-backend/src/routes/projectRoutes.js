const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const projectController = require("../controllers/projectController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");

const requireAdmin = [requireAuth, requireRole("admin", "superadmin")];

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  projectController.createProject
);
router.put(
  "/:id",
  requireAdmin,
  upload.single("image"),
  projectController.updateProject
);
router.delete("/:id", requireAdmin, projectController.deleteProject);

module.exports = router;