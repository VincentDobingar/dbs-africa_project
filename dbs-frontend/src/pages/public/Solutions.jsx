import { cloneElement } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  RadioTower,
  Network,
  Users,
  Code2,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";

import solutionsBg from "../../assets/images/services-bg.jpg";

import webDevelopmentImg from "../../assets/solutions/web-development.jpg";
import businessIntelligenceImg from "../../assets/solutions/business-intelligence.jpg";
import monitoringEvaluationImg from "../../assets/solutions/monitoring-evaluation.jpg";
import telecomMobileMoneyImg from "../../assets/solutions/telecom-mobile-money.jpg";
import networkInfrastructureImg from "../../assets/solutions/network-infrastructure.jpg";
import beneficiaryManagementImg from "../../assets/solutions/beneficiary-management.jpg";
import recruitmentPortalImg from "../../assets/solutions/recruitment-portal.jpg";
import digitalMarketingImg from "../../assets/solutions/digital-marketing.jpg";

export default function Solutions() {
  const { t } = useTranslation();

  const solutions = [
    {
        key: "web",
        icon: <Code2 size={26} />,
        image: webDevelopmentImg,
        title: t("solutionsPage.items.web.title"),
        description: t("solutionsPage.items.web.description"),
        features: [
            t("solutionsPage.items.web.feature1"),
            t("solutionsPage.items.web.feature2"),
            t("solutionsPage.items.web.feature3"),
            t("solutionsPage.items.web.feature4"),
        ],
        path: "/portfolio",
    },
    {
        key: "marketing",
        icon: <Megaphone size={26} />,
        image: digitalMarketingImg,
        title: t("solutionsPage.items.marketing.title"),
        description: t("solutionsPage.items.marketing.description"),
        features: [
            t("solutionsPage.items.marketing.feature1"),
            t("solutionsPage.items.marketing.feature2"),
            t("solutionsPage.items.marketing.feature3"),
            t("solutionsPage.items.marketing.feature4"),
        ],
        path: "/quote",
    },
    {
        key: "bi",
        icon: <BarChart3 size={26} />,
        image: businessIntelligenceImg,
        title: t("solutionsPage.items.bi.title"),
        description: t("solutionsPage.items.bi.description"),
        features: [
            t("solutionsPage.items.bi.feature1"),
            t("solutionsPage.items.bi.feature2"),
            t("solutionsPage.items.bi.feature3"),
            t("solutionsPage.items.bi.feature4"),
        ],
        path: "/portfolio",
    },
    {
        key: "monitoring",
        icon: <Users size={26} />,
        image: monitoringEvaluationImg,
        title: t("solutionsPage.items.monitoring.title"),
        description: t("solutionsPage.items.monitoring.description"),
        features: [
            t("solutionsPage.items.monitoring.feature1"),
            t("solutionsPage.items.monitoring.feature2"),
            t("solutionsPage.items.monitoring.feature3"),
            t("solutionsPage.items.monitoring.feature4"),
        ],
        path: "/portfolio",
    },
    {
        key: "telecom",
        icon: <RadioTower size={26} />,
        image: telecomMobileMoneyImg,
        title: t("solutionsPage.items.telecom.title"),
        description: t("solutionsPage.items.telecom.description"),
        features: [
            t("solutionsPage.items.telecom.feature1"),
            t("solutionsPage.items.telecom.feature2"),
            t("solutionsPage.items.telecom.feature3"),
            t("solutionsPage.items.telecom.feature4"),
        ],
        path: "/portfolio",
    },
    {
        key: "network",
        icon: <Network size={26} />,
        image: networkInfrastructureImg,
        title: t("solutionsPage.items.network.title"),
        description: t("solutionsPage.items.network.description"),
        features: [
            t("solutionsPage.items.network.feature1"),
            t("solutionsPage.items.network.feature2"),
            t("solutionsPage.items.network.feature3"),
            t("solutionsPage.items.network.feature4"),
        ],
        path: "/portfolio",
    },
    {
        key: "beneficiaries",
        icon: <Users size={26} />,
        image: beneficiaryManagementImg,
        title: t("solutionsPage.items.beneficiaries.title"),
        description: t("solutionsPage.items.beneficiaries.description"),
        features: [
            t("solutionsPage.items.beneficiaries.feature1"),
            t("solutionsPage.items.beneficiaries.feature2"),
            t("solutionsPage.items.beneficiaries.feature3"),
            t("solutionsPage.items.beneficiaries.feature4"),
        ],
        path: "/portfolio",
    },
    {
        key: "recruitment",
        icon: <BriefcaseBusiness size={26} />,
        image: recruitmentPortalImg,
        title: t("solutionsPage.items.recruitment.title"),
        description: t("solutionsPage.items.recruitment.description"),
        features: [
            t("solutionsPage.items.recruitment.feature1"),
            t("solutionsPage.items.recruitment.feature2"),
            t("solutionsPage.items.recruitment.feature3"),
            t("solutionsPage.items.recruitment.feature4"),
        ],
        path: "/portfolio",
    },
  ];

  return (
    <div>
      <Seo
        title={t("solutionsPage.heroTitle")}
        description={t("solutionsPage.heroDescription")}
      />

      <HeroSection
        badge={t("solutionsPage.heroLabel")}
        title={t("solutionsPage.heroTitle")}
        description={t("solutionsPage.heroDescription")}
        image={solutionsBg}
      >
        <Link
          to="/portfolio"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          {t("solutionsPage.viewProjects")}
        </Link>

        <Link
          to="/quote"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
        >
          {t("solutionsPage.requestSolution")}
        </Link>
      </HeroSection>

      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-4xl text-center"
          >
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              {t("solutionsPage.label")}
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-dbsDark md:text-5xl dark:text-white">
              {t("solutionsPage.title")}
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {t("solutionsPage.description")}
            </p>
          </motion.div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {solutions.map((solution, index) => (
              <motion.article
                key={solution.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dbsOrange text-white shadow-md shadow-orange-200">
                      {solution.icon}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-dbsDark dark:text-white">
                        {solution.title}
                      </h3>

                      <div className="mt-3 h-0.5 w-8 bg-dbsOrange" />
                    </div>
                  </div>

                  <p className="mt-5 min-h-[72px] leading-relaxed text-gray-600 dark:text-gray-300">
                    {solution.description}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {solution.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <Check
                          size={17}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-dbsOrange"
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto px-6 pb-4">
                  <Link
                    to={solution.path}
                    className="inline-flex items-center gap-2 rounded-full border border-dbsOrange px-5 py-2.5 text-sm font-semibold text-dbsOrange transition hover:bg-dbsOrange hover:text-white"
                  >
                    {t("solutionsPage.viewProjects")}
                    <ArrowRight size={17} />
                  </Link>
                </div>

                <div className="relative mt-1 h-64 overflow-hidden bg-white dark:bg-gray-900">
                  {solution.image ? (
                    <img
                      src={solution.image}
                      alt={solution.title}
                      loading="lazy"
                      className="h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dbsDark to-orange-950 text-white/70">
                      {cloneElement(solution.icon, { size: 56 })}
                    </div>
                  )}

                  <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 translate-x-10 translate-y-10 rounded-full bg-dbsOrange/90" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-dbsDark px-8 py-14 text-white md:px-14 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-semibold uppercase tracking-wide text-dbsOrange">
                {t("solutionsPage.ctaLabel")}
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                {t("solutionsPage.ctaTitle")}
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">
                {t("solutionsPage.ctaDescription")}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                {t("solutionsPage.requestSolution")}
                <ArrowRight size={19} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
              >
                {t("solutionsPage.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}