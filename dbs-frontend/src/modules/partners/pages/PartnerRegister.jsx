import {
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  CheckCircle,
  LoaderCircle,
  Send,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import countryList from "react-select-country-list";

import {
  getCountryCallingCode,
} from "libphonenumber-js";

import partnerApi from "../api/partnerApi";

import dbsLogo from "../../../assets/logo/dbs-logo1.png";

const AVAILABLE_SERVICES = [
  "Développement web",
  "Développement d’applications",
  "Data Analytics",
  "Business Intelligence",
  "Marketing digital",
  "Solutions télécoms",
  "Conseil en transformation digitale",
];

const initialForm = {
  partner_type: "individual",
  full_name: "",
  company_name: "",
  email: "",
  country_iso: "BI",
  country: "Burundi",
  country_code: "+257",
  phone: "",
  city: "",
  profession: "",
  experience: "",
  preferred_services: [],
  coverage_areas: "",
};

export default function PartnerRegister() {
  const [form, setForm] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const countries = useMemo(
    () => countryList().getData(),
    []
  );

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleCountryChange = (
    event
  ) => {
    const countryIso =
      event.target.value;

    const selectedCountry =
      countries.find(
        (country) =>
          country.value === countryIso
      );

    let dialCode = "";

    if (countryIso) {
      try {
        dialCode =
          `+${getCountryCallingCode(
            countryIso
          )}`;
      } catch {
        dialCode = "";
      }
    }

    setForm((current) => ({
      ...current,
      country_iso: countryIso,
      country:
        selectedCountry?.label || "",
      country_code: dialCode,
    }));

    setError("");
  };

  const toggleService = (service) => {
    setForm((current) => {
      const selected =
        current.preferred_services.includes(
          service
        );

      return {
        ...current,

        preferred_services: selected
          ? current.preferred_services.filter(
              (item) =>
                item !== service
            )
          : [
              ...current.preferred_services,
              service,
            ],
      };
    });
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.country_iso ||
      !form.country.trim() ||
      !form.country_code.trim() ||
      !form.phone.trim()
    ) {
      setError(
        "Le nom, l’e-mail, le pays et le téléphone sont obligatoires."
      );

      return;
    }

    if (
      form.partner_type ===
        "company" &&
      !form.company_name.trim()
    ) {
      setError(
        "Le nom de l’entreprise est obligatoire."
      );

      return;
    }

    if (
      form.preferred_services.length ===
      0
    ) {
      setError(
        "Sélectionnez au moins un service."
      );

      return;
    }

    const coverageAreas =
      form.coverage_areas
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const response =
        await partnerApi.post(
          "/partners/register",
          {
            partner_type:
              form.partner_type,

            full_name:
              form.full_name.trim(),

            company_name:
              form.partner_type ===
              "company"
                ? form.company_name.trim()
                : null,

            email:
              form.email
                .trim()
                .toLowerCase(),

            country_code:
              form.country_code.trim(),

            phone:
              form.phone.trim(),

            country:
              form.country.trim(),

            city:
              form.city.trim() ||
              null,

            profession:
              form.profession.trim() ||
              null,

            experience:
              form.experience.trim() ||
              null,

            preferred_services:
              form.preferred_services,

            coverage_areas:
              coverageAreas,
          }
        );

      setSuccessMessage(
        response.data.message ||
        "Votre demande a été enregistrée."
      );

      setForm(initialForm);
    } catch (requestError) {
      setError(
        requestError.response?.data
          ?.message ||
        "Impossible d’enregistrer la demande."
      );
    } finally {
      setLoading(false);
    }
  };

  if (successMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-10">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle size={42} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Demande enregistrée
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            {successMessage}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            L’équipe DBS Africa examinera votre dossier.
            Vous recevrez les instructions d’activation
            après son approbation.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
            >
              Retour au site
            </Link>

            <Link
              to="/partner/login"
              className="rounded-xl bg-dbsOrange px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Espace partenaire
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <header className="bg-[#031b2b] px-6 py-8 text-white sm:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <img
                src={dbsLogo}
                alt="DBS Africa"
                className="h-16 w-auto object-contain object-left"
              />

              <h1 className="mt-6 text-3xl font-bold">
                Devenir partenaire commercial
              </h1>

              <p className="mt-3 max-w-2xl text-slate-300">
                Rejoignez le réseau DBS Africa et
                développez votre activité grâce à notre
                programme de commissions.
              </p>
            </div>

            <Link
              to="/partner/login"
              className="flex items-center gap-2 self-start text-sm font-semibold text-orange-300 hover:text-orange-200"
            >
              <ArrowLeft size={18} />
              Connexion
            </Link>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-6 sm:p-10"
        >
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Informations générales
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="partner_type"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Type de partenaire
                </label>

                <select
                  id="partner_type"
                  name="partner_type"
                  value={
                    form.partner_type
                  }
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-dbsOrange"
                >
                  <option value="individual">
                    Agent individuel
                  </option>

                  <option value="company">
                    Entreprise
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="full_name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nom complet *
                </label>

                <input
                  id="full_name"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
                  required
                />
              </div>

              {form.partner_type ===
                "company" && (
                <div className="md:col-span-2">
                  <label
                    htmlFor="company_name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Nom de l’entreprise *
                  </label>

                  <input
                    id="company_name"
                    name="company_name"
                    value={
                      form.company_name
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Adresse e-mail *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="profession"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Profession
                </label>

                <input
                  id="profession"
                  name="profession"
                  value={
                    form.profession
                  }
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
                />
              </div>

              {/* PAYS AVANT LE TÉLÉPHONE */}

              <div>
                <label
                  htmlFor="country_iso"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Pays *
                </label>

                <select
                  id="country_iso"
                  name="country_iso"
                  value={
                    form.country_iso
                  }
                  onChange={
                    handleCountryChange
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-dbsOrange"
                  required
                >
                  <option value="">
                    Sélectionnez un pays
                  </option>

                  {countries.map(
                    (country) => (
                      <option
                        key={
                          country.value
                        }
                        value={
                          country.value
                        }
                      >
                        {country.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Ville
                </label>

                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Bujumbura"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
                />
              </div>

              {/* INDICATIF AUTOMATIQUE */}

              <div className="grid grid-cols-[120px_1fr] gap-3 md:col-span-2">
                <div>
                  <label
                    htmlFor="country_code"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Indicatif
                  </label>

                  <input
                    id="country_code"
                    name="country_code"
                    value={
                      form.country_code
                    }
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Numéro de téléphone *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="62500305"
                    autoComplete="tel-national"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Expérience commerciale
            </h2>

            <textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              rows={5}
              placeholder="Présentez brièvement votre expérience en prospection et développement commercial."
              className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
            />
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Services préférés *
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {AVAILABLE_SERVICES.map(
                (service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:border-orange-300"
                  >
                    <input
                      type="checkbox"
                      checked={
                        form.preferred_services.includes(
                          service
                        )
                      }
                      onChange={() =>
                        toggleService(
                          service
                        )
                      }
                      className="h-4 w-4 accent-orange-500"
                    />

                    <span className="text-sm text-slate-700">
                      {service}
                    </span>
                  </label>
                )
              )}
            </div>
          </section>

          <section>
            <label
              htmlFor="coverage_areas"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Zones géographiques couvertes
            </label>

            <input
              id="coverage_areas"
              name="coverage_areas"
              value={
                form.coverage_areas
              }
              onChange={handleChange}
              placeholder="Burundi, Rwanda, RDC"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-dbsOrange"
            />

            <p className="mt-2 text-xs text-slate-500">
              Séparez plusieurs zones par des virgules.
            </p>
          </section>

          <div className="flex justify-end border-t pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-dbsOrange px-7 py-3.5 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />
              ) : (
                <Send size={20} />
              )}

              {loading
                ? "Envoi..."
                : "Envoyer ma demande"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}