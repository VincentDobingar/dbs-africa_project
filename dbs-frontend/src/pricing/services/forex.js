// src/pricing/services/forex.js

/**
 * Taux de secours (pour 1 unité => équivalent FCFA).
 *
 * EUR est une parité fixe réelle avec le FCFA (655,957, régime de
 * change CFA) : elle ne bouge jamais et n'est jamais écrasée par un
 * taux "live". USD flotte réellement ; ce chiffre n'est qu'un repli
 * utilisé tant qu'aucun taux en direct n'a pu être récupéré (voir
 * `exchangeRates.js`).
 */
const FALLBACK_RATES = Object.freeze({
  FCFA: 1,
  USD: 605,
  EUR: 655.957,
});

let currentRates = { ...FALLBACK_RATES };

export const supportedCurrencies = Object.freeze([
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "FCFA", label: "Franc CFA", symbol: "FCFA" },
]);

/**
 * Remplace un taux par une valeur récupérée en direct. EUR/FCFA sont
 * ignorés volontairement : ce sont des parités fixes, pas des taux
 * de marché.
 */
export function setLiveRate(currency, rateToFcfa) {
  if (currency === "EUR" || currency === "FCFA") {
    return;
  }

  if (!Number.isFinite(rateToFcfa) || rateToFcfa <= 0) {
    return;
  }

  currentRates = {
    ...currentRates,
    [currency]: rateToFcfa,
  };
}

export function convertCurrency(amount, from, to) {
  const numeric = Number(amount);

  if (!numeric || isNaN(numeric)) return 0;
  if (!currentRates[from] || !currentRates[to]) return 0;
  if (from === to) return numeric;

  const inFCFA = numeric * currentRates[from];
  return Math.round(inFCFA / currentRates[to]);
}

export function getRate(from, to) {
  if (!currentRates[from] || !currentRates[to]) return 1;
  return currentRates[from] / currentRates[to];
}