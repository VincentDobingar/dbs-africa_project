// src/pages/public/Contact.jsx

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import countryList from "react-select-country-list";
import { getCountryCallingCode } from "libphonenumber-js";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import contactBg from "../../assets/images/contact-bg.jpg";
import api from "../../api/axios";

const INITIAL_FORM_DATA = {
  fullName: "",
  organization: "",
  email: "",
  subject: "",
  message: "",
};

// Délais avant chaque nouvelle tentative en cas d'échec réseau
// (le backend cPanel peut redémarrer brièvement le processus Node).
const RETRY_DELAYS_MS = [1000, 2000];

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Contact() {
  const { t } = useTranslation();

  const countries = useMemo(
    () => countryList().getData(),
    []
  );

  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState(
    INITIAL_FORM_DATA
  );

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryNotice, setRetryNotice] = useState("");

  const contacts = [
    {
      icon: <Mail size={28} />,
      title: t("contactPage.emailTitle"),
      value: "contact@dbs-africa.org",
      link: "mailto:contact@dbs-africa.org",
    },
    {
      icon: <Phone size={28} />,
      title: t("contactPage.phoneTitle"),
      value: "+257 62 500 305",
      link: "tel:+25762500305",
    },
    {
      icon: <MessageCircle size={28} />,
      title: t("contactPage.whatsappTitle"),
      value: "WhatsApp",
      link: "https://wa.me/25762500305",
    },
    {
      icon: <Globe size={28} />,
      title: t("contactPage.linkedinTitle"),
      value: "LinkedIn",
      link: "https://www.linkedin.com/in/dobingarvincent",
    },
  ];

  const reasons = [
    t("contactPage.reasons.experience"),
    t("contactPage.reasons.data"),
    t("contactPage.reasons.web"),
    t("contactPage.reasons.telecom"),
    t("contactPage.reasons.support"),
  ];

  /**
   * Indicatif téléphonique du pays sélectionné.
   */
  const phoneCode = useMemo(() => {
    if (!selectedCountry) {
      return "";
    }

    try {
      return `+${getCountryCallingCode(
        selectedCountry
      )}`;
    } catch (error) {
      console.warn(
        "Impossible de récupérer l’indicatif :",
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

    setErrorMessage("");
    setSuccessMessage("");
  };

  /**
   * Changement du pays.
   */
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setPhoneNumber("");

    setErrorMessage("");
    setSuccessMessage("");
  };

  /**
   * Nettoyage du numéro de téléphone.
   */
  const handlePhoneChange = (event) => {
    const sanitizedValue = event.target.value.replace(
      /[^\d\s()-]/g,
      ""
    );

    setPhoneNumber(sanitizedValue);

    setErrorMessage("");
    setSuccessMessage("");
  };

  /**
   * Construction du numéro international complet.
   */
  const getCompletePhoneNumber = () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, "");

    if (!cleanedPhone) {
      return "";
    }

    return phoneCode
      ? `${phoneCode}${cleanedPhone}`
      : cleanedPhone;
  };

  /**
   * Réinitialisation du formulaire.
   */
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setSelectedCountry("");
    setPhoneNumber("");
  };

  /**
   * Envoi du formulaire.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const cleanedFullName =
      formData.fullName.trim();

    const cleanedEmail = formData.email.trim();

    const cleanedMessage =
      formData.message.trim();

    if (!cleanedFullName) {
      setErrorMessage(
        t("contactPage.errors.fullName", {
          defaultValue:
            "Veuillez renseigner votre nom complet.",
        })
      );

      return;
    }

    if (!cleanedEmail) {
      setErrorMessage(
        t("contactPage.errors.email", {
          defaultValue:
            "Veuillez renseigner votre adresse e-mail.",
        })
      );

      return;
    }

    if (!selectedCountry) {
      setErrorMessage(
        t("contactPage.errors.country", {
          defaultValue:
            "Veuillez sélectionner votre pays.",
        })
      );

      return;
    }

    if (!cleanedMessage) {
      setErrorMessage(
        t("contactPage.errors.message", {
          defaultValue:
            "Veuillez saisir votre message.",
        })
      );

      return;
    }

    const selectedCountryData = countries.find(
      (country) =>
        country.value === selectedCountry
    );

    const payload = {
      full_name: cleanedFullName,

      organization:
        formData.organization.trim() || null,

      email: cleanedEmail,

      country:
        selectedCountryData?.label ||
        selectedCountry,

      country_code: selectedCountry,

      phone:
        getCompletePhoneNumber() || null,

      subject:
        formData.subject.trim() || null,

      message: cleanedMessage,
    };

    try {
      setSubmitting(true);

      /*
       * Si axios.js contient :
       * baseURL: http://localhost:5000/api
       *
       * la requête finale sera :
       * POST http://localhost:5000/api/contact
       */
      let response;

      for (
        let attempt = 0;
        attempt <= RETRY_DELAYS_MS.length;
        attempt += 1
      ) {
        try {
          response = await api.post(
            "/contact",
            payload
          );

          break;
        } catch (attemptError) {
          const isNetworkError =
            !attemptError.response;

          const hasRetriesLeft =
            attempt < RETRY_DELAYS_MS.length;

          if (!isNetworkError || !hasRetriesLeft) {
            throw attemptError;
          }

          setRetryNotice(
            t("contactPage.retrying", {
              defaultValue:
                "Le serveur ne répond pas, nouvelle tentative...",
            })
          );

          await wait(RETRY_DELAYS_MS[attempt]);
        }
      }

      setRetryNotice("");

      if (response.data?.success === false) {
        throw new Error(
          response.data?.message ||
            "Impossible d’envoyer le message."
        );
      }

      setSuccessMessage(
        response.data?.message ||
          t("contactPage.success", {
            defaultValue:
              "Votre message a été envoyé avec succès.",
          })
      );

      resetForm();
    } catch (error) {
      console.error(
        "Erreur lors de l’envoi du message :",
        error
      );

      setRetryNotice("");

      if (!error.response) {
        setErrorMessage(
          t("contactPage.errors.serverUnavailable", {
            defaultValue:
              "Impossible de joindre le serveur. Veuillez vérifier votre connexion et réessayer.",
          })
        );

        return;
      }

      const backendErrors =
        error.response?.data?.errors;

      if (
        Array.isArray(backendErrors) &&
        backendErrors.length > 0
      ) {
        setErrorMessage(
          backendErrors
            .map((item) => item.message)
            .filter(Boolean)
            .join(" ")
        );

        return;
      }

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          t("contactPage.errors.submit", {
            defaultValue:
              "Une erreur est survenue lors de l’envoi du message.",
          })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Seo
        title={t("contactPage.title")}
        description={t("contactPage.subtitle")}
      />

      <HeroSection
        badge={t("contactPage.label")}
        title={t("contactPage.title")}
        description={t("contactPage.subtitle")}
        image={contactBg}
      >
        <a
          href="mailto:contact@dbs-africa.org"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t("contactPage.contactNow")}
        </a>

        <a
          href="https://wa.me/25762500305"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
        >
          WhatsApp
        </a>
      </HeroSection>

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 lg:grid-cols-2 lg:px-8">
          {/* INFORMATIONS DE CONTACT */}
          <div>
            <p className="font-semibold uppercase text-dbsOrange">
              {t("contactPage.infoLabel")}
            </p>

            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              {t("contactPage.infoTitle")}
            </h2>

            <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-300">
              {t("contactPage.infoText")}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {contacts.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-gray-100 bg-dbsLight p-6 transition hover:border-dbsOrange dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    {item.icon}
                  </div>

                  <h3 className="font-bold dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl bg-dbsDark text-white">
              <div className="p-7">
                <MapPin
                  className="mb-4 text-dbsOrange"
                  size={34}
                />

                <h3 className="text-xl font-bold">
                  {t("contactPage.locationTitle")}
                </h3>

                <p className="mt-2 text-gray-300">
                  {t("contactPage.locationText")}
                </p>
              </div>

              <iframe
                title="Localisation du bureau DBS Africa à N'Djaména"
                src="https://www.google.com/maps?q=Chagoua+FDAR%2C+N%27Djamena%2C+Tchad&output=embed"
                className="h-64 w-full grayscale-[30%]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* FORMULAIRE */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-100 bg-dbsLight p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900"
            noValidate
          >
            <h3 className="mb-6 text-2xl font-bold dark:text-white">
              {t("contactPage.formTitle")}
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* NOM COMPLET */}
              <label htmlFor="contactFullName" className="sr-only">
                {t("contactPage.fullName")}
              </label>
              <input
                id="contactFullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder={t(
                  "contactPage.fullName"
                )}
                required
              />

              {/* ORGANISATION */}
              <label htmlFor="contactOrganization" className="sr-only">
                {t("contactPage.organization")}
              </label>
              <input
                id="contactOrganization"
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder={t(
                  "contactPage.organization"
                )}
              />

              {/* EMAIL */}
              <label htmlFor="contactEmail" className="sr-only">
                {t("contactPage.email")}
              </label>
              <input
                id="contactEmail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder={t("contactPage.email")}
                required
              />

              {/* PAYS */}
              <label htmlFor="contactCountry" className="sr-only">
                {t("contactPage.country", { defaultValue: "Pays" })}
              </label>
              <select
                id="contactCountry"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                required
              >
                <option value="">
                  {t("contactPage.country", {
                    defaultValue: "Pays",
                  })}
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

              {/* NUMÉRO DE TÉLÉPHONE */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="contactPhone"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  {t("contactPage.number", {
                    defaultValue: "Numéro",
                  })}
                </label>

                <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white transition focus-within:border-dbsOrange focus-within:ring-2 focus-within:ring-orange-100 dark:border-gray-700 dark:bg-gray-950">
                  <div className="flex min-w-[90px] items-center justify-center border-r border-gray-200 bg-gray-50 px-3 font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {phoneCode || "+---"}
                  </div>

                  <input
                    id="contactPhone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    disabled={!selectedCountry}
                    className="w-full bg-white px-4 py-4 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:bg-gray-950 dark:text-white dark:disabled:bg-gray-900"
                    placeholder={t(
                      "contactPage.phone"
                    )}
                  />
                </div>

                {!selectedCountry && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {t(
                      "contactPage.selectCountryFirst",
                      {
                        defaultValue:
                          "Sélectionnez d’abord votre pays.",
                      }
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* OBJET */}
            <label htmlFor="contactSubject" className="sr-only">
              {t("contactPage.subject")}
            </label>
            <input
              id="contactSubject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-5 w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              placeholder={t("contactPage.subject")}
            />

            {/* MESSAGE */}
            <label htmlFor="contactMessage" className="sr-only">
              {t("contactPage.message")}
            </label>
            <textarea
              id="contactMessage"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              className="mt-5 w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-dbsOrange focus:ring-2 focus:ring-orange-100 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              placeholder={t("contactPage.message")}
              required
            />

            {/* NOUVELLE TENTATIVE */}
            {retryNotice && (
              <div
                role="status"
                className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700"
              >
                {retryNotice}
              </div>
            )}

            {/* ERREUR */}
            {errorMessage && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {errorMessage}
              </div>
            )}

            {/* SUCCÈS */}
            {successMessage && (
              <div
                role="status"
                className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                {successMessage}
              </div>
            )}

            {/* ENVOI */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? t("contactPage.sending", {
                    defaultValue:
                      "Envoi en cours...",
                  })
                : t("contactPage.send")}

              {submitting ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Send size={18} />
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* POURQUOI NOUS CONTACTER */}
      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-semibold uppercase text-dbsOrange">
              {t("contactPage.whyLabel")}
            </p>

            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              {t("contactPage.whyTitle")}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
              >
                <CheckCircle2 className="mb-3 text-dbsOrange" />

                <p className="font-semibold dark:text-white">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 