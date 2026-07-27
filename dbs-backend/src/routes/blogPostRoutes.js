const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const blogPostController = require("../controllers/blogPostController");

router.get("/", blogPostController.getAllBlogPosts);
router.get("/:id", blogPostController.getBlogPostById);
router.post("/", upload.single("image"), blogPostController.createBlogPost);
router.put("/:id", upload.single("image"), blogPostController.updateBlogPost);
router.delete("/:id", blogPostController.deleteBlogPost);

module.exports = router;