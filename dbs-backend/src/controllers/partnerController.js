const db = require("../config/db");

const crypto = require("crypto");

const {
  generatePartnerCode,
} = require("../utils/partnerCodeGenerator");

const PARTNER_STATUSES = [
  "pending",
  "approved",
  "rejected",
  "suspended",
];

const PARTNER_LEVELS = [
  "bronze",
  "silver",
  "gold",
];

const PARTNER_TYPES = [
  "individual",
  "company",
];

const IDENTITY_TYPES = [
  "national_id",
  "passport",
  "other",
];

const normalizeText = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  return normalized || null;
};

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .join(", ");
  }

  return normalizeText(value);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const hashActivationToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};
// ============================================================
// INSCRIPTION PUBLIQUE
// POST /api/partners/register
// ============================================================

const registerPartner = async (req, res) => {
  try {
    const {
      partner_type = "individual",
      full_name,
      company_name,
      email,
      country_code,
      phone,
      country,
      city,
      address,
      profession,
      experience,
      preferred_services,
      coverage_areas,
      identity_type,
      identity_number,
    } = req.body;

    const normalizedFullName = normalizeText(full_name);
    const normalizedEmail = normalizeText(email)?.toLowerCase();
    const normalizedPhone = normalizeText(phone);
    const normalizedCountry = normalizeText(country);

    if (
      !normalizedFullName ||
      !normalizedEmail ||
      !normalizedPhone ||
      !normalizedCountry
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le nom, l’email, le téléphone et le pays sont obligatoires.",
      });
    }

    if (!PARTNER_TYPES.includes(partner_type)) {
      return res.status(400).json({
        success: false,
        message: "Type de partenaire invalide.",
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Adresse email invalide.",
      });
    }

    if (
      partner_type === "company" &&
      !normalizeText(company_name)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le nom de l’entreprise est obligatoire.",
      });
    }

    if (
      identity_type &&
      !IDENTITY_TYPES.includes(identity_type)
    ) {
      return res.status(400).json({
        success: false,
        message: "Type de pièce d’identité invalide.",
      });
    }

    const [existingPartners] = await db.query(
      `
        SELECT id
        FROM partners
        WHERE email = ?
        LIMIT 1
      `,
      [normalizedEmail]
    );

    if (existingPartners.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Une demande de partenariat existe déjà avec cet email.",
      });
    }

    const partnerCode = generatePartnerCode();

    const [result] = await db.query(
      `
        INSERT INTO partners (
          partner_code,
          partner_type,
          full_name,
          company_name,
          email,
          country_code,
          phone,
          country,
          city,
          address,
          profession,
          experience,
          preferred_services,
          coverage_areas,
          identity_type,
          identity_number
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?
        )
      `,
      [
        partnerCode,
        partner_type,
        normalizedFullName,
        normalizeText(company_name),
        normalizedEmail,
        normalizeText(country_code),
        normalizedPhone,
        normalizedCountry,
        normalizeText(city),
        normalizeText(address),
        normalizeText(profession),
        normalizeText(experience),
        normalizeList(preferred_services),
        normalizeList(coverage_areas),
        identity_type || null,
        normalizeText(identity_number),
      ]
    );

    return res.status(201).json({
      success: true,
      message:
        "Votre demande de partenariat a été enregistrée avec succès. Elle sera examinée par DBS Africa.",
      data: {
        id: result.insertId,
        partner_code: partnerCode,
        status: "pending",
      },
    });
  } catch (error) {
    console.error(
      "Erreur inscription partenaire :",
      error
    );

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message:
          "Un partenaire utilisant ces informations existe déjà.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant l’inscription du partenaire.",
    });
  }
};

// ============================================================
// LISTE ADMINISTRATIVE
// GET /api/partners
// ============================================================

