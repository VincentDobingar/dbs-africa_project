const db = require("../config/db");

const COMMISSION_STATUSES = [
  "pending",
  "approved",
  "paid",
  "cancelled",
];

const PAYMENT_METHODS = [
  "bank_transfer",
  "mobile_money",
  "cash",
  "other",
];

const normalizeText = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  return value.trim() || null;
};

const validateId = (value) => {
  const id = Number(value);

  return Number.isInteger(id) && id > 0
    ? id
    : null;
};

// ============================================================
// COMMISSIONS DU PARTENAIRE CONNECTÉ
// GET /api/partners/commissions
// ============================================================

const getMyCommissions = async (req, res) => {
  try {
    const {
      status,
      currency,
    } = req.query;

    const conditions = [
      "pc.partner_id = ?",
    ];

    const values = [
      req.partner.id,
    ];

    if (status) {
      if (!COMMISSION_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Statut de commission invalide.",
        });
      }

      conditions.push("pc.status = ?");
      values.push(status);
    }

    if (currency) {
      conditions.push("pc.currency = ?");
      values.push(currency);
    }

    const [rows] = await db.query(
      `
        SELECT
          pc.id,
          pc.invoice_reference,
          pc.contract_amount,
          pc.commission_rate,
          pc.commission_amount,
          pc.currency,
          pc.status,
          pc.approved_at,
          pc.paid_at,
          pc.payment_method,
          pc.payment_reference,
          pc.notes,
          pc.created_at,
          pc.updated_at,
          pl.id AS lead_id,
          pl.lead_code,
          pl.contact_name,
          pl.company_name,
          pl.requested_service,
          pl.status AS lead_status
        FROM partner_commissions pc
        INNER JOIN partner_leads pl
          ON pl.id = pc.lead_id
        WHERE ${conditions.join(" AND ")}
        ORDER BY pc.created_at DESC
      `,
      values
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Erreur commissions partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le chargement des commissions.",
    });
  }
};

// ============================================================
// LISTE ADMINISTRATIVE DES COMMISSIONS
// GET /api/partners/admin/commissions
// ============================================================

