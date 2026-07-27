import React from "react";
import { supportedCurrencies } from "../services/forex";
import { usePricing } from "../context/PricingContext";

export default function CurrencyToggle() {
  const { currency, setCurrency, loading } = usePricing();

  return (
    <div className="currency-toggle">
      <label className="currency-label">Devise :</label>

      <div className="currency-options">
        {supportedCurrencies.map((curr) => (
          <button
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            disabled={loading}
            aria-pressed={currency === curr.code}
            className={`currency-btn ${
              currency === curr.code ? "active" : ""
            } ${loading ? "disabled" : ""}`}
          >
            {curr.code}
          </button>
        ))}
      </div>
    </div>
  );
}