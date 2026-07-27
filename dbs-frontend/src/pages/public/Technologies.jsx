import { motion } from "framer-motion";
import { Cpu, Rocket, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import techBg from "../../assets/technologies/technologies-bg.jpg";
import { technologyCategories } from "../../data/technologiesData";

export default function Technologies() {
  const { t } = useTranslation();

  const highlights = [
    {
      icon: <ShieldCheck size={30} />,
      title: t("technologiesPage.highlights.reliable.title"),
      text: t("technologiesPage.highlights.reliable.text"),
    },
    {
      icon: <Cpu size={30} />,
      title: t("technologiesPage.highlights.secure.title"),
      text: t("technologiesPage.highlights.secure.text"),
    },
    {
      icon: <Rocket size={30} />,
      title: t("technologiesPage.highlights.scalable.title"),
      text: t("technologiesPage.highlights.scalable.text"),
    },
  ];

  return (
    <div>
      <Seo
        title={t("technologiesPage.title")}
        description={t("technologiesPage.subtitle")}
      />

      <HeroSection
        badge={t("technologiesPage.label")}
        title={t("technologiesPage.title")}
        description={t("technologiesPage.subtitle")}
        image={techBg}
      >
        <Link
          to="/quote"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t("expertisePage.ctaQuote")}
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
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-100 bg-dbsLight p-7 transition hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                  {item.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold text-dbsDark dark:text-white">
                  {item.title}
                </h3>

                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {technologyCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-3xl border border-gray-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-dbsDark dark:text-white">
                    {t(category.titleKey)}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-gray-200 bg-dbsLight px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-dbsDark to-orange-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            {t("expertisePage.ctaQuote")}
          </h2>

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
