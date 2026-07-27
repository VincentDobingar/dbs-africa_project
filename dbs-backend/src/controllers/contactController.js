// controllers/contactController.js

const db = require("../config/db");

const createContactMessage = async (req, res) => {
  try {
    const {
      full_name,
      organization,
      email,
      country,
      country_code,
      phone,
      subject,
      message,
    } = req.body;

    if (
      !full_name?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Nom, email et message sont obligatoires.",
      });
    }

    const [result] = await db.query(
      `
        INSERT INTO contact_messages (
          full_name,
          organization,
          email,
          country,
          country_code,
          phone,
          subject,
          message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        full_name.trim(),
        organization?.trim() || null,
        email.trim(),
        country?.trim() || null,
        country_code?.trim() || null,
        phone?.trim() || null,
        subject?.trim() || null,
        message.trim(),
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Message envoyé avec succès.",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    console.error("Erreur contact complète :", {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur lors de l'envoi du message.",
    });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
        SELECT
          id,
          full_name,
          organization,
          email,
          country,
          country_code,
          phone,
          subject,
          message,
          status,
          created_at
        FROM contact_messages
        ORDER BY created_at DESC
      `
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Erreur liste contacts :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
};