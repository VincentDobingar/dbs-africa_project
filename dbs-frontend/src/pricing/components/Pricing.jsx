import React from "react";
import { pricingData } from "../data/pricingData";
import PricingCard from "./PricingCard";
import CurrencyToggle from "./CurrencyToggle";
import { useTranslation } from "react-i18next";
import { usePricing } from "../context/PricingContext";
import "../styles/pricing.css";

export default function Pricing() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "fr";

  const { currency, setCurrency } = usePricing();

  return (
    <section className="pricing-container">

      <div className="pricing-header">
        <h2>{lang === "fr" ? "Nos Packs" : "Our Plans"}</h2>
        <p>
          {lang === "fr"
            ? "Choisissez la solution adaptée à votre besoin"
            : "Choose the plan that fits your needs"}
        </p>
      </div>

      <div className="pricing-controls">
        <CurrencyToggle
          currency={currency}
          onChange={setCurrency}
        />
      </div>

      <div className="pricing-grid">
        {pricingData.plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
          />
        ))}
      </div>

    </section>
  );
}