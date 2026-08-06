// src/pages/public/QuoteRequest.jsx

import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Send,
  CheckCircle2,
  FileText,
  Clock,
  WalletCards,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import { getCountryCallingCode } from "libphonenumber-js";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import quoteBg from "../../assets/images/quote-bg.jpg";
import api from "../../api/axios";

export default function QuoteRequest() {
  const { t } = useTranslation();

  const location = useLocation();

  const [prefillNotice, setPrefillNotice] = useState("");

  /**
   * Liste des pays :
   * {
   *   value: "BI",
   *   label: "Burundi"
   * }
   */
  const countries = useMemo(
    () => countryList().getData(),
    []
  );

  const [clientType, setClientType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currency, setCurrency] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: "",
    services: [],
    budget: "",
    timeline: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Services disponibles.
   */
  const services = [
    {
      value: "web",
      label: t("quotePage.services.web"),
    },
    {
      value: "marketing",
      label: t("quotePage.services.marketing"),
    },
    {
      value: "data",
      label: t("quotePage.services.data"),
    },
    {
      value: "bi",
      label: t("quotePage.services.bi"),
    },
    {
      value: "digital",
      label: t("quotePage.services.digital"),
    },
    {
      value: "telecom",
      label: t("quotePage.services.telecom"),
    },
    {
      value: "pm",
      label: t("quotePage.services.pm"),
    },
  ];

  /**
   * Étapes affichées dans la colonne de droite.
   */
  const steps = [
    {
      icon: <FileText size={30} />,
      title: t("quotePage.steps.need"),
      text: t("quotePage.steps.needText"),
    },
    {
      icon: <WalletCards size={30} />,
      title: t("quotePage.steps.budget"),
      text: t("quotePage.steps.budgetText"),
    },
    {
      icon: <Clock size={30} />,
      title: t("quotePage.steps.timeline"),
      text: t("quotePage.steps.timelineText"),
    },
  ];

  /**
   * Budgets selon la devise choisie.
   */
  const budgetOptions = {
    USD: [
      "500 - 1 000 USD",
      "1 000 - 3 000 USD",
      "3 000 - 5 000 USD",
      "5 000 - 10 000 USD",
      "10 000+ USD",
    ],

    EUR: [
      "500 - 1 000 EUR",
      "1 000 - 3 000 EUR",
      "3 000 - 5 000 EUR",
      "5 000 - 10 000 EUR",
      "10 000+ EUR",
    ],

    FCFA: [
      "500 000 - 1 000 000 FCFA",
      "1 000 000 - 2 500 000 FCFA",
      "2 500 000 - 5 000 000 FCFA",
      "5 000 000 - 10 000 000 FCFA",
      "10 000 000+ FCFA",
    ],
  };

  /**
   * Bornes supérieures des tranches de `budgetOptions`, dans le même
   * ordre, pour pouvoir présélectionner automatiquement la bonne
   * tranche à partir d'un montant (ex. venant d'un pack Pricing).
   */
  const budgetThresholds = {
    USD: [1000, 3000, 5000, 10000],
    EUR: [1000, 3000, 5000, 10000],
    FCFA: [1000000, 2500000, 5000000, 10000000],
  };

  const getBudgetBracket = (budgetCurrency, amount) => {
    const thresholds = budgetThresholds[budgetCurrency];
    const options = budgetOptions[budgetCurrency];

    if (!thresholds || !options || !Number.isFinite(amount)) {
      return "";
    }

    const index = thresholds.findIndex(
      (threshold) => amount < threshold
    );

    return options[index === -1 ? options.length - 1 : index];
  };

  /**
   * Pré-remplissage du formulaire lorsqu'on arrive depuis un pack
   * de la page Pricing (state de navigation transmis par PricingCard).
   */
  useEffect(() => {
    const selectedPlan = location.state;

    if (!selectedPlan?.planCurrency) {
      return;
    }

    setCurrency(selectedPlan.planCurrency);

    setFormData((previousData) => ({
      ...previousData,
      budget: getBudgetBracket(
        selectedPlan.planCurrency,
        selectedPlan.planAmount
      ),
      description: t("quotePage.prefillDescription", {
        plan: selectedPlan.planName,
        price: selectedPlan.planAmountFormatted,
      }),
    }));

    setPrefillNotice(
      t("quotePage.prefillNotice", {
        plan: selectedPlan.planName,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Indicatif téléphonique selon le pays.
   *
   * Exemples :
   * BI => +257
   * TD => +235
   * FR => +33
   */
  const phoneCode = useMemo(() => {
    if (!selectedCountry) {
      return "";
    }

    try {
      return `+${getCountryCallingCode(selectedCountry)}`;
    } catch (error) {
      console.warn(
        "Impossible de récupérer l’indicatif téléphonique :",
        error
      );

      return "";
    }
  }, [selectedCountry]);

  /**
   * Mise à jour des champs standards.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  /**
   * Changement du type de client.
   */
  const handleClientTypeChange = (event) => {
    setClientType(event.target.value);

    setSuccessMessage("");
    setErrorMessage("");
  };

  /**
   * Changement du pays.
   */
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);

    // Le numéro est réinitialisé lorsque le pays change.
    setPhoneNumber("");

    setSuccessMessage("");
    setErrorMessage("");
  };

  /**
   * Changement du numéro.
   */
  const handlePhoneChange = (event) => {
    const sanitizedValue = event.target.value.replace(
      /[^\d\s()-]/g,
      ""
    );

    setPhoneNumber(sanitizedValue);
  };

  /**
   * Changement de la devise.
   */
  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;

    setCurrency(newCurrency);

    // Réinitialiser le budget lorsque la devise change.
    setFormData((previousData) => ({
      ...previousData,
      budget: "",
    }));
  };

  /**
   * Sélection ou désélection d’un service.
   */
  const handleServiceChange = (serviceValue) => {
    setFormData((previousData) => {
      const isAlreadySelected =
        previousData.services.includes(serviceValue);

      return {
        ...previousData,

        services: isAlreadySelected
          ? previousData.services.filter(
              (service) => service !== serviceValue
            )
          : [...previousData.services, serviceValue],
      };
    });
  };

  /**
   * Création du numéro complet.
   *
   * Exemple :
   * +25762500305
   */
  const getCompletePhoneNumber = () => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (!cleanedPhoneNumber) {
      return "";
    }

    if (!phoneCode) {
      return cleanedPhoneNumber;
    }

    return `${phoneCode}${cleanedPhoneNumber}`;
  };

  /**
   * Réinitialisation du formulaire.
   */
  const resetForm = () => {
    setClientType("");
    setSelectedCountry("");
    setPhoneNumber("");
    setCurrency("");

    setFormData({
      name: "",
      email: "",
      sector: "",
      services: [],
      budget: "",
      timeline: "",
      description: "",
    });
  };

  /**
   * Envoi de la demande de devis.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const completePhoneNumber = getCompletePhoneNumber();

    /**
     * Validations.
     */
    if (!clientType) {
      setErrorMessage(
        t("quotePage.errors.clientType", {
          defaultValue:
            "Veuillez sélectionner le type de client.",
        })
      );

      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage(
        clientType === "organization"
          ? t("quotePage.errors.organizationName", {
              defaultValue:
                "Veuillez renseigner le nom de l’organisation.",
            })
          : t("quotePage.errors.fullName", {
              defaultValue:
                "Veuillez renseigner votre nom complet.",
            })
      );

      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage(
        t("quotePage.errors.email", {
          defaultValue:
            "Veuillez renseigner votre adresse e-mail.",
        })
      );

      return;
    }

    if (!selectedCountry) {
      setErrorMessage(
        t("quotePage.errors.country", {
          defaultValue:
            "Veuillez sélectionner votre pays.",
        })
      );

      return;
    }

    if (!completePhoneNumber) {
      setErrorMessage(
        t("quotePage.errors.phone", {
          defaultValue:
            "Veuillez renseigner votre numéro de téléphone.",
        })
      );

      return;
    }

    if (!formData.sector) {
      setErrorMessage(
        t("quotePage.errors.sector", {
          defaultValue:
            "Veuillez sélectionner votre secteur d’activité.",
        })
      );

      return;
    }

    if (formData.services.length === 0) {
      setErrorMessage(
        t("quotePage.errors.services", {
          defaultValue:
            "Veuillez sélectionner au moins un service.",
        })
      );

      return;
    }

    if (!currency) {
      setErrorMessage(
        t("quotePage.errors.currency", {
          defaultValue:
            "Veuillez sélectionner une devise.",
        })
      );

      return;
    }

    if (!formData.budget) {
      setErrorMessage(
        t("quotePage.errors.budget", {
          defaultValue:
            "Veuillez sélectionner votre budget.",
        })
      );

      return;
    }

    if (!formData.timeline) {
      setErrorMessage(
        t("quotePage.errors.timeline", {
          defaultValue:
            "Veuillez sélectionner le délai souhaité.",
        })
      );

      return;
    }

    if (!formData.description.trim()) {
      setErrorMessage(
        t("quotePage.errors.description", {
          defaultValue:
            "Veuillez décrire brièvement votre besoin.",
        })
      );

      return;
    }

    /**
     * Récupération du nom du pays.
     */
    const selectedCountryData = countries.find(
      (country) => country.value === selectedCountry
    );

    /**
     * Récupération des noms des services sélectionnés.
     */
    const selectedServiceLabels = services
      .filter((service) =>
        formData.services.includes(service.value)
      )
      .map((service) => service.label);

    /**
     * Données envoyées au backend.
     */
    const cleanedName = formData.name.trim();

    const payload = {
      client_type: clientType,

      company_name:
        clientType === "organization"
          ? cleanedName
          : null,

      contact_name:
        clientType === "individual"
          ? cleanedName
          : null,

      email: formData.email.trim(),

      country:
        selectedCountryData?.label ||
        selectedCountry,

      phone: completePhoneNumber,

      sector: formData.sector,

      services: formData.services,

      currency,

      budget: formData.budget,

      timeline: formData.timeline,

      description: formData.description.trim(),
    };

    try {
      setSubmitting(true);

      console.log("Données du devis :", payload);

      /**
       * La baseURL définie dans axios.js doit normalement
       * contenir /api.
       *
       * Exemple :
       * http://localhost:5000/api
       *
       * La requête finale sera alors :
       * POST http://localhost:5000/api/quotes
       */
      const response = await api.post("/quotes", payload);

      if (response.data?.success === false) {
        throw new Error(
          response.data?.message ||
            "Impossible d’envoyer la demande de devis."
        );
      }

      setSuccessMessage(
        response.data?.message ||
          t("quotePage.success", {
            defaultValue:
              "Votre demande de devis a été envoyée avec succès.",
          })
      );

      resetForm();
    } catch (error) {
      console.error("Erreur devis complète :", error);

      if (!error.response) {
        setErrorMessage(
          t("quotePage.errors.serverUnavailable", {
            defaultValue:
              "Impossible de joindre le serveur. Vérifiez que le backend est démarré.",
          })
        );

        return;
      }

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          t("quotePage.errors.submit", {
            defaultValue:
              "Une erreur est survenue lors de l'envoi de la demande.",
          })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Seo
        title={t("quotePage.title")}
        description={t("quotePage.subtitle")}
      />

      <HeroSection
        badge={t("quotePage.label")}
        title={t("quotePage.title")}
        description={t("quotePage.subtitle")}
        image={quoteBg}
      />

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-3 lg:px-8">
          {/* FORMULAIRE */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-100 bg-dbsLight p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900"
              noValidate
            >
              <h2 className="mb-6 font-heading text-3xl font-bold dark:text-white">
                {t("quotePage.formTitle")}
              </h2>

              {prefillNotice && (
                <div
                  role="status"
                  className="mb-6 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300"
                >
                  {prefillNotice}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {/* TYPE DE CLIENT */}
                <label htmlFor="quoteClientType" className="sr-only">
                  {t("quotePage.clientType")}
                </label>
                <select
                  id="quoteClientType"
                  name="clientType"
                  value={clientType}
                  onChange={handleClientTypeChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  required
                >
                  <option value="">
                    {t("quotePage.clientType")}
                  </option>

                  <option value="individual">
                    {t("quotePage.individual")}
                  </option>

                  <option value="organization">
                    {t("quotePage.organization")}
                  </option>
                </select>

                {/* NOM OU ORGANISATION */}
                <label htmlFor="quoteName" className="sr-only">
                  {clientType === "organization"
                    ? t("quotePage.organizationName")
                    : t("quotePage.fullName")}
                </label>
                <input
                  id="quoteName"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  placeholder={
                    clientType === "organization"
                      ? t("quotePage.organizationName")
                      : t("quotePage.fullName")
                  }
                  required
                />

                {/* E-MAIL */}
                <label htmlFor="quoteEmail" className="sr-only">
                  {t("quotePage.email")}
                </label>
                <input
                  id="quoteEmail"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  placeholder={t("quotePage.email")}
                  required
                />

                {/* PAYS */}
                <label htmlFor="quoteCountry" className="sr-only">
                  {t("quotePage.country")}
                </label>
                <select
                  id="quoteCountry"
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  required
                >
                  <option value="">
                    {t("quotePage.country")}
                  </option>

                  {countries.map((country) => (
                    <option
                      key={country.value}
                      value={country.value}
                    >
                      {country.label}
                    </option>
                  ))}
                </select>

                {/* NUMÉRO */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {t("quotePage.number", {
                      defaultValue: "Numéro",
                    })}
                  </label>

                  <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white transition focus-within:border-dbsOrange focus-within:ring-2 focus-within:ring-orange-100 dark:border-gray-700 dark:bg-gray-950">
                    <div className="flex min-w-[90px] items-center justify-center border-r border-gray-200 bg-gray-50 px-3 font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {phoneCode || "+---"}
                    </div>

                    <input
                      id="phoneNumber"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder={t("quotePage.phone", {
                        defaultValue:
                          "Numéro de téléphone",
                      })}
                      className="w-full bg-white px-4 py-4 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:bg-gray-950 dark:text-white dark:disabled:bg-gray-900"
                      disabled={!selectedCountry}
                      required
                    />
                  </div>

                  {!selectedCountry && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {t("quotePage.selectCountryFirst", {
                        defaultValue:
                          "Sélectionnez d’abord votre pays.",
                      })}
                    </p>
                  )}
                </div>

                {/* SECTEUR D’ACTIVITÉ */}
                <div>
                  <label
                    htmlFor="sector"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {t("quotePage.sector")}
                  </label>

                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    required
                  >
                    <option value="" disabled>
                      {t("quotePage.sector")}
                    </option>

                    <option value="telecom">
                      {t("quotePage.sectors.telecom")}
                    </option>

                    <option value="mobileMoney">
                      {t("quotePage.sectors.mobileMoney")}
                    </option>

                    <option value="banking">
                      {t("quotePage.sectors.banking")}
                    </option>

                    <option value="microfinance">
                      {t("quotePage.sectors.microfinance")}
                    </option>

                    <option value="ngo">
                      {t("quotePage.sectors.ngo")}
                    </option>

                    <option value="association">
                      {t("quotePage.sectors.association")}
                    </option>

                    <option value="unitedNations">
                      {t("quotePage.sectors.unitedNations")}
                    </option>

                    <option value="government">
                      {t("quotePage.sectors.government")}
                    </option>

                    <option value="university">
                      {t("quotePage.sectors.university")}
                    </option>

                    <option value="higherInstitute">
                      {t(
                        "quotePage.sectors.higherInstitute"
                      )}
                    </option>

                    <option value="publicInstitution">
                      {t(
                        "quotePage.sectors.publicInstitution"
                      )}
                    </option>

                    <option value="privateInstitution">
                      {t(
                        "quotePage.sectors.privateInstitution"
                      )}
                    </option>

                    <option value="health">
                      {t("quotePage.sectors.health")}
                    </option>

                    <option value="trade">
                      {t("quotePage.sectors.trade")}
                    </option>

                    <option value="industry">
                      {t("quotePage.sectors.industry")}
                    </option>

                    <option value="other">
                      {t("quotePage.sectors.other")}
                    </option>
                  </select>
                </div>
              </div>

              {/* SERVICES */}
              <div className="mt-7">
                <p className="mb-4 font-bold dark:text-white">
                  {t("quotePage.serviceNeeded")}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <label
                      key={service.value}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 transition hover:border-orange-200 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        value={service.value}
                        checked={formData.services.includes(
                          service.value
                        )}
                        onChange={() =>
                          handleServiceChange(service.value)
                        }
                        className="h-4 w-4 accent-orange-500"
                      />

                      <span>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DEVISE, BUDGET ET DÉLAI */}
              <div className="mt-7 grid gap-5 sm:grid-cols-3">
                {/* DEVISE */}
                <label htmlFor="quoteCurrency" className="sr-only">
                  {t("quotePage.currency")}
                </label>
                <select
                  id="quoteCurrency"
                  name="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  required
                >
                  <option value="">
                    {t("quotePage.currency")}
                  </option>

                  <option value="FCFA">FCFA</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>

                {/* BUDGET */}
                <label htmlFor="quoteBudget" className="sr-only">
                  {t("quotePage.budget")}
                </label>
                <select
                  id="quoteBudget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:disabled:bg-gray-900"
                  disabled={!currency}
                  required
                >
                  <option value="" disabled>
                    {!currency
                      ? t(
                          "quotePage.selectCurrencyFirst"
                        )
                      : t("quotePage.budget")}
                  </option>

                  {currency &&
                    budgetOptions[currency]?.map(
                      (budget) => (
                        <option
                          key={budget}
                          value={budget}
                        >
                          {budget}
                        </option>
                      )
                    )}
                </select>

                {/* DÉLAI */}
                <label htmlFor="quoteTimeline" className="sr-only">
                  {t("quotePage.timeline")}
                </label>
                <select
                  id="quoteTimeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  required
                >
                  <option value="" disabled>
                    {t("quotePage.timeline")}
                  </option>

                  <option value="1-2-weeks">
                    1 - 2 semaines
                  </option>

                  <option value="1-month">
                    1 mois
                  </option>

                  <option value="2-3-months">
                    2 - 3 mois
                  </option>

                  <option value="3-6-months">
                    3 - 6 mois
                  </option>

                  <option value="flexible">
                    Flexible
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <label htmlFor="quoteDescription" className="sr-only">
                {t("quotePage.description")}
              </label>
              <textarea
                id="quoteDescription"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="7"
                className="mt-5 w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder={t("quotePage.description")}
                required
              />

              {/* MESSAGE D’ERREUR */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              {/* MESSAGE DE SUCCÈS */}
              {successMessage && (
                <div
                  role="status"
                  className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                >
                  {successMessage}
                </div>
              )}

              {/* BOUTON D’ENVOI */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? t("quotePage.sending", {
                      defaultValue:
                        "Envoi en cours...",
                    })
                  : t("quotePage.send")}

                <Send size={18} />
              </button>
            </form>
          </div>

          {/* COLONNE DE DROITE */}
          <div className="space-y-5">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl bg-dbsDark p-7 text-white"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-300">
                  {step.text}
                </p>
              </div>
            ))}

            <div className="rounded-3xl border border-gray-100 bg-dbsLight p-7 dark:border-gray-800 dark:bg-gray-900">
              <CheckCircle2
                className="mb-4 text-dbsOrange"
                size={32}
              />

              <h3 className="text-xl font-bold dark:text-white">
                {t("quotePage.responseTitle")}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {t("quotePage.responseText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}