const getPartners = async (req, res) => {
  try {
    const {
      status,
      level,
      country,
      search,
    } = req.query;

    const conditions = [];
    const values = [];

    if (status) {
      if (!PARTNER_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Statut invalide.",
        });
      }

      conditions.push("p.status = ?");
      values.push(status);
    }

    if (level) {
      if (!PARTNER_LEVELS.includes(level)) {
        return res.status(400).json({
          success: false,
          message: "Niveau invalide.",
        });
      }

      conditions.push("p.level = ?");
      values.push(level);
    }

    if (country) {
      conditions.push("p.country = ?");
      values.push(country);
    }

    if (search) {
      conditions.push(`
        (
          p.partner_code LIKE ?
          OR p.full_name LIKE ?
          OR p.company_name LIKE ?
          OR p.email LIKE ?
          OR p.phone LIKE ?
        )
      `);

      const searchValue = `%${search.trim()}%`;

      values.push(
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
          p.id,
          p.partner_code,
          p.partner_type,
          p.full_name,
          p.company_name,
          p.email,
          p.country_code,
          p.phone,
          p.country,
          p.city,
          p.profession,
          p.status,
          p.level,
          p.commission_rate,
          p.approved_at,
          p.created_at,
          COALESCE(pp.total_leads, 0) AS total_leads,
          COALESCE(pp.won_leads, 0) AS won_leads,
          COALESCE(
            pp.generated_revenue,
            0
          ) AS generated_revenue,
          COALESCE(pp.conversion_rate, 0) AS conversion_rate,
          COALESCE(
            pp.unpaid_commissions,
            0
          ) AS unpaid_commissions,
          COALESCE(
            pp.paid_commissions,
            0
          ) AS paid_commissions
        FROM partners p
        LEFT JOIN partner_performance pp
          ON pp.partner_id = p.id
        ${whereClause}
        ORDER BY p.created_at DESC
      `,
      values
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Erreur liste partenaires :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant le chargement des partenaires.",
    });
  }
};

// ============================================================
// DÉTAIL D’UN PARTENAIRE
// GET /api/partners/:id
// ============================================================

const getPartnerById = async (req, res) => {
  try {
    const partnerId = Number(req.params.id);

    if (!Number.isInteger(partnerId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant invalide.",
      });
    }

    const [rows] = await db.query(
      `
        SELECT
          p.id,
          p.partner_code,
          p.partner_type,
          p.full_name,
          p.company_name,
          p.email,
          p.country_code,
          p.phone,
          p.country,
          p.city,
          p.address,
          p.profession,
          p.experience,
          p.preferred_services,
          p.coverage_areas,
          p.identity_type,
          p.identity_number,
          p.status,
          p.rejection_reason,
          p.admin_notes,
          p.level,
          p.commission_rate,
          p.approved_by,
          p.approved_at,
          p.suspended_at,
          p.activated_at,
          p.last_login_at,
          p.created_at,
          p.updated_at,
          COALESCE(
            pp.total_leads,
            0
          ) AS total_leads,
          COALESCE(
            pp.new_leads,
            0
          ) AS new_leads,
          COALESCE(
            pp.active_leads,
            0
          ) AS active_leads,
          COALESCE(
            pp.won_leads,
            0
          ) AS won_leads,
          COALESCE(
            pp.lost_leads,
            0
          ) AS lost_leads,
          COALESCE(
            pp.generated_revenue,
            0
          ) AS generated_revenue,
          COALESCE(
            pp.unpaid_commissions,
            0
          ) AS unpaid_commissions,
          COALESCE(
            pp.paid_commissions,
            0
          ) AS paid_commissions,
          COALESCE(
            pp.conversion_rate,
            0
          ) AS conversion_rate
        FROM partners p
        LEFT JOIN partner_performance pp
          ON pp.partner_id = p.id
        WHERE p.id = ?
        LIMIT 1
      `,
      [partnerId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Partenaire introuvable.",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(
      "Erreur détail partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// ============================================================
// MODIFICATION DU STATUT
// PATCH /api/partners/:id/status
// ============================================================

const updatePartnerStatus = async (req, res) => {
  let connection;

  try {
    const partnerId =
      Number(req.params.id);

    const {
      status,
      rejection_reason,
      admin_notes,
    } = req.body;

    if (
      !Number.isInteger(partnerId) ||
      partnerId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant invalide.",
      });
    }

    if (!PARTNER_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Statut invalide.",
      });
    }

    if (
      status === "rejected" &&
      !normalizeText(rejection_reason)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le motif du rejet est obligatoire.",
      });
    }

    connection = await db.getConnection();

    await connection.beginTransaction();

    const [partners] =
      await connection.query(
        `
          SELECT
            id,
            partner_code,
            full_name,
            email,
            status,
            activated_at
          FROM partners
          WHERE id = ?
          LIMIT 1
          FOR UPDATE
        `,
        [partnerId]
      );

    if (partners.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message:
          "Partenaire introuvable.",
      });
    }

    const partner = partners[0];

    let activationToken = null;
    let activationTokenHash = null;
    let activationExpiresAt = null;
    let activationUrl = null;

    /*
     * Un jeton est généré uniquement si :
     * - la demande est approuvée ;
     * - le compte n’est pas encore activé.
     */
    if (
      status === "approved" &&
      !partner.activated_at
    ) {
      activationToken = crypto
        .randomBytes(32)
        .toString("hex");

      activationTokenHash =
        hashActivationToken(
          activationToken
        );

      activationExpiresAt =
        new Date(
          Date.now() +
          48 * 60 * 60 * 1000
        );

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:5173";

      activationUrl =
        `${frontendUrl}/partner/activate?token=${activationToken}`;
    }

    /*
     * Un rejet ou une suspension invalide
     * tout lien d’activation existant.
     */
    if (
      status === "rejected" ||
      status === "suspended"
    ) {
      activationTokenHash = null;
      activationExpiresAt = null;
    }

    await connection.query(
      `
        UPDATE partners
        SET
          status = ?,
          rejection_reason = ?,
          admin_notes = ?,

          approved_by =
            CASE
              WHEN ? = 'approved'
                THEN ?
              ELSE approved_by
            END,

          approved_at =
            CASE
              WHEN ? = 'approved'
                THEN COALESCE(
                  approved_at,
                  NOW()
                )
              ELSE approved_at
            END,

          suspended_at =
            CASE
              WHEN ? = 'suspended'
                THEN NOW()
              WHEN ? = 'approved'
                THEN NULL
              ELSE suspended_at
            END,

          activation_token_hash = ?,
          activation_token_expires_at = ?

        WHERE id = ?
      `,
      [
        status,

        status === "rejected"
          ? normalizeText(
              rejection_reason
            )
          : null,

        normalizeText(admin_notes),

        status,
        req.user.id,

        status,

        status,
        status,

        activationTokenHash,
        activationExpiresAt,

        partnerId,
      ]
    );

    await connection.query(
      `
        INSERT INTO partner_activity_logs (
          partner_id,
          admin_user_id,
          action,
          description,
          previous_data,
          new_data
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        partnerId,
        req.user.id,
        "PARTNER_STATUS_UPDATED",

        `Statut partenaire modifié : ${partner.status} vers ${status}.`,

        JSON.stringify({
          status: partner.status,
        }),

        JSON.stringify({
          status,
          activation_required:
            Boolean(activationUrl),
          activation_expires_at:
            activationExpiresAt,
        }),
      ]
    );

    await connection.commit();

    const responseData = {
      id: partner.id,
      partner_code:
        partner.partner_code,
      full_name:
        partner.full_name,
      email:
        partner.email,
      previous_status:
        partner.status,
      status,
      activated:
        Boolean(partner.activated_at),
    };

    /*
     * Le jeton brut n’est retourné qu’ici.
     * Il n’est jamais enregistré en clair.
     */
    if (activationUrl) {
      responseData.activation_url =
        activationUrl;

      responseData.activation_expires_at =
        activationExpiresAt;
    }

    return res.json({
      success: true,

      message:
        status === "approved"
          ? partner.activated_at
            ? "Le partenaire a été approuvé."
            : "Le partenaire a été approuvé. Son lien d’activation a été généré."
          : "Le statut du partenaire a été mis à jour.",

      data: responseData,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(
      "Erreur statut partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Erreur serveur pendant la modification du partenaire.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// ============================================================
// NIVEAU ET TAUX DE COMMISSION
// PATCH /api/partners/:id/settings
// ============================================================

const updatePartnerSettings = async (req, res) => {
  try {
    const partnerId = Number(req.params.id);

    const {
      level,
      commission_rate,
      admin_notes,
    } = req.body;

    const numericRate = Number(commission_rate);

    if (!Number.isInteger(partnerId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant invalide.",
      });
    }

    if (!PARTNER_LEVELS.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Niveau partenaire invalide.",
      });
    }

    if (
      !Number.isFinite(numericRate) ||
      numericRate < 0 ||
      numericRate > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Le taux de commission doit être compris entre 0 et 100.",
      });
    }

    const [result] = await db.query(
      `
        UPDATE partners
        SET
          level = ?,
          commission_rate = ?,
          admin_notes = ?
        WHERE id = ?
      `,
      [
        level,
        numericRate,
        normalizeText(admin_notes),
        partnerId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Partenaire introuvable.",
      });
    }

    await db.query(
      `
        INSERT INTO partner_activity_logs (
          partner_id,
          admin_user_id,
          action,
          description,
          new_data
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        partnerId,
        req.user.id,
        "PARTNER_SETTINGS_UPDATED",
        "Niveau et taux de commission modifiés.",
        JSON.stringify({
          level,
          commission_rate: numericRate,
        }),
      ]
    );

    return res.json({
      success: true,
      message:
        "Les paramètres du partenaire ont été mis à jour.",
    });
  } catch (error) {
    console.error(
      "Erreur paramètres partenaire :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// ============================================================
// STATISTIQUES GLOBALES
// GET /api/partners/statistics/summary
// ============================================================

const getPartnerStatistics = async (req, res) => {
  try {
    const [[partnerStats]] = await db.query(
      `
        SELECT
          COUNT(*) AS total,
          SUM(status = 'pending') AS pending,
          SUM(status = 'approved') AS approved,
          SUM(status = 'rejected') AS rejected,
          SUM(status = 'suspended') AS suspended,
          SUM(level = 'bronze') AS bronze,
          SUM(level = 'silver') AS silver,
          SUM(level = 'gold') AS gold
        FROM partners
      `
    );

    const [[leadStats]] = await db.query(
      `
        SELECT
          COUNT(*) AS total,
          SUM(status = 'new') AS new_items,
          SUM(status = 'won') AS won,
          SUM(status = 'lost') AS lost
        FROM partner_leads
      `
    );

    const [[commissionStats]] = await db.query(
      `
        SELECT
          COUNT(*) AS total,
          COALESCE(
            SUM(
              CASE
                WHEN status = 'pending'
                THEN commission_amount
                ELSE 0
              END
            ),
            0
          ) AS pending_amount,
          COALESCE(
            SUM(
              CASE
                WHEN status = 'approved'
                THEN commission_amount
                ELSE 0
              END
            ),
            0
          ) AS approved_amount,
          COALESCE(
            SUM(
              CASE
                WHEN status = 'paid'
                THEN commission_amount
                ELSE 0
              END
            ),
            0
          ) AS paid_amount
        FROM partner_commissions
      `
    );

    return res.json({
      success: true,
      data: {
        partners: partnerStats,
        leads: leadStats,
        commissions: commissionStats,
      },
    });
  } catch (error) {
    console.error(
      "Erreur statistiques partenaires :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  registerPartner,
  getPartners,
  getPartnerById,
  updatePartnerStatus,
  updatePartnerSettings,
  getPartnerStatistics,
};