const getAdminCommissions = async (req, res) => {
  try {
    const {
      status,
      partner_id,
      currency,
      search,
    } = req.query;

    const conditions = [];
    const values = [];

    if (status) {
      if (!COMMISSION_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Statut de commission invalide.",
        });
      }

      conditions.push("pc.status = ?");
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

      conditions.push("pc.partner_id = ?");
      values.push(partnerId);
    }

    if (currency) {
      conditions.push("pc.currency = ?");
      values.push(currency);
    }

    if (search) {
      const searchValue =
        `%${String(search).trim()}%`;

      conditions.push(`
        (
          p.partner_code LIKE ?
          OR p.full_name LIKE ?
          OR p.company_name LIKE ?
          OR pl.lead_code LIKE ?
          OR pl.contact_name LIKE ?
          OR pl.company_name LIKE ?
          OR pc.invoice_reference LIKE ?
          OR pc.payment_reference LIKE ?
        )
      `);

      values.push(
        searchValue,
        searchValue,
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
          pc.*,
          p.partner_code,
          p.full_name AS partner_name,
          p.company_name AS partner_company,
          p.email AS partner_email,
          pl.lead_code,
          pl.contact_name,
          pl.company_name AS client_company,
          pl.requested_service,
          pl.status AS lead_status
        FROM partner_commissions pc
        INNER JOIN partners p
          ON p.id = pc.partner_id
        INNER JOIN partner_leads pl
          ON pl.id = pc.lead_id
        ${whereClause}
        ORDER BY pc.created_at DESC
      `,
      values
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Erreur liste administrative commissions :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le chargement des commissions.",
    });
  }
};

// ============================================================
// APPROUVER UNE COMMISSION
// PATCH /api/partners/admin/commissions/:id/approve
// ============================================================

const approveCommission = async (req, res) => {
  let connection;

  try {
    const commissionId =
      validateId(req.params.id);

    const {
      invoice_reference,
      notes,
    } = req.body;

    if (!commissionId) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant de commission invalide.",
      });
    }

    connection = await db.getConnection();

    await connection.beginTransaction();

    const [rows] = await connection.query(
      `
        SELECT
          pc.id,
          pc.partner_id,
          pc.lead_id,
          pc.status,
          pc.contract_amount,
          pc.commission_rate,
          pc.commission_amount,
          pc.currency,
          pl.lead_code
        FROM partner_commissions pc
        INNER JOIN partner_leads pl
          ON pl.id = pc.lead_id
        WHERE pc.id = ?
        LIMIT 1
        FOR UPDATE
      `,
      [commissionId]
    );

    if (rows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message:
          "Commission introuvable.",
      });
    }

    const commission = rows[0];

    if (commission.status === "approved") {
      await connection.commit();

      return res.json({
        success: true,
        message:
          "Cette commission est déjà approuvée.",
        data: {
          id: commission.id,
          status: commission.status,
        },
      });
    }

    if (commission.status !== "pending") {
      await connection.rollback();

      return res.status(409).json({
        success: false,
        message:
          `Une commission "${commission.status}" ne peut pas être approuvée.`,
      });
    }

    await connection.query(
      `
        UPDATE partner_commissions
        SET
          status = 'approved',
          invoice_reference =
            COALESCE(?, invoice_reference),
          notes = COALESCE(?, notes),
          approved_by = ?,
          approved_at = NOW()
        WHERE id = ?
      `,
      [
        normalizeText(invoice_reference),
        normalizeText(notes),
        req.user.id,
        commissionId,
      ]
    );

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
        commission.partner_id,
        commission.lead_id,
        req.user.id,
        "PARTNER_COMMISSION_APPROVED",
        `Commission du prospect ${commission.lead_code} approuvée.`,
        JSON.stringify({
          commission_id: commission.id,
          status: commission.status,
        }),
        JSON.stringify({
          commission_id: commission.id,
          status: "approved",
          commission_amount:
            commission.commission_amount,
          currency: commission.currency,
        }),
      ]
    );

    await connection.commit();

    return res.json({
      success: true,
      message:
        "La commission a été approuvée.",
      data: {
        id: commission.id,
        status: "approved",
        commission_amount:
          commission.commission_amount,
        currency: commission.currency,
      },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(
      "Erreur approbation commission :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant l’approbation de la commission.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// ============================================================
// MARQUER UNE COMMISSION COMME PAYÉE
// PATCH /api/partners/admin/commissions/:id/pay
// ============================================================

const payCommission = async (req, res) => {
  let connection;

  try {
    const commissionId =
      validateId(req.params.id);

    const {
      payment_method,
      payment_reference,
      notes,
    } = req.body;

    if (!commissionId) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant de commission invalide.",
      });
    }

    if (!PAYMENT_METHODS.includes(payment_method)) {
      return res.status(400).json({
        success: false,
        message:
          "Mode de paiement invalide.",
      });
    }

    if (
      ["bank_transfer", "mobile_money"]
        .includes(payment_method) &&
      !normalizeText(payment_reference)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "La référence du paiement est obligatoire.",
      });
    }

    connection = await db.getConnection();

    await connection.beginTransaction();

    const [rows] = await connection.query(
      `
        SELECT
          pc.id,
          pc.partner_id,
          pc.lead_id,
          pc.status,
          pc.commission_amount,
          pc.currency,
          pl.lead_code
        FROM partner_commissions pc
        INNER JOIN partner_leads pl
          ON pl.id = pc.lead_id
        WHERE pc.id = ?
        LIMIT 1
        FOR UPDATE
      `,
      [commissionId]
    );

    if (rows.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message:
          "Commission introuvable.",
      });
    }

    const commission = rows[0];

    if (commission.status === "paid") {
      await connection.commit();

      return res.json({
        success: true,
        message:
          "Cette commission est déjà payée.",
        data: {
          id: commission.id,
          status: commission.status,
        },
      });
    }

    if (commission.status !== "approved") {
      await connection.rollback();

      return res.status(409).json({
        success: false,
        message:
          "La commission doit être approuvée avant son paiement.",
      });
    }

    await connection.query(
      `
        UPDATE partner_commissions
        SET
          status = 'paid',
          paid_by = ?,
          paid_at = NOW(),
          payment_method = ?,
          payment_reference = ?,
          notes = COALESCE(?, notes)
        WHERE id = ?
      `,
      [
        req.user.id,
        payment_method,
        normalizeText(payment_reference),
        normalizeText(notes),
        commissionId,
      ]
    );

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
        commission.partner_id,
        commission.lead_id,
        req.user.id,
        "PARTNER_COMMISSION_PAID",
        `Commission du prospect ${commission.lead_code} payée.`,
        JSON.stringify({
          commission_id: commission.id,
          status: commission.status,
        }),
        JSON.stringify({
          commission_id: commission.id,
          status: "paid",
          payment_method,
          payment_reference:
            normalizeText(payment_reference),
        }),
      ]
    );

    await connection.commit();

    return res.json({
      success: true,
      message:
        "Le paiement de la commission a été enregistré.",
      data: {
        id: commission.id,
        status: "paid",
        commission_amount:
          commission.commission_amount,
        currency: commission.currency,
        payment_method,
        payment_reference:
          normalizeText(payment_reference),
      },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(
      "Erreur paiement commission :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le paiement de la commission.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  getMyCommissions,
  getAdminCommissions,
  approveCommission,
  payCommission,
};