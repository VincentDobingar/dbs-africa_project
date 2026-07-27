 // src/pages/PricingPage.jsx

import React from "react";
import { useTranslation } from "react-i18next";

import Seo from "../../shared/components/Seo";
import Pricing from "../../pricing/components/Pricing";
import PricingComparison from "../../pricing/components/PricingComparison";
import PricingCTA from "../../pricing/components/PricingCTA";

import pricingMoneyBg from "../../assets/images/pricing-money-bg.jpg";

import {
  CheckCircle,
  ShieldCheck,
  Clock3,
  Headphones,
  ArrowRight,
} from "lucide-react";

import "../../pricing/styles/pricing.css";

export default function PricingPage() {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: <ShieldCheck size={30} />,
      title: t("quotePage.advantages.quality.title"),
      description: t("quotePage.advantages.quality.desc"),
    },
    {
      icon: <Clock3 size={30} />,
      title: t("quotePage.advantages.delivery.title"),
      description: t("quotePage.advantages.delivery.desc"),
    },
    {
      icon: <Headphones size={30} />,
      title: t("quotePage.advantages.support.title"),
      description: t("quotePage.advantages.support.desc"),
    },
  ];

  const faqs = [
    {
      question: t("quotePage.faq.q1.question"),
      answer: t("quotePage.faq.q1.answer"),
    },
    {
      question: t("quotePage.faq.q2.question"),
      answer: t("quotePage.faq.q2.answer"),
    },
    {
      question: t("quotePage.faq.q3.question"),
      answer: t("quotePage.faq.q3.answer"),
    },
    {
      question: t("quotePage.faq.q4.question"),
      answer: t("quotePage.faq.q4.answer"),
    },
  ];

  return (
    <main>
      <Seo
        title={t("quotePage.title")}
        description={t("quotePage.subtitle")}
      />

      {/* HERO */}

      <section
        className="pricing-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(15,23,42,0.92),
              rgba(15,64,175,0.65)
            ),
            url(${pricingMoneyBg})
          `,
        }}
      >

        <div className="pricing-hero-overlay">

          <span className="badge">
            {t("quotePage.label")}
          </span>


          <h1>
            {t("quotePage.title")}
          </h1>


          <p>
            {t("quotePage.subtitle")}
          </p>


        </div>

      </section>


      {/* ADVANTAGES */}
      <section className="advantages">

        <h2>
          {t("quotePage.whyTitle")}
        </h2>

        <div className="advantages-grid">

          {advantages.map((item, index) => (
            <div key={index} className="advantage-card">

              {item.icon}

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </section>


      {/* PRICING CARDS */}
      <section id="pricing">

        <Pricing />

      </section>


      {/* COMPARISON TABLE */}
      <section id="comparison">

        <PricingComparison />

      </section>


      {/* FAQ */}
      <section className="faq">

        <h2>
          {t("quotePage.faqTitle")}
        </h2>


        {faqs.map((faq, index) => (
          <details key={index}>

            <summary>
              {faq.question}
            </summary>

            <p>
              {faq.answer}
            </p>

          </details>
        ))}

      </section>


      {/* CTA FINAL */}
      <section className="pricing-cta">
          <PricingCTA />
      </section>


    </main>
  );
}