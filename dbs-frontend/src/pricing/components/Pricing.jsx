import React from "react";
import PricingCard from "./PricingCard";
import CurrencyToggle from "./CurrencyToggle";
import { useTranslation } from "react-i18next";
import { usePricing } from "../context/PricingContext";
import "../styles/pricing.css";

export default function Pricing() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "fr";

  const { currency, setCurrency, plans, plansLoading, plansError } =
    usePricing();

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

      {plansLoading && (
        <p className="pricing-status">
          {lang === "fr" ? "Chargement des tarifs…" : "Loading pricing…"}
        </p>
      )}

      {!plansLoading && plansError && (
        <p className="pricing-status pricing-status-error">
          {lang === "fr"
            ? "Impossible de charger les tarifs pour le moment. Réessayez plus tard."
            : "Unable to load pricing right now. Please try again later."}
        </p>
      )}

      {!plansLoading && !plansError && (
        <div className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </div>
      )}

    </section>
  );
}