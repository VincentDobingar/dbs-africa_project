const db = require("../config/db");

const getImageUrl = (req) => {
  if (!req.file) return null;
  return `/uploads/${req.file.filename}`;
};

exports.getAllProjects = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Projet introuvable.",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      client,
      category,
      description,
      technologies,
      project_url,
      featured,
    } = req.body;

    const image_url = getImageUrl(req);

    const [result] = await db.query(
      `
      INSERT INTO projects 
      (title, slug, client, category, description, technologies, image_url, project_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        slug,
        client,
        category,
        description,
        technologies,
        image_url,
        project_url,
        featured === "true" || featured === true ? 1 : 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Projet créé avec succès.",
      data: { id: result.insertId },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      client,
      category,
      description,
      technologies,
      project_url,
      featured,
    } = req.body;

    const [existing] = await db.query("SELECT * FROM projects WHERE id = ?", [
      req.params.id,
    ]);

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Projet introuvable.",
      });
    }

    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : existing[0].image_url;

    await db.query(
      `
      UPDATE projects
      SET title = ?, slug = ?, client = ?, category = ?, description = ?, 
          technologies = ?, image_url = ?, project_url = ?, featured = ?
      WHERE id = ?
      `,
      [
        title,
        slug,
        client,
        category,
        description,
        technologies,
        image_url,
        project_url,
        featured === "true" || featured === true ? 1 : 0,
        req.params.id,
      ]
    );

    res.json({
      success: true,
      message: "Projet mis à jour avec succès.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM projects WHERE id = ?", [
      req.params.id,
    ]);

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Projet introuvable.",
      });
    }

    res.json({
      success: true,
      message: "Projet supprimé avec succès.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};