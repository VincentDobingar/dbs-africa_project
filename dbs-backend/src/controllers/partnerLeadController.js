const crypto = require("crypto");
const db = require("../config/db");

const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "negotiation",
  "won",
  "lost",
  "cancelled",
];

const LEAD_PRIORITIES = [
  "low",
  "medium",
  "high",
];

const CLIENT_TYPES = [
  "individual",
  "organization",
];

const CURRENCIES = [
  "FCFA",
  "USD",
  "EUR",
  "BIF",
];

const normalizeText = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  return value.trim() || null;
};

const generateLeadCode = () => {
  const year = new Date().getFullYear();

  const randomCode = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `DBS-LEAD-${year}-${randomCode}`;
};

const validateId = (value) => {
  const id = Number(value);

  return Number.isInteger(id) && id > 0
    ? id
    : null;
};

// ============================================================
// CRÉER UN PROSPECT
// POST /api/partners/leads
// ============================================================

const createPartnerLead = async (
  req,
  res
) => {
  try {
    const {
      client_type = "organization",
      contact_name,
      company_name,
      email,
      country_code,
      phone,
      country,
      city,
      sector,
      requested_service,
      estimated_value,
      currency = "FCFA",
      priority = "medium",
      description,
    } = req.body;

    const normalizedContactName =
      normalizeText(contact_name);

    const normalizedPhone =
      normalizeText(phone);

    const normalizedService =
      normalizeText(requested_service);

    const normalizedEmail =
      normalizeText(email)?.toLowerCase() ||
      null;

    if (
      !normalizedContactName ||
      !normalizedPhone ||
      !normalizedService
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le nom du contact, le téléphone et le service demandé sont obligatoires.",
      });
    }

    if (!CLIENT_TYPES.includes(client_type)) {
      return res.status(400).json({
        success: false,
        message:
          "Type de client invalide.",
      });
    }

    if (
      client_type === "organization" &&
      !normalizeText(company_name)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le nom de l’organisation est obligatoire.",
      });
    }

    if (!CURRENCIES.includes(currency)) {
      return res.status(400).json({
        success: false,
        message: "Devise invalide.",
      });
    }

    if (!LEAD_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priorité invalide.",
      });
    }

    let normalizedEstimatedValue = null;

    if (
      estimated_value !== undefined &&
      estimated_value !== null &&
      estimated_value !== ""
    ) {
      normalizedEstimatedValue =
        Number(estimated_value);

      if (
        !Number.isFinite(
          normalizedEstimatedValue
        ) ||
        normalizedEstimatedValue < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "La valeur estimée doit être un nombre positif.",
        });
      }
    }

    const duplicateConditions = [
      "phone = ?",
    ];

    const duplicateValues = [
      normalizedPhone,
    ];

    if (normalizedEmail) {
      duplicateConditions.push(
        "LOWER(email) = LOWER(?)"
      );

      duplicateValues.push(
        normalizedEmail
      );
    }

    const [duplicates] = await db.query(
      `
        SELECT
          id,
          partner_id,
          lead_code,
          status
        FROM partner_leads
        WHERE (
          ${duplicateConditions.join(" OR ")}
        )
        AND status NOT IN (
          'lost',
          'cancelled'
        )
        LIMIT 1
      `,
      duplicateValues
    );

    if (duplicates.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Ce prospect est déjà enregistré dans le programme partenaires.",
      });
    }

    const leadCode = generateLeadCode();

    const [result] = await db.query(
      `
        INSERT INTO partner_leads (
          partner_id,
          lead_code,
          client_type,
          contact_name,
          company_name,
          email,
          country_code,
          phone,
          country,
          city,
          sector,
          requested_service,
          estimated_value,
          currency,
          priority,
          description
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      [
        req.partner.id,
        leadCode,
        client_type,
        normalizedContactName,
        normalizeText(company_name),
        normalizedEmail,
        normalizeText(country_code),
        normalizedPhone,
        normalizeText(country),
        normalizeText(city),
        normalizeText(sector),
        normalizedService,
        normalizedEstimatedValue,
        currency,
        priority,
        normalizeText(description),
      ]
    );

    await db.query(
      `
        INSERT INTO partner_activity_logs (
          partner_id,
          lead_id,
          action,
          description,
          new_data
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        req.partner.id,
        result.insertId,
        "PARTNER_LEAD_CREATED",
        `Prospect ${leadCode} enregistré.`,
        JSON.stringify({
          lead_code: leadCode,
          contact_name:
            normalizedContactName,
          requested_service:
            normalizedService,
          status: "new",
        }),
      ]
    );

    return res.status(201).json({
      success: true,
      message:
        "Le prospect a été enregistré avec succès.",
      data: {
        id: result.insertId,
        lead_code: leadCode,
        status: "new",
      },
    });
  } catch (error) {
    console.error(
      "Erreur création prospect :",
      error
    );

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message:
          "Ce prospect existe déjà.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant l’enregistrement du prospect.",
    });
  }
};

