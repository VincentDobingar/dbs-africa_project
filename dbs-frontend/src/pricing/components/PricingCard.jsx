import React from "react";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import PriceDisplay from "./PriceDisplay";

export default function PricingCard({ plan }) {
  const { i18n } = useTranslation();

  const lang = i18n.language || "fr";

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
            amount={plan.price.amount}
            currency={plan.price.currency || "FCFA"}
          />
        </h2>

        <span>
          / {lang === "fr" ? "projet" : "project"}
        </span>

      </div>


      {/* FEATURES */}
      <ul className="pricing-card-features">

        {plan.features.map((feature, index) => (

          <li key={index}>

            <CheckCircle
              size={18}
              className="text-green-500"
            />

            <span>
              {feature[lang]}
            </span>

          </li>

        ))}

      </ul>


      {/* CTA */}
      <button className="pricing-card-btn">

        {lang === "fr"
          ? "Choisir ce pack"
          : "Choose plan"}

      </button>


    </div>
  );
}