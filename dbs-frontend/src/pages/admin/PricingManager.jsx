import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const EMPTY_PLAN = {
  tier: "",
  name_fr: "",
  name_en: "",
  description_fr: "",
  description_en: "",
  price_min: "",
  price_max: "",
  billing: "project",
  popular: false,
  display_order: 0,
  features: [],
};

const EMPTY_ADDON = {
  slug: "",
  name_fr: "",
  name_en: "",
  price_amount: "",
  display_order: 0,
};

export default function PricingManager() {
  const token = localStorage.getItem("dbs_admin_token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const [plans, setPlans] = useState([]);
  const [addons, setAddons] = useState([]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState(EMPTY_PLAN);

  const [editingAddon, setEditingAddon] = useState(null);
  const [addonForm, setAddonForm] = useState(EMPTY_ADDON);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [plansRes, addonsRes] = await Promise.all([
        fetch(`${API_URL}/pricing/admin/plans`, {
          headers: authHeaders,
        }),
        fetch(`${API_URL}/pricing/admin/addons`, {
          headers: authHeaders,
        }),
      ]);

      const plansData = await plansRes.json();
      const addonsData = await addonsRes.json();

      if (!plansRes.ok) {
        throw new Error(
          plansData.message || "Impossible de charger les packs."
        );
      }

      if (!addonsRes.ok) {
        throw new Error(
          addonsData.message || "Impossible de charger les options."
        );
      }

      setPlans(plansData.data || []);
      setAddons(addonsData.data || []);
    } catch (error) {
      setErrorMessage(
        error.message || "Une erreur est survenue lors du chargement."
      );
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ============================================================
  // PACKS
  // ============================================================

  const resetPlanForm = () => {
    setEditingPlan(null);
    setPlanForm(EMPTY_PLAN);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanForm({
      tier: plan.tier,
      name_fr: plan.name_fr,
      name_en: plan.name_en,
      description_fr: plan.description_fr || "",
      description_en: plan.description_en || "",
      price_min: plan.price_min,
      price_max: plan.price_max ?? "",
      billing: plan.billing || "project",
      popular: Boolean(plan.popular),
      display_order: plan.display_order || 0,
      features: plan.features || [],
    });
  };

  const handlePlanFieldChange = (event) => {
    const { name, value, type, checked } = event.target;

    setPlanForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index, lang, value) => {
    setPlanForm((previous) => {
      const features = [...previous.features];
      features[index] = { ...features[index], [lang]: value };
      return { ...previous, features };
    });
  };

  const addFeatureRow = () => {
    setPlanForm((previous) => ({
      ...previous,
      features: [...previous.features, { fr: "", en: "" }],
    }));
  };

  const removeFeatureRow = (index) => {
    setPlanForm((previous) => ({
      ...previous,
      features: previous.features.filter((_, i) => i !== index),
    }));
  };

  const handlePlanSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const url = editingPlan
        ? `${API_URL}/pricing/admin/plans/${editingPlan.id}`
        : `${API_URL}/pricing/admin/plans`;

      const response = await fetch(url, {
        method: editingPlan ? "PUT" : "POST",
        headers: authHeaders,
        body: JSON.stringify(planForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible d'enregistrer le pack."
        );
      }

      setSuccessMessage(
        data.message || "Pack enregistré avec succès."
      );

      resetPlanForm();
      await loadData();
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePlan = async (plan) => {
    if (!confirm(`Supprimer le pack « ${plan.name_fr} » ?`)) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/pricing/admin/plans/${plan.id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de supprimer le pack."
        );
      }

      await loadData();
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue.");
    }
  };

  // ============================================================
  // OPTIONS (ADDONS)
  // ============================================================

  const resetAddonForm = () => {
    setEditingAddon(null);
    setAddonForm(EMPTY_ADDON);
  };

  const handleEditAddon = (addon) => {
    setEditingAddon(addon);
    setAddonForm({
      slug: addon.slug,
      name_fr: addon.name_fr,
      name_en: addon.name_en,
      price_amount: addon.price_amount,
      display_order: addon.display_order || 0,
    });
  };

  const handleAddonFieldChange = (event) => {
    const { name, value } = event.target;

    setAddonForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddonSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const url = editingAddon
        ? `${API_URL}/pricing/admin/addons/${editingAddon.id}`
        : `${API_URL}/pricing/admin/addons`;

      const response = await fetch(url, {
        method: editingAddon ? "PUT" : "POST",
        headers: authHeaders,
        body: JSON.stringify(addonForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible d'enregistrer l'option."
        );
      }

      setSuccessMessage(
        data.message || "Option enregistrée avec succès."
      );

      resetAddonForm();
      await loadData();
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddon = async (addon) => {
    if (!confirm(`Supprimer l'option « ${addon.name_fr} » ?`)) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/pricing/admin/addons/${addon.id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de supprimer l'option."
        );
      }

      await loadData();
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Gestion des tarifs
        </h1>
        <p className="text-slate-500">
          Modifier les packs et options affichés sur la page publique
          « Tarifs », sans déploiement.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Chargement…</p>
      ) : (
        <>
          {/* ============================================================
              PACKS
          ============================================================ */}

          <form
            onSubmit={handlePlanSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold">
              {editingPlan ? "Modifier le pack" : "Ajouter un pack"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="tier"
                value={planForm.tier}
                onChange={handlePlanFieldChange}
                placeholder="Identifiant (ex. starter)"
                required
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="price_min"
                value={planForm.price_min}
                onChange={handlePlanFieldChange}
                placeholder="Prix minimum en FCFA"
                required
                min="0"
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="price_max"
                value={planForm.price_max}
                onChange={handlePlanFieldChange}
                placeholder="Prix maximum en FCFA (laisser vide si pas de plafond)"
                min="0"
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name_fr"
                value={planForm.name_fr}
                onChange={handlePlanFieldChange}
                placeholder="Nom (FR)"
                required
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="name_en"
                value={planForm.name_en}
                onChange={handlePlanFieldChange}
                placeholder="Nom (EN)"
                required
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <textarea
                name="description_fr"
                value={planForm.description_fr}
                onChange={handlePlanFieldChange}
                placeholder="Description (FR)"
                rows="2"
                className="border rounded-xl px-4 py-3"
              />

              <textarea
                name="description_en"
                value={planForm.description_en}
                onChange={handlePlanFieldChange}
                placeholder="Description (EN)"
                rows="2"
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 items-center">
              <input
                name="billing"
                value={planForm.billing}
                onChange={handlePlanFieldChange}
                placeholder="Facturation (ex. project)"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="display_order"
                value={planForm.display_order}
                onChange={handlePlanFieldChange}
                placeholder="Ordre d'affichage"
                className="border rounded-xl px-4 py-3"
              />

              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  name="popular"
                  checked={planForm.popular}
                  onChange={handlePlanFieldChange}
                  className="w-5 h-5"
                />
                Pack mis en avant
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-700">
                  Fonctionnalités
                </p>

                <button
                  type="button"
                  onClick={addFeatureRow}
                  className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900"
                >
                  <Plus size={16} />
                  Ajouter une ligne
                </button>
              </div>

              {planForm.features.map((feature, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-[1fr_1fr_auto] gap-3"
                >
                  <input
                    value={feature.fr}
                    onChange={(event) =>
                      handleFeatureChange(index, "fr", event.target.value)
                    }
                    placeholder="Fonctionnalité (FR)"
                    className="border rounded-xl px-4 py-2"
                  />

                  <input
                    value={feature.en}
                    onChange={(event) =>
                      handleFeatureChange(index, "en", event.target.value)
                    }
                    placeholder="Fonctionnalité (EN)"
                    className="border rounded-xl px-4 py-2"
                  />

                  <button
                    type="button"
                    onClick={() => removeFeatureRow(index)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {planForm.features.length === 0 && (
                <p className="text-sm text-slate-400">
                  Aucune fonctionnalité pour l'instant.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60"
              >
                {saving
                  ? "Enregistrement..."
                  : editingPlan
                  ? "Mettre à jour"
                  : "Enregistrer"}
              </button>

              {editingPlan && (
                <button
                  type="button"
                  onClick={resetPlanForm}
                  className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Pack</th>
                  <th className="p-4">Prix</th>
                  <th className="p-4">Mis en avant</th>
                  <th className="p-4">Fonctionnalités</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-t">
                    <td className="p-4 font-medium">
                      {plan.name_fr}
                      <div className="text-xs text-slate-400">
                        {plan.tier}
                      </div>
                    </td>

                    <td className="p-4">
                      {plan.price_max
                        ? `${Number(plan.price_min).toLocaleString()} - ${Number(
                            plan.price_max
                          ).toLocaleString()} FCFA`
                        : `À partir de ${Number(
                            plan.price_min
                          ).toLocaleString()} FCFA`}
                    </td>

                    <td className="p-4">
                      {plan.popular ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Oui
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-500">
                          Non
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-slate-500">
                      {plan.features.length}
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEditPlan(plan)}
                        className="px-4 py-2 bg-slate-100 rounded-lg"
                      >
                        Modifier
                      </button>

                      <button
                        onClick={() => handleDeletePlan(plan)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}

                {plans.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-500">
                      Aucun pack enregistré.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ============================================================
              OPTIONS (ADDONS)
          ============================================================ */}

          <form
            onSubmit={handleAddonSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold">
              {editingAddon ? "Modifier l'option" : "Ajouter une option"}
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="slug"
                value={addonForm.slug}
                onChange={handleAddonFieldChange}
                placeholder="Identifiant (ex. maintenance)"
                required
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="price_amount"
                value={addonForm.price_amount}
                onChange={handleAddonFieldChange}
                placeholder="Prix en FCFA"
                required
                min="0"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="display_order"
                value={addonForm.display_order}
                onChange={handleAddonFieldChange}
                placeholder="Ordre d'affichage"
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name_fr"
                value={addonForm.name_fr}
                onChange={handleAddonFieldChange}
                placeholder="Nom (FR)"
                required
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="name_en"
                value={addonForm.name_en}
                onChange={handleAddonFieldChange}
                placeholder="Nom (EN)"
                required
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60"
              >
                {saving
                  ? "Enregistrement..."
                  : editingAddon
                  ? "Mettre à jour"
                  : "Enregistrer"}
              </button>

              {editingAddon && (
                <button
                  type="button"
                  onClick={resetAddonForm}
                  className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Option</th>
                  <th className="p-4">Prix</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {addons.map((addon) => (
                  <tr key={addon.id} className="border-t">
                    <td className="p-4 font-medium">
                      {addon.name_fr}
                      <div className="text-xs text-slate-400">
                        {addon.slug}
                      </div>
                    </td>

                    <td className="p-4">
                      {Number(addon.price_amount).toLocaleString()} FCFA
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEditAddon(addon)}
                        className="px-4 py-2 bg-slate-100 rounded-lg"
                      >
                        Modifier
                      </button>

                      <button
                        onClick={() => handleDeleteAddon(addon)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}

                {addons.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-6 text-center text-slate-500">
                      Aucune option enregistrée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
