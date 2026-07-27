import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Briefcase, Globe2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import servicesBg from "../../assets/images/services-bg.jpg";
import { expertiseDomains } from "../../data/expertiseData";

export default function Expertise() {
  const { t, i18n } = useTranslation();

  const lang = i18n.resolvedLanguage?.startsWith("fr") ? "fr" : "en";

  const stats = [
    {
      value: "10+",
      label: t("about.stats.experience"),
      icon: <BadgeCheck size={30} />,
    },
    {
      value: "50+",
      label: t("about.stats.projects"),
      icon: <Briefcase size={30} />,
    },
    {
      value: String(expertiseDomains.length),
      label: t("expertisePage.stats.domains"),
      icon: <Layers size={30} />,
    },
    {
      value: "5+",
      label: t("about.stats.countries"),
      icon: <Globe2 size={30} />,
    },
  ];

  return (
    <div>
      <Seo
        title={t("expertisePage.title")}
        description={t("expertisePage.subtitle")}
      />

      <HeroSection
        badge={t("expertisePage.label")}
        title={t("expertisePage.title")}
        description={t("expertisePage.subtitle")}
        image={servicesBg}
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

      <section className="border-b border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 lg:grid-cols-4 lg:px-8">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-5 rounded-3xl border border-gray-100 bg-dbsLight p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                {item.icon}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-dbsDark dark:text-white">
                  {item.value}
                </h3>
                <p className="font-medium text-gray-600 dark:text-gray-300">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {expertiseDomains.map((domain, index) => {
              const Icon = domain.icon;

              return (
                <motion.article
                  key={domain.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-dbsDark dark:text-white">
                    {t(domain.titleKey)}
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                    {t(domain.descKey)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {domain.items.map((item) => (
                      <span
                        key={item.en}
                        className="rounded-full border border-gray-200 bg-dbsLight px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {item[lang]}
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
              to="/portfolio"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold transition hover:bg-white hover:text-dbsDark"
            >
              {t("servicesPage.viewPortfolio")}
              <ArrowRight className="ml-2 inline" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