// ============================================================
// PROSPECTS DU PARTENAIRE CONNECTÉ
// GET /api/partners/leads
// ============================================================

const getMyPartnerLeads = async (
  req,
  res
) => {
  try {
    const {
      status,
      search,
    } = req.query;

    const conditions = [
      "partner_id = ?",
    ];

    const values = [
      req.partner.id,
    ];

    if (status) {
      if (!LEAD_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Statut invalide.",
        });
      }

      conditions.push("status = ?");
      values.push(status);
    }

    if (search) {
      const searchValue =
        `%${String(search).trim()}%`;

      conditions.push(`
        (
          lead_code LIKE ?
          OR contact_name LIKE ?
          OR company_name LIKE ?
          OR requested_service LIKE ?
        )
      `);

      values.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
    }

    const [rows] = await db.query(
      `
        SELECT
          id,
          lead_code,
          client_type,
          contact_name,
          company_name,
          email,
          country_code,
          phone,
          country,
          city,
          sector,
          requested_service,
          estimated_value,
          currency,
          status,
          priority,
          description,
          lost_reason,
          won_at,
          lost_at,
          created_at,
          updated_at
        FROM partner_leads
        WHERE ${conditions.join(" AND ")}
        ORDER BY created_at DESC
      `,
      values
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Erreur prospects partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le chargement des prospects.",
    });
  }
};

// ============================================================
// DÉTAIL D’UN PROSPECT DU PARTENAIRE
// GET /api/partners/leads/:id
// ============================================================

const getMyPartnerLeadById = async (
  req,
  res
) => {
  try {
    const leadId =
      validateId(req.params.id);

    if (!leadId) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant du prospect invalide.",
      });
    }

    const [rows] = await db.query(
      `
        SELECT
          id,
          lead_code,
          client_type,
          contact_name,
          company_name,
          email,
          country_code,
          phone,
          country,
          city,
          sector,
          requested_service,
          estimated_value,
          currency,
          status,
          priority,
          description,
          lost_reason,
          won_at,
          lost_at,
          created_at,
          updated_at
        FROM partner_leads
        WHERE id = ?
          AND partner_id = ?
        LIMIT 1
      `,
      [
        leadId,
        req.partner.id,
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Prospect introuvable.",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(
      "Erreur détail prospect :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// ============================================================
// LISTE ADMINISTRATIVE DES PROSPECTS
// GET /api/partners/admin/leads
// ============================================================

const getAdminPartnerLeads = async (
  req,
  res
) => {
  try {
    const {
      status,
      partner_id,
      search,
    } = req.query;

    const conditions = [];
    const values = [];

    if (status) {
      if (!LEAD_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Statut invalide.",
        });
      }

      conditions.push("pl.status = ?");
      values.push(status);
    }

    if (partner_id) {
      const partnerId =
        validateId(partner_id);

      if (!partnerId) {
        return res.status(400).json({
          success: false,
          message:
            "Identifiant partenaire invalide.",
        });
      }

      conditions.push("pl.partner_id = ?");
      values.push(partnerId);
    }

    if (search) {
      const searchValue =
        `%${String(search).trim()}%`;

      conditions.push(`
        (
          pl.lead_code LIKE ?
          OR pl.contact_name LIKE ?
          OR pl.company_name LIKE ?
          OR pl.requested_service LIKE ?
          OR p.full_name LIKE ?
          OR p.partner_code LIKE ?
        )
      `);

      values.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    const [rows] = await db.query(
      `
        SELECT
          pl.*,
          p.partner_code,
          p.full_name AS partner_name,
          p.company_name
            AS partner_company,
          p.email AS partner_email,
          p.commission_rate
        FROM partner_leads pl
        INNER JOIN partners p
          ON p.id = pl.partner_id
        ${whereClause}
        ORDER BY pl.created_at DESC
      `,
      values
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Erreur liste administrative prospects :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le chargement des prospects.",
    });
  }
};

