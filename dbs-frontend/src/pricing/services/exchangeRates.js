// src/pricing/services/exchangeRates.js

const RATE_CACHE_KEY = "dbs_fx_usd_xof";
const RATE_CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 heures

/*
 * Promesse partagée pour éviter plusieurs appels simultanés
 * (notamment avec React StrictMode en développement).
 */
let fetchPromise = null;

/**
 * Lecture du cache.
 */
function getCachedRate() {
  try {
    const cachedValue = localStorage.getItem(RATE_CACHE_KEY);

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue);

    if (
      !parsedValue.timestamp ||
      Date.now() - parsedValue.timestamp > RATE_CACHE_DURATION
    ) {
      localStorage.removeItem(RATE_CACHE_KEY);
      return null;
    }

    return parsedValue.rate;
  } catch (error) {
    console.warn("FX cache read error:", error);
    return null;
  }
}

/**
 * Écriture dans le cache.
 */
function setCachedRate(rate) {
  try {
    localStorage.setItem(
      RATE_CACHE_KEY,
      JSON.stringify({
        rate,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn("FX cache write error:", error);
  }
}

/**
 * Requête réelle vers l'API de taux de change (gratuite, sans clé).
 */
async function requestLiveUsdToFcfaRate() {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      {
        method: "GET",
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Exchange rate API error: ${response.status}`
      );
    }

    const data = await response.json();
    const rate = data?.rates?.XOF;

    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error(
        "Taux XOF absent de la réponse de l'API de change."
      );
    }

    setCachedRate(rate);

    return rate;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Taux USD -> FCFA en direct (avec cache 6h).
 *
 * Retourne `null` en cas d'échec : l'appelant doit alors conserver
 * le taux de secours déjà en place (voir `forex.js`).
 */
export function getLiveUsdToFcfaRate() {
  const cachedRate = getCachedRate();

  if (cachedRate) {
    return Promise.resolve(cachedRate);
  }

  if (!fetchPromise) {
    fetchPromise = requestLiveUsdToFcfaRate()
      .catch((error) => {
        console.warn(
          "Live FX rate unavailable, keeping fallback rate.",
          error instanceof Error ? error.message : error
        );

        return null;
      })
      .finally(() => {
        fetchPromise = null;
      });
  }

  return fetchPromise;
}

export default getLiveUsdToFcfaRate;
