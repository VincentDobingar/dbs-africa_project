import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import servicesBg from "../../assets/images/services-bg.jpg";
import {
  standardsFrameworks,
  cloudPlatforms,
} from "../../data/certificationsData";

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <div>
      <Seo
        title={t("certificationsPage.title")}
        description={t("certificationsPage.subtitle")}
      />

      <HeroSection
        badge={t("certificationsPage.label")}
        title={t("certificationsPage.title")}
        description={t("certificationsPage.subtitle")}
        image={servicesBg}
      >
        <Link
          to="/quote"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t("certificationsPage.ctaTitle")}
        </Link>

        <Link
          to="/contact"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
        >
          {t("expertisePage.ctaContact")}
        </Link>
      </HeroSection>

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mx-auto mb-14 max-w-3xl text-center leading-relaxed text-gray-600 dark:text-gray-300">
            {t("certificationsPage.introText")}
          </p>

          <p className="mb-14 text-center font-semibold uppercase tracking-wide text-dbsOrange">
            {t("certificationsPage.standardsLabel")}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {standardsFrameworks.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-dbsDark dark:text-white">
                    {item.name}
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                    {t(item.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-14 rounded-2xl border border-gray-100 bg-dbsLight p-6 text-center text-sm leading-relaxed text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
            {t("certificationsPage.disclaimer")}
          </p>
        </div>
      </section>

      <section className="bg-dbsDark py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-10 text-center font-semibold uppercase tracking-wide text-dbsOrange">
            {t("certificationsPage.cloudLabel")}
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            {cloudPlatforms.map((platform) => {
              const Icon = platform.icon;

              return (
                <div
                  key={platform.id}
                  className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-medium text-gray-100 backdrop-blur-md transition hover:border-dbsOrange hover:bg-dbsOrange/20"
                >
                  <Icon size={20} />
                  {platform.name}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-dbsDark to-orange-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            {t("certificationsPage.ctaTitle")}
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            {t("certificationsPage.ctaText")}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/quote"
              className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              {t("expertisePage.ctaQuote")}
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold transition hover:bg-white hover:text-dbsDark"
            >
              {t("expertisePage.ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
