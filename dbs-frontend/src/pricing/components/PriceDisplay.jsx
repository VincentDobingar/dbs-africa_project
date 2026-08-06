// src/pricing/components/PriceDisplay.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { usePricing } from "../context/PricingContext";

export default function PriceDisplay({
  min,
  max,
  currency: baseCurrency = "FCFA",
  className = "",
}) {

  const { i18n } = useTranslation();
  const lang = i18n.language || "fr";

  const {
    currency,
    convertPrice,
  } = usePricing();


  if (
    min === null ||
    min === undefined ||
    isNaN(min)
  ) {
    return null;
  }


  const formatters = {

    USD: new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }
    ),


    EUR: new Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }
    ),


    FCFA: new Intl.NumberFormat(
      "fr-FR",
      {
        maximumFractionDigits: 0,
      }
    ),

  };


  const formatAmount = (value) => {
    const convertedAmount = convertPrice(
      value,
      baseCurrency,
      currency
    );

    let formatted =
      (
        formatters[currency] ||
        formatters.FCFA
      ).format(convertedAmount);

    // Format spécifique FCFA DBS-Africa
    if (currency === "FCFA") {
      formatted = `${formatted} F CFA`;
    }

    return formatted;
  };


  const hasMax = max !== null && max !== undefined && !isNaN(max);

  if (!hasMax) {
    const prefix = lang === "fr" ? "À partir de" : "From";

    return (
      <span className={className}>
        {prefix} {formatAmount(min)}
      </span>
    );
  }

  return (
    <span className={className}>
      {formatAmount(min)} – {formatAmount(max)}
    </span>
  );
}
