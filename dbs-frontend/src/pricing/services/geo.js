// src/pricing/services/geo.js

import api from "../../api/axios";

const GEO_CACHE_KEY = "dbs_geo_data";
const GEO_CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 heures

/*
 * Cette promesse partagée empêche plusieurs appels simultanés,
 * notamment avec React StrictMode en développement.
 */
let geoRequestPromise = null;

const DEFAULT_GEO_DATA = {
  country: "Burundi",
  countryName: "Burundi",
  countryCode: "BI",
  continent: "Africa",
  currency: "FCFA",
  language: "fr",
  callingCode: "+257",
};

/**
 * Correspondance pays -> devise.
 */
const COUNTRY_CURRENCY_MAP = {
  BI: "FCFA",

  BF: "FCFA",
  BJ: "FCFA",
  CI: "FCFA",
  CM: "FCFA",
  GA: "FCFA",
  GN: "FCFA",
  GQ: "FCFA",
  ML: "FCFA",
  NE: "FCFA",
  SN: "FCFA",
  TD: "FCFA",
  TG: "FCFA",
  CG: "FCFA",

  CD: "USD",
  RW: "USD",
  US: "USD",
  CA: "USD",

  FR: "EUR",
  BE: "EUR",
  DE: "EUR",
  ES: "EUR",
  IT: "EUR",
  PT: "EUR",
  NL: "EUR",
};

/**
 * Correspondance pays -> langue par défaut.
 */
const COUNTRY_LANGUAGE_MAP = {
  BI: "fr",
  BF: "fr",
  BJ: "fr",
  CI: "fr",
  CM: "fr",
  CD: "fr",
  CG: "fr",
  GA: "fr",
  GN: "fr",
  GQ: "fr",
  ML: "fr",
  NE: "fr",
  SN: "fr",
  TD: "fr",
  TG: "fr",
  RW: "fr",

  FR: "fr",
  BE: "fr",

  US: "en",
  CA: "en",
  GB: "en",

  DE: "en",
  ES: "en",
  IT: "en",
  PT: "en",
  NL: "en",
};

/**
 * Lecture du cache.
 */
function getCachedGeoData() {
  try {
    const cachedValue = localStorage.getItem(GEO_CACHE_KEY);

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue);

    if (
      !parsedValue.timestamp ||
      Date.now() - parsedValue.timestamp > GEO_CACHE_DURATION
    ) {
      localStorage.removeItem(GEO_CACHE_KEY);
      return null;
    }

    return parsedValue.data;
  } catch (error) {
    console.warn("Geo cache read error:", error);
    return null;
  }
}

/**
 * Écriture dans le cache.
 */
function setCachedGeoData(data) {
  try {
    localStorage.setItem(
      GEO_CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn("Geo cache write error:", error);
  }
}

/**
 * Devise selon le code ISO du pays.
 */
export function getCurrencyByCountry(countryCode) {
  if (!countryCode) {
    return DEFAULT_GEO_DATA.currency;
  }

  return (
    COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] ||
    DEFAULT_GEO_DATA.currency
  );
}

/**
 * Alias conservé pour compatibilité.
 */
export const getCurrencyFromCountry = getCurrencyByCountry;

/**
 * Langue selon le code ISO du pays.
 */
export function getLanguageByCountry(countryCode) {
  if (!countryCode) {
    return DEFAULT_GEO_DATA.language;
  }

  return (
    COUNTRY_LANGUAGE_MAP[countryCode.toUpperCase()] ||
    DEFAULT_GEO_DATA.language
  );
}

/**
 * Requête réelle vers le service de géolocalisation.
 *
 * Passe par le relais backend (`/api/geo`, qui interroge ipapi.co
 * côté serveur) plutôt que d'appeler ce service tiers directement
 * depuis le navigateur : ça évite d'exposer son quota gratuit à
 * chaque visiteur et centralise le fallback en cas d'indisponibilité.
 */
async function requestGeoLocation() {
  const cachedData = getCachedGeoData();

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get("/geo", {
      timeout: 5000,
    });

    const data = response.data?.data || {};

    const countryCode =
      data.countryCode?.toUpperCase() ||
      DEFAULT_GEO_DATA.countryCode;

    const countryName =
      data.country ||
      DEFAULT_GEO_DATA.countryName;

    const geoData = {
      country: countryName,
      countryName,
      countryCode,
      continent:
        data.continent ||
        DEFAULT_GEO_DATA.continent,
      currency:
        getCurrencyByCountry(countryCode),
      language:
        getLanguageByCountry(countryCode),
      callingCode:
        data.callingCode ||
        DEFAULT_GEO_DATA.callingCode,
    };

    setCachedGeoData(geoData);

    return geoData;
  } catch (error) {
    console.warn(
      "Geo detection unavailable. Default location used.",
      error instanceof Error ? error.message : error
    );

    /*
     * On mémorise aussi le fallback afin d’éviter de relancer
     * immédiatement plusieurs requêtes qui échouent.
     */
    setCachedGeoData(DEFAULT_GEO_DATA);

    return DEFAULT_GEO_DATA;
  }
}

/**
 * Détection géographique partagée.
 */
export function detectLocation() {
  const cachedData = getCachedGeoData();

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  if (!geoRequestPromise) {
    geoRequestPromise = requestGeoLocation().finally(() => {
      geoRequestPromise = null;
    });
  }

  return geoRequestPromise;
}

/**
 * Alias conservé pour les anciens imports.
 */
export const detectGeoLocation = detectLocation;

export default detectLocation;