// ============================================================
// MODIFIER LE STATUT D’UN PROSPECT
// PATCH /api/partners/admin/leads/:id/status
// ============================================================

const updatePartnerLeadStatus = async (req, res) => {
  let connection;

  try {
    const leadId = validateId(req.params.id);

    const {
      status,
      admin_notes,
      lost_reason,
      estimated_value,
    } = req.body;

    if (!leadId) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant du prospect invalide.",
      });
    }

    if (!LEAD_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Statut du prospect invalide.",
      });
    }

    if (
      status === "lost" &&
      !normalizeText(lost_reason)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le motif de perte est obligatoire.",
      });
    }

    let normalizedEstimatedValue = null;

    if (
      estimated_value !== undefined &&
      estimated_value !== null &&
      estimated_value !== ""
    ) {
      normalizedEstimatedValue =
        Number(estimated_value);

      if (
        !Number.isFinite(
          normalizedEstimatedValue
        ) ||
        normalizedEstimatedValue < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "La valeur estimée est invalide.",
        });
      }
    }

    connection = await db.getConnection();

    await connection.beginTransaction();

    const [leads] = await connection.query(
      `
        SELECT
          pl.id,
          pl.partner_id,
          pl.lead_code,
          pl.status,
          pl.estimated_value,
          pl.currency,
          p.commission_rate
        FROM partner_leads pl
        INNER JOIN partners p
          ON p.id = pl.partner_id
        WHERE pl.id = ?
        LIMIT 1
        FOR UPDATE
      `,
      [leadId]
    );

    if (leads.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message:
          "Prospect introuvable.",
      });
    }

    const lead = leads[0];

    const finalEstimatedValue =
      normalizedEstimatedValue ??
      Number(lead.estimated_value);

    if (
      status === "won" &&
      (
        !Number.isFinite(finalEstimatedValue) ||
        finalEstimatedValue <= 0
      )
    ) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message:
          "La valeur du contrat doit être supérieure à zéro pour déclarer le prospect gagné.",
      });
    }

    await connection.query(
      `
        UPDATE partner_leads
        SET
          status = ?,
          admin_notes = ?,
          lost_reason = ?,
          estimated_value =
            COALESCE(?, estimated_value),
          won_at = ?,
          lost_at = ?
        WHERE id = ?
      `,
      [
        status,
        normalizeText(admin_notes),

        status === "lost"
          ? normalizeText(lost_reason)
          : null,

        normalizedEstimatedValue,

        status === "won"
          ? new Date()
          : null,

        status === "lost"
          ? new Date()
          : null,

        leadId,
      ]
    );

    let commissionData = null;

    if (status === "won") {
      const commissionRate =
        Number(lead.commission_rate);

      const commissionAmount =
        Number(
          (
            finalEstimatedValue *
            commissionRate /
            100
          ).toFixed(2)
        );

      const [existingCommissions] =
        await connection.query(
          `
            SELECT
              id,
              contract_amount,
              commission_rate,
              commission_amount,
              currency,
              status
            FROM partner_commissions
            WHERE partner_id = ?
              AND lead_id = ?
            LIMIT 1
            FOR UPDATE
          `,
          [
            lead.partner_id,
            leadId,
          ]
        );

      if (existingCommissions.length === 0) {
        const [commissionResult] =
          await connection.query(
            `
              INSERT INTO partner_commissions (
                partner_id,
                lead_id,
                contract_amount,
                commission_rate,
                commission_amount,
                currency,
                status,
                notes
              )
              VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
            `,
            [
              lead.partner_id,
              leadId,
              finalEstimatedValue,
              commissionRate,
              commissionAmount,
              lead.currency,
              `Commission générée automatiquement pour le prospect ${lead.lead_code}.`,
            ]
          );

        commissionData = {
          id: commissionResult.insertId,
          contract_amount:
            finalEstimatedValue,
          commission_rate:
            commissionRate,
          commission_amount:
            commissionAmount,
          currency: lead.currency,
          status: "pending",
        };
      } else {
        const existing =
          existingCommissions[0];

        if (existing.status === "paid") {
          commissionData = {
            id: existing.id,
            contract_amount:
              existing.contract_amount,
            commission_rate:
              existing.commission_rate,
            commission_amount:
              existing.commission_amount,
            currency: existing.currency,
            status: existing.status,
          };
        } else {
          const financialDataChanged =
            Number(existing.contract_amount) !==
              finalEstimatedValue ||
            Number(existing.commission_rate) !==
              commissionRate ||
            existing.currency !== lead.currency;

          const nextCommissionStatus =
            existing.status === "cancelled" ||
            financialDataChanged
              ? "pending"
              : existing.status;

          await connection.query(
            `
              UPDATE partner_commissions
              SET
                contract_amount = ?,
                commission_rate = ?,
                commission_amount = ?,
                currency = ?,
                status = ?,
                approved_by =
                  IF(? = 'approved', approved_by, NULL),
                approved_at =
                  IF(? = 'approved', approved_at, NULL),
                notes = ?
              WHERE id = ?
            `,
            [
              finalEstimatedValue,
              commissionRate,
              commissionAmount,
              lead.currency,
              nextCommissionStatus,
              nextCommissionStatus,
              nextCommissionStatus,
              `Commission actualisée automatiquement pour le prospect ${lead.lead_code}.`,
              existing.id,
            ]
          );

          commissionData = {
            id: existing.id,
            contract_amount:
              finalEstimatedValue,
            commission_rate:
              commissionRate,
            commission_amount:
              commissionAmount,
            currency: lead.currency,
            status: nextCommissionStatus,
          };
        }
      }
    }

    if (
      lead.status === "won" &&
      status !== "won"
    ) {
      await connection.query(
        `
          UPDATE partner_commissions
          SET
            status = 'cancelled',
            approved_by = NULL,
            approved_at = NULL,
            notes = ?
          WHERE partner_id = ?
            AND lead_id = ?
            AND status IN (
              'pending',
              'approved'
            )
        `,
        [
          `Commission annulée automatiquement après changement du statut du prospect ${lead.lead_code}.`,
          lead.partner_id,
          leadId,
        ]
      );
    }

    await connection.query(
      `
        INSERT INTO partner_activity_logs (
          partner_id,
          lead_id,
          admin_user_id,
          action,
          description,
          previous_data,
          new_data
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        lead.partner_id,
        leadId,
        req.user.id,
        "PARTNER_LEAD_STATUS_UPDATED",
        `Statut du prospect ${lead.lead_code} modifié de ${lead.status} vers ${status}.`,
        JSON.stringify({
          status: lead.status,
          estimated_value:
            lead.estimated_value,
        }),
        JSON.stringify({
          status,
          estimated_value:
            finalEstimatedValue,
          commission:
            commissionData,
        }),
      ]
    );

    await connection.commit();

    return res.json({
      success: true,
      message:
        status === "won"
          ? "Le prospect a été gagné et sa commission a été générée."
          : "Le statut du prospect a été mis à jour.",
      data: {
        id: leadId,
        lead_code: lead.lead_code,
        previous_status: lead.status,
        status,
        commission: commissionData,
      },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(
      "Erreur statut prospect :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant la modification du prospect.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createPartnerLead,
  getMyPartnerLeads,
  getMyPartnerLeadById,
  getAdminPartnerLeads,
  updatePartnerLeadStatus,
};