import React from "react";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PriceDisplay from "./PriceDisplay";
import { usePricing } from "../context/PricingContext";

export default function PricingCard({ plan }) {
  const { i18n } = useTranslation();

  const lang = i18n.language || "fr";

  const navigate = useNavigate();
  const { currency, convertPrice, formatPrice, baseCurrency } =
    usePricing();

  /**
   * Envoie l'utilisateur vers le formulaire de devis avec le pack
   * présélectionné (nom, devise et montant convertis transmis via
   * le state de navigation).
   */
  const hasMaxPrice =
    plan.price.max !== null && plan.price.max !== undefined;

  const handleChoosePlan = () => {
    navigate("/quote", {
      state: {
        planName: plan.name[lang],
        planCurrency: currency,
        planAmount: convertPrice(
          plan.price.min,
          baseCurrency,
          currency
        ),
        planAmountFormatted: hasMaxPrice
          ? `${formatPrice(plan.price.min, baseCurrency)} - ${formatPrice(
              plan.price.max,
              baseCurrency
            )}`
          : `${lang === "fr" ? "À partir de" : "From"} ${formatPrice(
              plan.price.min,
              baseCurrency
            )}`,
      },
    });
  };

  return (
    <div className={`pricing-card ${plan.popular ? "popular" : ""}`}>

      {/* HEADER */}
      <div className="pricing-card-header">

        <h3>
          {plan.name[lang]}
        </h3>

        <p>
          {plan.description[lang]}
        </p>

      </div>


      {/* PRICE */}
      <div className="pricing-card-price">

        <h2>
          <PriceDisplay
            min={plan.price.min}
            max={plan.price.max}
            currency={plan.price.currency || "FCFA"}
          />
        </h2>

      </div>


      {/* FEATURES */}
      <ul className="pricing-card-features">

        {plan.features.map((feature, index) => (

          <li key={index}>

            <span className="pricing-feature-icon">
              <CheckCircle size={13} />
            </span>

            <span>
              {feature[lang]}
            </span>

          </li>

        ))}

      </ul>


      {/* CTA */}
      <button
        className="pricing-card-btn"
        onClick={handleChoosePlan}
      >

        {lang === "fr"
          ? "Choisir ce pack"
          : "Choose plan"}

      </button>


    </div>
  );
}