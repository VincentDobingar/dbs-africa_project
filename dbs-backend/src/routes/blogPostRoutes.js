const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const blogPostController = require("../controllers/blogPostController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");

const requireAdmin = [requireAuth, requireRole("admin", "superadmin")];

router.get("/", blogPostController.getAllBlogPosts);
router.get("/:id", blogPostController.getBlogPostById);
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  blogPostController.createBlogPost
);
router.put(
  "/:id",
  requireAdmin,
  upload.single("image"),
  blogPostController.updateBlogPost
);
router.delete("/:id", requireAdmin, blogPostController.deleteBlogPost);

module.exports = router;