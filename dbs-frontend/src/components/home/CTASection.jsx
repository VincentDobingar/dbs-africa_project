import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ctaBg from "../../assets/cta/cta-bg.jpg";

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${ctaBg})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          {t("cta.title")}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-200">
          {t("cta.description")}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/quote"
            className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            {t("cta.quote")}
          </Link>

          <Link
            to="/contact"
            className="rounded-full border border-white/60 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-black"
          >
            {t("cta.contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}