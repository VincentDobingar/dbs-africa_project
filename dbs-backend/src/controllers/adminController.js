const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[contactStats]] = await db.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_items,
        SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) AS read_items,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) AS archived_items
      FROM contact_messages
    `);

    const [[quoteStats]] = await db.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_items,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_items,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_items,
        SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) AS archived_items
      FROM quote_requests
    `);

    res.json({
      success: true,
      data: {
        contacts: contactStats,
        quotes: quoteStats,
      },
    });
  } catch (error) {
    console.error("Erreur dashboard admin:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM contact_messages
      ORDER BY created_at DESC
    `);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Erreur messages admin:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["new", "read", "archived"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Statut invalide.",
      });
    }

    await db.query(
      "UPDATE contact_messages SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({
      success: true,
      message: "Statut du message mis à jour.",
    });
  } catch (error) {
    console.error("Erreur update message:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM contact_messages WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Message supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression message:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const getQuotes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM quote_requests
      ORDER BY created_at DESC
    `);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Erreur devis admin:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["new", "in_progress", "completed", "archived"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Statut invalide.",
      });
    }

    await db.query(
      "UPDATE quote_requests SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({
      success: true,
      message: "Statut du devis mis à jour.",
    });
  } catch (error) {
    console.error("Erreur update devis:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM quote_requests WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Demande de devis supprimée avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression devis:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, full_name, email, role, created_at
      FROM admin_users
      ORDER BY created_at DESC
    `);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Erreur users admin:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const createUser = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nom, email et mot de passe sont obligatoires.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO admin_users (full_name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [full_name, email, hashedPassword, role || "admin"]
    );

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès.",
    });
  } catch (error) {
    console.error("Erreur création utilisateur:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Cet email existe déjà.",
      });
    }

    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "superadmin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Rôle invalide.",
      });
    }

    await db.query("UPDATE admin_users SET role = ? WHERE id = ?", [role, id]);

    res.json({
      success: true,
      message: "Rôle mis à jour.",
    });
  } catch (error) {
    console.error("Erreur rôle utilisateur:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mot de passe invalide.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("UPDATE admin_users SET password = ? WHERE id = ?", [
      hashedPassword,
      id,
    ]);

    res.json({
      success: true,
      message: "Mot de passe mis à jour.",
    });
  } catch (error) {
    console.error("Erreur mot de passe:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number(id) === Number(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "Vous ne pouvez pas supprimer votre propre compte.",
      });
    }

    await db.query("DELETE FROM admin_users WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Utilisateur supprimé.",
    });
  } catch (error) {
    console.error("Erreur suppression utilisateur:", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
};

module.exports = {
    getDashboardStats,
    getMessages,
    updateMessageStatus,
    deleteMessage,
    getQuotes,
    updateQuoteStatus,
    deleteQuote,
    getUsers,
    createUser,
    updateUserRole,
    updateUserPassword,
    deleteUser,
};