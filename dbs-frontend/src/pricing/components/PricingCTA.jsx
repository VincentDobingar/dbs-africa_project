// src/pricing/components/PricingCTA.jsx

import React from "react";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PricingCTA() {

  const { i18n } = useTranslation();

  const lang = i18n.language || "fr";


  return (

    <section className="pricing-cta">


      {/* ICON */}
      <div className="pricing-cta-icon">

        <CheckCircle size={52} />

      </div>



      {/* CONTENT */}
      <div className="pricing-cta-content">


        <p className="pricing-cta-description">

          {lang === "fr"
            ? "Les tarifs affichés concernent uniquement nos services de développement web."
            : "The displayed prices only apply to our web development services."}

        </p>



        <p className="pricing-cta-description secondary">

          {lang === "fr"
            ? "Pour les autres services (applications mobiles, solutions métiers, cybersécurité, data et autres besoins spécifiques), contactez-nous afin d'obtenir un devis personnalisé."
            : "For other services (mobile applications, business solutions, cybersecurity, data and other specific needs), contact us for a customized quote."}

        </p>



        <h3>

          {lang === "fr"
            ? "Parlons de votre projet dès aujourd'hui"
            : "Let's discuss your project today"}

        </h3>



        <button className="pricing-cta-button">

          {lang === "fr"
            ? "Demander un devis"
            : "Request a quote"}


          <span>
            →
          </span>


        </button>


      </div>


    </section>

  );
}