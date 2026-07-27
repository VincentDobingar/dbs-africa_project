import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import aboutBg from "../../assets/images/about-bg.jpg";
import { industries } from "../../data/industriesData";

export default function Industries() {
  const { t, i18n } = useTranslation();

  const lang = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";

  return (
    <div>
      <Seo
        title={t("industriesPage.title")}
        description={t("industriesPage.subtitle")}
      />

      <HeroSection
        badge={t("industriesPage.label")}
        title={t("industriesPage.title")}
        description={t("industriesPage.subtitle")}
        image={aboutBg}
      >
        <Link
          to="/quote"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t("industriesPage.ctaQuote")}
        </Link>

        <Link
          to="/contact"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
        >
          {t("industriesPage.ctaContact")}
        </Link>
      </HeroSection>

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {t("industriesPage.introText")}
          </motion.p>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-dbsLight p-6 text-center transition hover:-translate-y-1 hover:border-dbsOrange hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={26} />
                  </div>

                  <p className="font-semibold text-gray-800 dark:text-gray-300">
                    {industry[lang]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-dbsDark to-orange-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            {t("industriesPage.ctaQuote")}
          </h2>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/quote"
              className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              {t("industriesPage.ctaQuote")}
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold transition hover:bg-white hover:text-dbsDark"
            >
              {t("industriesPage.ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
