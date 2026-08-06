import { motion } from "framer-motion";
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
      <div className="absolute inset-0 bg-black/75" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/95 via-black/70 to-gray-950/95" />

      {/* Glow decorations */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-dbsOrange/20 blur-[140px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          {t("cta.title")}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          {t("cta.description")}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/quote"
            className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            {t("cta.quote")}
          </Link>

          <Link
            to="/contact"
            className="rounded-full border border-white/30 px-8 py-4 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
          >
            {t("cta.contact")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
