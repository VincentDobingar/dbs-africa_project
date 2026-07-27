// src/pricing/context/PricingContext.jsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import useCountry from "../hooks/useCountry";
import { convertCurrency } from "../services/forex";
import { DEFAULT_CURRENCY } from "../constants/currencies";

const PricingContext = createContext(null);

/**
 * Devises acceptées par le module Pricing.
 */
const SUPPORTED_CURRENCIES = ["FCFA", "EUR", "USD"];

export function PricingProvider({ children }) {
  const location = useCountry();

  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);

  /**
   * Indique si l’utilisateur a choisi lui-même une devise.
   *
   * Cela évite que la détection géographique remplace ensuite
   * son choix manuel.
   */
  const [manualCurrency, setManualCurrency] = useState(false);

  /**
   * Vérifie qu’une devise est prise en charge.
   */
  const isSupportedCurrency = useCallback((value) => {
    return SUPPORTED_CURRENCIES.includes(value);
  }, []);

  /**
   * Synchronisation automatique avec la devise détectée.
   *
   * La synchronisation n’est effectuée que si :
   * - la géolocalisation est terminée ;
   * - une devise a été détectée ;
   * - la devise est prise en charge ;
   * - l’utilisateur n’a pas déjà choisi une devise manuellement.
   */
  useEffect(() => {
    const detectedCurrency = location?.currency;

    if (
      manualCurrency ||
      location?.loading ||
      !detectedCurrency ||
      !isSupportedCurrency(detectedCurrency)
    ) {
      return;
    }

    setCurrencyState((currentCurrency) => {
      if (currentCurrency === detectedCurrency) {
        return currentCurrency;
      }

      return detectedCurrency;
    });
  }, [
    location?.currency,
    location?.loading,
    manualCurrency,
    isSupportedCurrency,
  ]);

  /**
   * Changement manuel sécurisé de la devise.
   */
  const changeCurrency = useCallback(
    (newCurrency) => {
      if (!isSupportedCurrency(newCurrency)) {
        console.warn(
          `Devise non prise en charge : ${newCurrency}`
        );

        return;
      }

      setManualCurrency(true);
      setCurrencyState(newCurrency);
    },
    [isSupportedCurrency]
  );

  /**
   * Conversion centrale des prix.
   */
  const convertPrice = useCallback(
    (
      amount,
      from = DEFAULT_CURRENCY,
      to = currency
    ) => {
      const numericAmount = Number(amount);

      if (!Number.isFinite(numericAmount)) {
        return 0;
      }

      const sourceCurrency = isSupportedCurrency(from)
        ? from
        : DEFAULT_CURRENCY;

      const targetCurrency = isSupportedCurrency(to)
        ? to
        : DEFAULT_CURRENCY;

      return convertCurrency(
        numericAmount,
        sourceCurrency,
        targetCurrency
      );
    },
    [currency, isSupportedCurrency]
  );

  /**
   * Formateur correspondant à la devise active.
   */
  const priceFormatter = useMemo(() => {
    const formatters = {
      USD: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),

      EUR: new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),

      FCFA: new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        maximumFractionDigits: 0,
      }),
    };

    return formatters[currency] || formatters.FCFA;
  }, [currency]);

  /**
   * Conversion et formatage d’un montant.
   */
  const formatPrice = useCallback(
    (
      amount,
      baseCurrency = DEFAULT_CURRENCY
    ) => {
      const convertedValue = convertPrice(
        amount,
        baseCurrency,
        currency
      );

      return priceFormatter.format(convertedValue);
    },
    [convertPrice, currency, priceFormatter]
  );

  /**
   * Valeurs exposées aux composants utilisant usePricing().
   */
  const value = useMemo(
    () => ({
      currency,

      // Compatibilité avec les composants actuels
      setCurrency: changeCurrency,

      // Nom recommandé pour les futurs composants
      changeCurrency,

      location,
      convertPrice,
      formatPrice,

      loading: Boolean(location?.loading),
      geoError: location?.error || null,

      manualCurrency,
      supportedCurrencies: SUPPORTED_CURRENCIES,
    }),
    [
      currency,
      changeCurrency,
      location,
      convertPrice,
      formatPrice,
      manualCurrency,
    ]
  );

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}

/**
 * Hook d’accès au contexte Pricing.
 */
export function usePricing() {
  const context = useContext(PricingContext);

  if (!context) {
    throw new Error(
      "usePricing doit être utilisé dans PricingProvider."
    );
  }

  return context;
}

export default PricingContext;