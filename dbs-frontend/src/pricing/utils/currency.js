// src/pricing/utils/currency.js

const SYMBOLS = {
  FCFA: "FCFA",
  USD: "$",
  EUR: "€",
};

const NAMES = {
  FCFA: "Franc CFA",
  USD: "US Dollar",
  EUR: "Euro",
};

/**
 * Formate un montant selon la devise
 */
export function formatCurrency(amount, currency = "FCFA") {
  const formatted = Number(amount).toLocaleString();

  switch (currency) {
    case "USD":
      return `${SYMBOLS.USD}${formatted}`;
    case "EUR":
      return `${SYMBOLS.EUR}${formatted}`;
    default:
      return `${formatted} ${SYMBOLS.FCFA}`;
  }
}

/**
 * Convertit un montant avec un taux
 */
export function convertCurrency(amount, rate = 1) {
  return Math.round(amount * rate);
}

/**
 * Retourne le nom lisible d'une devise
 */
export function getCurrencyName(currency) {
  return NAMES[currency] || currency;
}

/**
 * Liste des devises supportées
 */
export const supportedCurrencies = ["FCFA", "USD", "EUR"];