import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Ban,
  Check,
  CheckCircle,
  Clipboard,
  KeyRound,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRoundCheck,
  X,
  XCircle,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const STATUS_CONFIG = {
  pending: {
    label: "En attente",
    className:
      "bg-amber-100 text-amber-700",
  },
  approved: {
    label: "Approuvé",
    className:
      "bg-emerald-100 text-emerald-700",
  },
  rejected: {
    label: "Rejeté",
    className:
      "bg-red-100 text-red-700",
  },
  suspended: {
    label: "Suspendu",
    className:
      "bg-slate-200 text-slate-700",
  },
};

export default function PartnersManager() {
  const [partners, setPartners] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(null);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [activationData, setActivationData] =
    useState(null);

  const getToken = () =>
    localStorage.getItem(
      "dbs_admin_token"
    );

  const loadPartners = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params =
        new URLSearchParams();

      if (statusFilter) {
        params.set(
          "status",
          statusFilter
        );
      }

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      const query =
        params.toString()
          ? `?${params.toString()}`
          : "";

      const response = await fetch(
        `${API_URL}/partners${query}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Chargement impossible."
        );
      }

      setPartners(data.data || []);
    } catch (requestError) {
      setError(
        requestError.message ||
        "Impossible de charger les partenaires."
      );
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(
      loadPartners,
      300
    );

    return () => clearTimeout(timeout);
  }, [loadPartners]);

  const updateStatus = async (
    partner,
    status,
    extraData = {}
  ) => {
    try {
      setActionLoading(partner.id);
      setError("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/partners/${partner.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            status,
            ...extraData,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Modification impossible."
        );
      }

      setSuccessMessage(data.message);

      if (data.data?.activation_url) {
        setActivationData({
          full_name:
            data.data.full_name,
          email:
            data.data.email,
          partner_code:
            data.data.partner_code,
          activation_url:
            data.data.activation_url,
          activation_expires_at:
            data.data
              .activation_expires_at,
        });
      }

      await loadPartners();
    } catch (requestError) {
      setError(
        requestError.message ||
        "Impossible de modifier le partenaire."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const approvePartner = (partner) => {
    const confirmed = window.confirm(
      `Approuver la demande de ${partner.full_name} ?`
    );

    if (!confirmed) {
      return;
    }

    updateStatus(
      partner,
      "approved",
      {
        admin_notes:
          "Dossier partenaire validé par DBS Africa.",
      }
    );
  };

  const rejectPartner = (partner) => {
    const reason = window.prompt(
      `Motif du rejet de ${partner.full_name} :`
    );

    if (!reason?.trim()) {
      return;
    }

    updateStatus(
      partner,
      "rejected",
      {
        rejection_reason:
          reason.trim(),
        admin_notes:
          "Demande rejetée par l’administrateur.",
      }
    );
  };

  const suspendPartner = (partner) => {
    const confirmed = window.confirm(
      `Suspendre le compte de ${partner.full_name} ?`
    );

    if (!confirmed) {
      return;
    }

    updateStatus(
      partner,
      "suspended",
      {
        admin_notes:
          "Compte suspendu par l’administrateur.",
      }
    );
  };

  const copyActivationLink = async () => {
    try {
      await navigator.clipboard.writeText(
        activationData.activation_url
      );

      setSuccessMessage(
        "Lien d’activation copié."
      );
    } catch {
      setError(
        "Impossible de copier automatiquement le lien."
      );
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(new Date(value));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-dbsOrange">
            Programme commercial
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Partenaires
          </h1>

          <p className="mt-2 text-slate-500">
            Validez les demandes et gérez
            l’activation des comptes partenaires.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPartners}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw
            size={19}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Actualiser
        </button>
      </header>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <XCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <CheckCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p>{successMessage}</p>
        </div>
      )}

      <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Nom, e-mail, téléphone ou code partenaire..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-dbsOrange"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-dbsOrange"
        >
          <option value="">
            Tous les statuts
          </option>

          <option value="pending">
            En attente
          </option>

          <option value="approved">
            Approuvés
          </option>

          <option value="rejected">
            Rejetés
          </option>

          <option value="suspended">
            Suspendus
          </option>
        </select>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <LoaderCircle
              size={34}
              className="animate-spin text-dbsOrange"
            />
          </div>
        ) : partners.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            Aucun partenaire trouvé.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">
                    Partenaire
                  </th>

                  <th className="px-5 py-4">
                    Coordonnées
                  </th>

                  <th className="px-5 py-4">
                    Statut
                  </th>

                  <th className="px-5 py-4">
                    Activation
                  </th>

                  <th className="px-5 py-4">
                    Commission
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {partners.map((partner) => {
                  const status =
                    STATUS_CONFIG[
                      partner.status
                    ] ||
                    STATUS_CONFIG.pending;

                  const processing =
                    actionLoading ===
                    partner.id;

                  return (
                    <tr
                      key={partner.id}
                      className="align-top hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-5">
                        <p className="font-semibold text-slate-900">
                          {partner.full_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {partner.partner_code}
                        </p>

                        {partner.company_name && (
                          <p className="mt-1 text-sm text-slate-600">
                            {partner.company_name}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5 text-sm">
                        <p className="text-slate-700">
                          {partner.email}
                        </p>

                        <p className="mt-1 text-slate-500">
                          {partner.country_code}{" "}
                          {partner.phone}
                        </p>

                        <p className="mt-1 text-slate-500">
                          {partner.city
                            ? `${partner.city}, `
                            : ""}
                          {partner.country}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>

                        <p className="mt-2 text-xs text-slate-400">
                          Demande :{" "}
                          {formatDate(
                            partner.created_at
                          )}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        {partner.activated_at ? (
                          <div className="text-sm text-emerald-600">
                            <p className="flex items-center gap-2 font-semibold">
                              <UserRoundCheck
                                size={17}
                              />
                              Compte activé
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {formatDate(
                                partner.activated_at
                              )}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-amber-600">
                            Non activé
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-semibold text-slate-900">
                          {
                            partner.commission_rate
                          }{" "}
                          %
                        </p>

                        <p className="mt-1 text-xs capitalize text-slate-500">
                          Niveau {partner.level}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex flex-wrap justify-end gap-2">
                          {partner.status ===
                            "pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  approvePartner(
                                    partner
                                  )
                                }
                                disabled={
                                  processing
                                }
                                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                              >
                                <Check size={16} />
                                Approuver
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  rejectPartner(
                                    partner
                                  )
                                }
                                disabled={
                                  processing
                                }
                                className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                              >
                                <X size={16} />
                                Rejeter
                              </button>
                            </>
                          )}

                          {partner.status ===
                            "approved" &&
                            !partner.activated_at && (
                              <button
                                type="button"
                                onClick={() =>
                                  approvePartner(
                                    partner
                                  )
                                }
                                disabled={
                                  processing
                                }
                                className="flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-100 disabled:opacity-50"
                              >
                                <KeyRound
                                  size={16}
                                />
                                Nouveau lien
                              </button>
                            )}

                          {partner.status ===
                            "approved" && (
                            <button
                              type="button"
                              onClick={() =>
                                suspendPartner(
                                  partner
                                )
                              }
                              disabled={
                                processing
                              }
                              className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
                            >
                              <Ban size={16} />
                              Suspendre
                            </button>
                          )}

                          {partner.status ===
                            "suspended" && (
                            <button
                              type="button"
                              onClick={() =>
                                approvePartner(
                                  partner
                                )
                              }
                              disabled={
                                processing
                              }
                              className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                            >
                              <ShieldCheck
                                size={16}
                              />
                              Réactiver
                            </button>
                          )}

                          {processing && (
                            <LoaderCircle
                              size={19}
                              className="animate-spin text-dbsOrange"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {activationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Partenaire approuvé
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Lien d’activation généré
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActivationData(null)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">
                {activationData.full_name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {activationData.email}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {activationData.partner_code}
              </p>
            </div>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Lien à transmettre au partenaire
            </label>

            <textarea
              readOnly
              value={
                activationData.activation_url
              }
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm"
            />

            <p className="mt-2 text-xs text-slate-500">
              Expiration :{" "}
              {formatDate(
                activationData
                  .activation_expires_at
              )}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setActivationData(null)
                }
                className="rounded-xl border px-5 py-3 font-semibold text-slate-700"
              >
                Fermer
              </button>

              <button
                type="button"
                onClick={copyActivationLink}
                className="flex items-center justify-center gap-2 rounded-xl bg-dbsOrange px-5 py-3 font-semibold text-white hover:bg-orange-600"
              >
                <Clipboard size={19} />
                Copier le lien
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}