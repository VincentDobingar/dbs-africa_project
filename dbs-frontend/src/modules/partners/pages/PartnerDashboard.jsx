import {
  useEffect,
  useState,
} from "react";

import {
  Award,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Globe2,
  LoaderCircle,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import partnerApi from "../api/partnerApi";

const formatNumber = (value) => {
  return new Intl.NumberFormat(
    "fr-FR",
    {
      maximumFractionDigits: 2,
    }
  ).format(Number(value || 0));
};

const formatDate = (value) => {
  if (!value) {
    return "Non disponible";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date invalide";
  }

  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
};

const formatList = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        String(item).trim()
      )
      .filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getStatusConfiguration = (
  status
) => {
  const configurations = {
    approved: {
      label: "Compte approuvé",
      className:
        "bg-emerald-100 text-emerald-700",
    },
    pending: {
      label: "Compte en attente",
      className:
        "bg-amber-100 text-amber-700",
    },
    rejected: {
      label: "Demande rejetée",
      className:
        "bg-red-100 text-red-700",
    },
    suspended: {
      label: "Compte suspendu",
      className:
        "bg-slate-200 text-slate-700",
    },
  };

  return (
    configurations[status] || {
      label:
        status || "Statut inconnu",
      className:
        "bg-slate-100 text-slate-700",
    }
  );
};

function ProfileItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-dbsOrange shadow-sm">
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words font-semibold text-slate-800">
            {value || "Non renseigné"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PartnerDashboard() {
  const navigate = useNavigate();

  const [partner, setPartner] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    showFullExperience,
    setShowFullExperience,
  ] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await partnerApi.get(
          "/partners/auth/me"
        );

      const profile =
        response.data.data;

      setPartner(profile);

      localStorage.setItem(
        "dbs_partner_user",
        JSON.stringify(profile)
      );
    } catch (requestError) {
      setError(
        requestError.response?.data
          ?.message ||
        "Impossible de charger le tableau de bord."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "dbs_partner_token"
    );

    localStorage.removeItem(
      "dbs_partner_user"
    );

    navigate(
      "/partner/login",
      {
        replace: true,
      }
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <LoaderCircle
            size={40}
            className="mx-auto animate-spin text-dbsOrange"
          />

          <p className="mt-4 text-sm text-slate-500">
            Chargement de votre espace partenaire...
          </p>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Tableau de bord indisponible
          </h1>

          <p className="mt-3 text-red-600">
            {error ||
              "Les informations du partenaire sont indisponibles."}
          </p>

          <button
            type="button"
            onClick={loadProfile}
            className="mt-6 rounded-xl bg-dbsOrange px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const statusConfiguration =
    getStatusConfiguration(
      partner.status
    );

  const preferredServices =
    formatList(
      partner.preferred_services
    );

  const coverageAreas =
    formatList(
      partner.coverage_areas
    );

  const statistics = [
    {
      label:
        "Prospects enregistrés",
      value:
        partner.total_leads || 0,
      icon: BriefcaseBusiness,
      color: "bg-blue-500",
    },
    {
      label:
        "Prospects gagnés",
      value:
        partner.won_leads || 0,
      icon: Target,
      color: "bg-emerald-500",
    },
    {
      label:
        "Taux de conversion",
      value:
        `${partner.conversion_rate || 0} %`,
      icon: TrendingUp,
      color: "bg-violet-500",
    },
    {
      label:
        "Commissions payées",
      value:
        formatNumber(
          partner.paid_commissions
        ),
      icon: CircleDollarSign,
      color: "bg-orange-500",
    },
  ];

  const experienceIsLong =
    Boolean(
      partner.experience &&
      partner.experience.length > 160
    );

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <header className="border-b bg-[#031b2b] px-4 py-5 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <div>
            <p className="text-sm text-slate-300">
              Espace partenaire DBS Africa
            </p>

            <h1 className="mt-1 text-xl font-bold">
              {partner.full_name}
            </h1>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* BIENVENUE */}

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-dbsOrange">
                Bienvenue
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {partner.full_name}
              </h2>

              {partner.company_name && (
                <p className="mt-1 text-slate-600">
                  {partner.company_name}
                </p>
              )}

              <p className="mt-2 text-slate-500">
                Code partenaire :{" "}
                <span className="font-semibold text-slate-700">
                  {partner.partner_code}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-orange-50 px-5 py-4 text-orange-700">
              <Award size={30} />

              <div>
                <p className="text-xs uppercase">
                  Niveau
                </p>

                <p className="font-bold capitalize">
                  {partner.level}
                </p>

                <p className="text-sm">
                  Commission :{" "}
                  {partner.commission_rate} %
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROFIL */}

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-dbsOrange">
                Informations personnelles
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Mon profil partenaire
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Informations enregistrées auprès de DBS Africa.
              </p>
            </div>

            <span
              className={`inline-flex self-start rounded-full px-4 py-2 text-sm font-semibold ${statusConfiguration.className}`}
            >
              {statusConfiguration.label}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ProfileItem
              icon={UserRound}
              label="Nom complet"
              value={partner.full_name}
            />

            <ProfileItem
              icon={Award}
              label="Code partenaire"
              value={partner.partner_code}
            />

            <ProfileItem
              icon={Building2}
              label="Type de partenaire"
              value={
                partner.partner_type ===
                "company"
                  ? "Entreprise"
                  : "Agent individuel"
              }
            />

            {partner.company_name && (
              <ProfileItem
                icon={Building2}
                label="Entreprise"
                value={
                  partner.company_name
                }
              />
            )}

            <ProfileItem
              icon={Mail}
              label="Adresse e-mail"
              value={partner.email}
            />

            <ProfileItem
              icon={Phone}
              label="Téléphone"
              value={
                partner.phone
                  ? `${partner.country_code || ""} ${partner.phone}`.trim()
                  : null
              }
            />

            <ProfileItem
              icon={Globe2}
              label="Pays"
              value={partner.country}
            />

            <ProfileItem
              icon={MapPin}
              label="Ville"
              value={partner.city}
            />

            <ProfileItem
              icon={MapPin}
              label="Adresse"
              value={partner.address}
            />

            <ProfileItem
              icon={Briefcase}
              label="Profession"
              value={partner.profession}
            />

            <ProfileItem
              icon={CalendarDays}
              label="Membre depuis"
              value={formatDate(
                partner.created_at
              )}
            />

            <ProfileItem
              icon={Clock3}
              label="Dernière connexion"
              value={formatDate(
                partner.last_login_at
              )}
            />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {/* EXPÉRIENCE LIMITÉE */}

            <article className="rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900">
                Expérience commerciale
              </h3>

              <div className="mt-3">
                <p
                  className={`whitespace-pre-line leading-7 text-slate-600 ${
                    showFullExperience
                      ? ""
                      : "line-clamp-3"
                  }`}
                >
                  {partner.experience ||
                    "Aucune expérience renseignée."}
                </p>

                {experienceIsLong && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowFullExperience(
                        (current) =>
                          !current
                      )
                    }
                    className="mt-3 text-sm font-semibold text-dbsOrange hover:text-orange-600"
                  >
                    {showFullExperience
                      ? "Afficher moins"
                      : "Afficher plus"}
                  </button>
                )}
              </div>
            </article>

            {/* CYCLE DU COMPTE */}

            <article className="rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900">
                Cycle du compte
              </h3>

              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <dt className="text-slate-500">
                    Demande déposée
                  </dt>

                  <dd className="font-semibold text-slate-800">
                    {formatDate(
                      partner.created_at
                    )}
                  </dd>
                </div>

                <div className="flex flex-col justify-between gap-1 border-t pt-3 sm:flex-row">
                  <dt className="text-slate-500">
                    Demande approuvée
                  </dt>

                  <dd className="font-semibold text-slate-800">
                    {formatDate(
                      partner.approved_at
                    )}
                  </dd>
                </div>

                <div className="flex flex-col justify-between gap-1 border-t pt-3 sm:flex-row">
                  <dt className="text-slate-500">
                    Compte activé
                  </dt>

                  <dd className="font-semibold text-slate-800">
                    {formatDate(
                      partner.activated_at
                    )}
                  </dd>
                </div>
              </dl>
            </article>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900">
                Services préférés
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {preferredServices.length >
                0 ? (
                  preferredServices.map(
                    (service) => (
                      <span
                        key={service}
                        className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                      >
                        {service}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-sm text-slate-500">
                    Aucun service renseigné.
                  </p>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900">
                Zones géographiques couvertes
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {coverageAreas.length > 0 ? (
                  coverageAreas.map(
                    (area) => (
                      <span
                        key={area}
                        className="rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700"
                      >
                        {area}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-sm text-slate-500">
                    Aucune zone renseignée.
                  </p>
                )}
              </div>
            </article>
          </div>
        </section>

        {/* STATISTIQUES */}

        <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${item.color}`}
                >
                  <Icon size={23} />
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  {item.label}
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {item.value}
                </p>
              </article>
            );
          })}
        </section>

        {/* ACTIVITÉ ET RÉSULTATS */}

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">
              Activité commerciale
            </h3>

            <dl className="mt-5 space-y-4">
              <div className="flex justify-between border-b pb-3">
                <dt className="text-slate-500">
                  Nouveaux prospects
                </dt>

                <dd className="font-semibold">
                  {partner.new_leads || 0}
                </dd>
              </div>

              <div className="flex justify-between border-b pb-3">
                <dt className="text-slate-500">
                  Prospects actifs
                </dt>

                <dd className="font-semibold">
                  {partner.active_leads || 0}
                </dd>
              </div>

              <div className="flex justify-between border-b pb-3">
                <dt className="text-slate-500">
                  Prospects gagnés
                </dt>

                <dd className="font-semibold text-emerald-600">
                  {partner.won_leads || 0}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-slate-500">
                  Prospects perdus
                </dt>

                <dd className="font-semibold text-red-600">
                  {partner.lost_leads || 0}
                </dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">
              Résultats
            </h3>

            <dl className="mt-5 space-y-4">
              <div className="flex justify-between border-b pb-3">
                <dt className="text-slate-500">
                  Chiffre d’affaires généré
                </dt>

                <dd className="font-semibold">
                  {formatNumber(
                    partner.generated_revenue
                  )}
                </dd>
              </div>

              <div className="flex justify-between border-b pb-3">
                <dt className="text-slate-500">
                  Commissions payées
                </dt>

                <dd className="font-semibold text-emerald-600">
                  {formatNumber(
                    partner.paid_commissions
                  )}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-slate-500">
                  Taux de commission
                </dt>

                <dd className="font-semibold text-dbsOrange">
                  {partner.commission_rate} %
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-5 text-slate-400">
              Les montants sont présentés dans leur
              valeur enregistrée. La ventilation par
              devise sera disponible dans la page
              Commissions.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}