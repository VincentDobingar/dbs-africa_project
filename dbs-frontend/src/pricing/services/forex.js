// src/pricing/services/forex.js

const rates = Object.freeze({
  FCFA: 1,
  USD: 605,
  EUR: 655.957,
});

export const supportedCurrencies = Object.freeze([
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "FCFA", label: "Franc CFA", symbol: "FCFA" },
]);

export function convertCurrency(amount, from, to) {
  const numeric = Number(amount);

  if (!numeric || isNaN(numeric)) return 0;
  if (!rates[from] || !rates[to]) return 0;
  if (from === to) return numeric;

  const inFCFA = numeric * rates[from];
  return Math.round(inFCFA / rates[to]);
}

export function getRate(from, to) {
  if (!rates[from] || !rates[to]) return 1;
  return rates[from] / rates[to];
}