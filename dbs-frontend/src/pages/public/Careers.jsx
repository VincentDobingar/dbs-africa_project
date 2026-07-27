import { motion } from "framer-motion";
import {
  Rocket,
  GraduationCap,
  Users,
  Sparkles,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import aboutBg from "../../assets/images/about-bg.jpg";

export default function Careers() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Rocket size={30} />,
      title: t("careersPage.benefits.impact.title"),
      text: t("careersPage.benefits.impact.text"),
    },
    {
      icon: <GraduationCap size={30} />,
      title: t("careersPage.benefits.growth.title"),
      text: t("careersPage.benefits.growth.text"),
    },
    {
      icon: <Users size={30} />,
      title: t("careersPage.benefits.team.title"),
      text: t("careersPage.benefits.team.text"),
    },
    {
      icon: <Sparkles size={30} />,
      title: t("careersPage.benefits.flexibility.title"),
      text: t("careersPage.benefits.flexibility.text"),
    },
  ];

  return (
    <div>
      <Seo
        title={t("careersPage.title")}
        description={t("careersPage.subtitle")}
      />

      <HeroSection
        badge={t("careersPage.label")}
        title={t("careersPage.title")}
        description={t("careersPage.subtitle")}
        image={aboutBg}
      >
        <Link
          to="/contact"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t("careersPage.ctaContact")}
        </Link>
      </HeroSection>

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-semibold uppercase text-dbsOrange">
              {t("careersPage.cultureLabel")}
            </p>

            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              {t("careersPage.cultureTitle")}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                  {item.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold dark:text-white">{item.title}</h3>

                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <p className="font-semibold uppercase text-dbsOrange">
            {t("careersPage.openRolesLabel")}
          </p>

          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl dark:text-white">
            {t("careersPage.openRolesTitle")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">
            {t("careersPage.openRolesText")}
          </p>

          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              <Mail size={18} />
              {t("careersPage.spontaneousCta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
