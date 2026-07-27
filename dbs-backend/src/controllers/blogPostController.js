const db = require("../config/db");

const getImageUrl = (req) => {
  if (!req.file) return null;
  return `/uploads/${req.file.filename}`;
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM blog_posts ORDER BY created_at DESC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Erreur getAllBlogPosts:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM blog_posts WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Actualité introuvable.",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Erreur getBlogPostById:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.createBlogPost = async (req, res) => {
  try {
    const { title, slug, summary, content, status } = req.body;
    const image_url = getImageUrl(req);

    const [result] = await db.query(
      `
      INSERT INTO blog_posts 
      (title, slug, summary, content, image_url, status)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [title, slug, summary, content, image_url, status || "draft"]
    );

    res.status(201).json({
      success: true,
      message: "Actualité créée avec succès.",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Erreur createBlogPost:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const { title, slug, summary, content, status } = req.body;

    const [existing] = await db.query("SELECT * FROM blog_posts WHERE id = ?", [
      req.params.id,
    ]);

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Actualité introuvable.",
      });
    }

    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : existing[0].image_url;

    await db.query(
      `
      UPDATE blog_posts
      SET title = ?, slug = ?, summary = ?, content = ?, image_url = ?, status = ?
      WHERE id = ?
      `,
      [
        title,
        slug,
        summary,
        content,
        image_url,
        status || existing[0].status,
        req.params.id,
      ]
    );

    res.json({
      success: true,
      message: "Actualité mise à jour avec succès.",
    });
  } catch (error) {
    console.error("Erreur updateBlogPost:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM blog_posts WHERE id = ?", [
      req.params.id,
    ]);

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Actualité introuvable.",
      });
    }

    res.json({
      success: true,
      message: "Actualité supprimée avec succès.",
    });
  } catch (error) {
    console.error("Erreur deleteBlogPost:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};