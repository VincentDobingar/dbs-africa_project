// src/pricing/components/PriceDisplay.jsx

import React from "react";
import { usePricing } from "../context/PricingContext";

export default function PriceDisplay({
  amount,
  currency: baseCurrency = "FCFA",
  className = "",
}) {

  const {
    currency,
    convertPrice,
  } = usePricing();


  if (
    amount === null ||
    amount === undefined ||
    isNaN(amount)
  ) {
    return null;
  }


  const convertedAmount = convertPrice(
    amount,
    baseCurrency,
    currency
  );


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


  let formatted =
    (
      formatters[currency] ||
      formatters.FCFA
    ).format(convertedAmount);



  // Format spécifique FCFA DBS-Africa
  if (currency === "FCFA") {
    formatted = `${formatted} F CFA`;
  }


  return (
    <span className={className}>
      {formatted}
    </span>
  );
}