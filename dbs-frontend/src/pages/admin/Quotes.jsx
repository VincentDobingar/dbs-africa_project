import { useCallback, useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  X,
  Loader2,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const STATUS_LABELS = {
  new: "Nouveau",
  pending: "En attente",
  in_progress: "En cours",
  completed: "Terminé",
  archived: "Archivé",
};

const CLIENT_TYPE_LABELS = {
  individual: "Particulier",
  organization: "Organisation",
};

const SECTOR_LABELS = {
  telecom: "Télécommunications",
  mobileMoney: "Mobile Money",
  banking: "Banque",
  microfinance: "Microfinance",
  ngo: "ONG",
  association: "Association",
  unitedNations: "Nations Unies",
  government: "Administration publique",
  university: "Universités",
  higherInstitute: "Instituts universitaires",
  publicInstitution: "Établissements publics",
  privateInstitution: "Établissements privés",
  health: "Santé",
  trade: "Commerce",
  industry: "Industrie",
  other: "Autre",
};

const SERVICE_LABELS = {
  web: "Développement web",
  marketing: "Marketing digital",
  data: "Data Analytics",
  bi: "Business Intelligence",
  digital: "Transformation digitale",
  telecom: "Télécommunications",
  pm: "Gestion de projet",
};

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("dbs_admin_token");

  /**
   * Chargement des demandes de devis.
   */
  const loadQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        `${API_URL}/admin/quotes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de charger les demandes de devis."
        );
      }

      setQuotes(data.data || []);
    } catch (error) {
      console.error(
        "Erreur chargement des devis :",
        error
      );

      setErrorMessage(
        error.message ||
          "Une erreur est survenue lors du chargement."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  /**
   * Mise à jour du statut.
   */
  const updateStatus = async (id, status) => {
    try {
      setActionLoading(`status-${id}`);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/admin/quotes/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de modifier le statut."
        );
      }

      setSuccessMessage(
        data.message ||
          "Statut mis à jour avec succès."
      );

      await loadQuotes();

      if (selectedQuote?.id === id) {
        setSelectedQuote((previousQuote) => ({
          ...previousQuote,
          status,
        }));
      }
    } catch (error) {
      console.error(
        "Erreur mise à jour du statut :",
        error
      );

      setErrorMessage(
        error.message ||
          "Une erreur est survenue."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Suppression d’un devis.
   */
  const deleteQuote = async (id) => {
    const confirmed = window.confirm(
      "Supprimer définitivement cette demande de devis ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(`delete-${id}`);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/admin/quotes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de supprimer la demande."
        );
      }

      setSuccessMessage(
        data.message ||
          "Demande supprimée avec succès."
      );

      setSelectedQuote(null);

      await loadQuotes();
    } catch (error) {
      console.error(
        "Erreur suppression du devis :",
        error
      );

      setErrorMessage(
        error.message ||
          "Une erreur est survenue lors de la suppression."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /**
   * Formate la date MySQL.
   */
  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  /**
   * Convertit les codes de services en libellés lisibles.
   */
  const formatServices = (serviceValue) => {
    if (!serviceValue) {
      return "-";
    }

    return serviceValue
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean)
      .map(
        (service) =>
          SERVICE_LABELS[service] || service
      )
      .join(", ");
  };

  /**
   * Libellé du contact principal.
   */
  const getMainName = (quote) => {
    if (quote.client_type === "organization") {
      return quote.company_name || "-";
    }

    return quote.contact_name || "-";
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Demandes de devis
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Consultez et gérez les demandes envoyées
            depuis le site.
          </p>
        </div>

        <button
          type="button"
          onClick={loadQuotes}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />

          Actualiser
        </button>
      </div>

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-[1300px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Nom / Organisation</th>
                <th className="p-4">Email</th>
                <th className="p-4">Téléphone</th>
                <th className="p-4">Pays</th>
                <th className="p-4">Secteur</th>
                <th className="p-4">Service</th>
                <th className="p-4">Devise</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Délai</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan="13"
                    className="p-10 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Chargement des demandes...
                    </div>
                  </td>
                </tr>
              )}

              {!loading &&
                quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="border-t align-top transition hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        {CLIENT_TYPE_LABELS[
                          quote.client_type
                        ] || quote.client_type || "-"}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-gray-900">
                      {getMainName(quote)}
                    </td>

                    <td className="p-4">
                      <a
                        href={`mailto:${quote.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {quote.email || "-"}
                      </a>
                    </td>

                    <td className="p-4">
                      {quote.phone ? (
                        <a
                          href={`tel:${quote.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {quote.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-4">
                      {quote.country || "-"}
                    </td>

                    <td className="p-4">
                      {SECTOR_LABELS[quote.sector] ||
                        quote.sector ||
                        "-"}
                    </td>

                    <td className="max-w-[240px] p-4">
                      <span className="line-clamp-2">
                        {formatServices(quote.service)}
                      </span>
                    </td>

                    <td className="p-4">
                      {quote.currency || "-"}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      {quote.budget || "-"}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      {quote.timeline || "-"}
                    </td>

                    <td className="p-4">
                      <select
                        value={quote.status || "new"}
                        onChange={(event) =>
                          updateStatus(
                            quote.id,
                            event.target.value
                          )
                        }
                        disabled={
                          actionLoading ===
                          `status-${quote.id}`
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500"
                      >
                        <option value="new">
                          Nouveau
                        </option>

                        <option value="pending">
                          En attente
                        </option>

                        <option value="in_progress">
                          En cours
                        </option>

                        <option value="completed">
                          Terminé
                        </option>

                        <option value="archived">
                          Archivé
                        </option>
                      </select>
                    </td>

                    <td className="whitespace-nowrap p-4 text-gray-500">
                      {formatDate(quote.created_at)}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedQuote(quote)
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                          <Eye size={15} />
                          Détails
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteQuote(quote.id)
                          }
                          disabled={
                            actionLoading ===
                            `delete-${quote.id}`
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {actionLoading ===
                          `delete-${quote.id}` ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={15} />
                          )}

                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && quotes.length === 0 && (
                <tr>
                  <td
                    colSpan="13"
                    className="p-10 text-center text-gray-500"
                  >
                    Aucune demande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE DE DÉTAIL */}
      {selectedQuote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Détails de la demande
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Demande n° {selectedQuote.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <DetailItem
                label="Type de client"
                value={
                  CLIENT_TYPE_LABELS[
                    selectedQuote.client_type
                  ] ||
                  selectedQuote.client_type
                }
              />

              <DetailItem
                label="Statut"
                value={
                  STATUS_LABELS[selectedQuote.status] ||
                  selectedQuote.status ||
                  "Nouveau"
                }
              />

              <DetailItem
                label="Nom du contact"
                value={selectedQuote.contact_name}
              />

              <DetailItem
                label="Organisation"
                value={selectedQuote.company_name}
              />

              <DetailItem
                label="Email"
                value={selectedQuote.email}
              />

              <DetailItem
                label="Téléphone"
                value={selectedQuote.phone}
              />

              <DetailItem
                label="Pays"
                value={selectedQuote.country}
              />

              <DetailItem
                label="Secteur d’activité"
                value={
                  SECTOR_LABELS[
                    selectedQuote.sector
                  ] ||
                  selectedQuote.sector
                }
              />

              <DetailItem
                label="Services demandés"
                value={formatServices(
                  selectedQuote.service
                )}
              />

              <DetailItem
                label="Devise"
                value={selectedQuote.currency}
              />

              <DetailItem
                label="Budget"
                value={selectedQuote.budget}
              />

              <DetailItem
                label="Délai souhaité"
                value={selectedQuote.timeline}
              />

              <DetailItem
                label="Date de création"
                value={formatDate(
                  selectedQuote.created_at
                )}
              />

              <div className="md:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Description du besoin
                </p>

                <div className="min-h-[120px] whitespace-pre-wrap rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-7 text-gray-700">
                  {selectedQuote.description || "-"}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 px-6 py-5">
              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedQuote.id,
                    "in_progress"
                  )
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Mettre en cours
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedQuote.id,
                    "completed"
                  )
                }
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Marquer terminé
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedQuote.id,
                    "archived"
                  )
                }
                className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Archiver
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteQuote(selectedQuote.id)
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <div className="min-h-[48px] rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}