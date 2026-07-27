const db = require("../config/db");

const createQuoteRequest = async (req, res) => {
  try {
    const {
      client_type,
      company_name,
      contact_name,
      email,
      country,
      phone,
      sector,
      services,
      currency,
      budget,
      timeline,
      description,
    } = req.body;

    if (!client_type || !email || !description) {
      return res.status(400).json({
        success: false,
        message: "Type de client, email et description sont obligatoires.",
      });
    }

    if (client_type === "individual" && !contact_name) {
      return res.status(400).json({
        success: false,
        message: "Le nom complet est obligatoire pour un particulier.",
      });
    }

    if (client_type === "organization" && !company_name) {
      return res.status(400).json({
        success: false,
        message: "Le nom de l'organisation est obligatoire.",
      });
    }

    const serviceValue = Array.isArray(services)
      ? services.join(", ")
      : services || null;

    const [result] = await db.query(
      `INSERT INTO quote_requests 
       (
        client_type,
        company_name,
        contact_name,
        email,
        country,
        phone,
        sector,
        service,
        currency,
        budget,
        timeline,
        description
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client_type,
        company_name || null,
        contact_name || null,
        email,
        country || null,
        phone || null,
        sector || null,
        serviceValue,
        currency || null,
        budget || null,
        timeline || null,
        description,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Demande de devis envoyée avec succès.",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Erreur devis:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'envoi de la demande.",
    });
  }
};

const getQuoteRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM quote_requests ORDER BY created_at DESC`
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Erreur liste devis:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  createQuoteRequest,
  getQuoteRequests,
};