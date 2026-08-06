// controllers/pricingController.js

const db = require("../config/db");

/**
 * Insère les lignes de `pricing_plan_features` pour un pack donné.
 * Les entrées sans libellé FR/EN sont ignorées.
 */
const insertFeatures = async (planId, features) => {
  const list = Array.isArray(features) ? features : [];

  const validFeatures = list.filter(
    (feature) => feature?.fr?.trim() && feature?.en?.trim()
  );

  if (!validFeatures.length) {
    return;
  }

  const values = validFeatures.map((feature, index) => [
    planId,
    feature.fr.trim(),
    feature.en.trim(),
    index,
  ]);

  await db.query(
    "INSERT INTO pricing_plan_features (plan_id, label_fr, label_en, display_order) VALUES ?",
    [values]
  );
};

const toDisplayOrder = (value) =>
  Number.isFinite(Number(value)) ? Number(value) : 0;

const toBoolean = (value) => value === true || value === "true";

// ============================================================
// LECTURE PUBLIQUE
// ============================================================

/**
 * Catalogue pricing public, dans la forme attendue par le frontend
 * (identique à l'ancien src/pricing/data/pricingData.js statique).
 */
exports.getPublicPricing = async (req, res) => {
  try {
    const [plans] = await db.query(
      "SELECT * FROM pricing_plans ORDER BY display_order ASC, id ASC"
    );

    const [features] = await db.query(
      "SELECT * FROM pricing_plan_features ORDER BY display_order ASC, id ASC"
    );

    const [addons] = await db.query(
      "SELECT * FROM pricing_addons ORDER BY display_order ASC, id ASC"
    );

    const plansWithFeatures = plans.map((plan) => ({
      id: plan.tier,
      tier: plan.tier,
      name: { fr: plan.name_fr, en: plan.name_en },
      description: {
        fr: plan.description_fr,
        en: plan.description_en,
      },
      price: {
        min: Number(plan.price_min),
        max: plan.price_max === null ? null : Number(plan.price_max),
        billing: plan.billing,
      },
      popular: Boolean(plan.popular),
      features: features
        .filter((feature) => feature.plan_id === plan.id)
        .map((feature) => ({
          fr: feature.label_fr,
          en: feature.label_en,
        })),
    }));

    const formattedAddons = addons.map((addon) => ({
      id: addon.slug,
      name: { fr: addon.name_fr, en: addon.name_en },
      price: Number(addon.price_amount),
    }));

    return res.json({
      success: true,
      data: {
        baseCurrency: "FCFA",
        plans: plansWithFeatures,
        addons: formattedAddons,
      },
    });
  } catch (error) {
    console.error("Erreur pricing publique :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// ============================================================
// ADMINISTRATION — PACKS
// ============================================================

exports.getAdminPlans = async (req, res) => {
  try {
    const [plans] = await db.query(
      "SELECT * FROM pricing_plans ORDER BY display_order ASC, id ASC"
    );

    const [features] = await db.query(
      "SELECT * FROM pricing_plan_features ORDER BY display_order ASC, id ASC"
    );

    const data = plans.map((plan) => ({
      id: plan.id,
      tier: plan.tier,
      name_fr: plan.name_fr,
      name_en: plan.name_en,
      description_fr: plan.description_fr,
      description_en: plan.description_en,
      price_min: Number(plan.price_min),
      price_max: plan.price_max === null ? null : Number(plan.price_max),
      billing: plan.billing,
      popular: Boolean(plan.popular),
      display_order: plan.display_order,
      features: features
        .filter((feature) => feature.plan_id === plan.id)
        .map((feature) => ({
          fr: feature.label_fr,
          en: feature.label_en,
        })),
    }));

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Erreur liste packs admin :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const {
      tier,
      name_fr,
      name_en,
      description_fr,
      description_en,
      price_min,
      price_max,
      billing,
      popular,
      display_order,
      features,
    } = req.body;

    if (
      !tier?.trim() ||
      !name_fr?.trim() ||
      !name_en?.trim() ||
      !price_min
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant, nom (FR/EN) et prix minimum sont obligatoires.",
      });
    }

    const normalizedMax =
      price_max === "" || price_max === undefined || price_max === null
        ? null
        : Number(price_max);

    if (normalizedMax !== null && normalizedMax < Number(price_min)) {
      return res.status(400).json({
        success: false,
        message: "Le prix maximum doit être supérieur ou égal au prix minimum.",
      });
    }

    const [result] = await db.query(
      `INSERT INTO pricing_plans
        (tier, name_fr, name_en, description_fr, description_en, price_min, price_max, billing, popular, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tier.trim(),
        name_fr.trim(),
        name_en.trim(),
        description_fr?.trim() || null,
        description_en?.trim() || null,
        price_min,
        normalizedMax,
        billing?.trim() || "project",
        toBoolean(popular) ? 1 : 0,
        toDisplayOrder(display_order),
      ]
    );

    await insertFeatures(result.insertId, features);

    return res.status(201).json({
      success: true,
      message: "Pack créé avec succès.",
      data: { id: result.insertId },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Cet identifiant de pack existe déjà.",
      });
    }

    console.error("Erreur création pack :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      tier,
      name_fr,
      name_en,
      description_fr,
      description_en,
      price_min,
      price_max,
      billing,
      popular,
      display_order,
      features,
    } = req.body;

    if (
      !tier?.trim() ||
      !name_fr?.trim() ||
      !name_en?.trim() ||
      !price_min
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant, nom (FR/EN) et prix minimum sont obligatoires.",
      });
    }

    const normalizedMax =
      price_max === "" || price_max === undefined || price_max === null
        ? null
        : Number(price_max);

    if (normalizedMax !== null && normalizedMax < Number(price_min)) {
      return res.status(400).json({
        success: false,
        message: "Le prix maximum doit être supérieur ou égal au prix minimum.",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM pricing_plans WHERE id = ?",
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Pack introuvable.",
      });
    }

    await db.query(
      `UPDATE pricing_plans
       SET tier = ?, name_fr = ?, name_en = ?, description_fr = ?, description_en = ?,
           price_min = ?, price_max = ?, billing = ?, popular = ?, display_order = ?
       WHERE id = ?`,
      [
        tier.trim(),
        name_fr.trim(),
        name_en.trim(),
        description_fr?.trim() || null,
        description_en?.trim() || null,
        price_min,
        normalizedMax,
        billing?.trim() || "project",
        toBoolean(popular) ? 1 : 0,
        toDisplayOrder(display_order),
        id,
      ]
    );

    await db.query(
      "DELETE FROM pricing_plan_features WHERE plan_id = ?",
      [id]
    );

    await insertFeatures(id, features);

    return res.json({
      success: true,
      message: "Pack mis à jour avec succès.",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Cet identifiant de pack existe déjà.",
      });
    }

    console.error("Erreur mise à jour pack :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM pricing_plans WHERE id = ?",
      [req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Pack introuvable.",
      });
    }

    return res.json({
      success: true,
      message: "Pack supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression pack :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// ============================================================
// ADMINISTRATION — OPTIONS (ADDONS)
// ============================================================

exports.getAdminAddons = async (req, res) => {
  try {
    const [addons] = await db.query(
      "SELECT * FROM pricing_addons ORDER BY display_order ASC, id ASC"
    );

    const data = addons.map((addon) => ({
      id: addon.id,
      slug: addon.slug,
      name_fr: addon.name_fr,
      name_en: addon.name_en,
      price_amount: Number(addon.price_amount),
      display_order: addon.display_order,
    }));

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Erreur liste options admin :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

exports.createAddon = async (req, res) => {
  try {
    const { slug, name_fr, name_en, price_amount, display_order } =
      req.body;

    if (
      !slug?.trim() ||
      !name_fr?.trim() ||
      !name_en?.trim() ||
      !price_amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant, nom (FR/EN) et prix sont obligatoires.",
      });
    }

    const [result] = await db.query(
      `INSERT INTO pricing_addons (slug, name_fr, name_en, price_amount, display_order)
       VALUES (?, ?, ?, ?, ?)`,
      [
        slug.trim(),
        name_fr.trim(),
        name_en.trim(),
        price_amount,
        toDisplayOrder(display_order),
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Option créée avec succès.",
      data: { id: result.insertId },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Cet identifiant d'option existe déjà.",
      });
    }

    console.error("Erreur création option :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

exports.updateAddon = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, name_fr, name_en, price_amount, display_order } =
      req.body;

    if (
      !slug?.trim() ||
      !name_fr?.trim() ||
      !name_en?.trim() ||
      !price_amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Identifiant, nom (FR/EN) et prix sont obligatoires.",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM pricing_addons WHERE id = ?",
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({
        success: false,
        message: "Option introuvable.",
      });
    }

    await db.query(
      `UPDATE pricing_addons
       SET slug = ?, name_fr = ?, name_en = ?, price_amount = ?, display_order = ?
       WHERE id = ?`,
      [
        slug.trim(),
        name_fr.trim(),
        name_en.trim(),
        price_amount,
        toDisplayOrder(display_order),
        id,
      ]
    );

    return res.json({
      success: true,
      message: "Option mise à jour avec succès.",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Cet identifiant d'option existe déjà.",
      });
    }

    console.error("Erreur mise à jour option :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

exports.deleteAddon = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM pricing_addons WHERE id = ?",
      [req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Option introuvable.",
      });
    }

    return res.json({
      success: true,
      message: "Option supprimée avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression option :", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};
