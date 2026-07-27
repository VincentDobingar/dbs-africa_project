import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  Code2,
  Database,
  Globe2,
  HandHeart,
  Layers,
  LineChart,
  ExternalLink,
  Clock3,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import portfolioBg from "../../assets/images/portfolio-bg.jpg";

import snrcImg from "../../assets/projects/snrc.jpg";
import harvestImg from "../../assets/projects/harvest.jpg";
import edenImg from "../../assets/projects/eden.jpg";
import cdoImg from "../../assets/projects/cdo.jpg";
import ndofImg from "../../assets/projects/ndof.jpg";
import maniImg from "../../assets/projects/mani.jpg";

export default function Portfolio() {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState("all");

  const portfolioProjects = [
    // ============ WEB ============
    {
      title: "SNRC Tchad",
      key: "snrc",
      category: "web",
      status: "online",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
      url: "https://snrc.td",
      image: snrcImg,
    },
    {
      title: "Harvest Center",
      key: "harvest",
      category: "web",
      status: "online",
      technologies: ["React", "Node.js", "MySQL", "Tailwind CSS"],
      url: "https://harvestcenter.bi",
      image: harvestImg,
    },
    {
      title: "Eden Business Center",
      key: "eden",
      category: "web",
      status: "online",
      technologies: ["React", "Node.js", "MySQL", "Express"],
      url: "https://eden-businesscenter.org",
      image: edenImg,
    },
    {
      title: "CDO Tchad",
      key: "cdo",
      category: "web",
      status: "online",
      technologies: ["React", "Node.js", "PostgreSQL", "Express"],
      url: "https://www.cdotchad.com",
      image: cdoImg,
    },
    {
      title: "NDOF Consulting",
      key: "ndof",
      category: "web",
      status: "pending",
      technologies: ["React", "Node.js", "MySQL", "Tailwind CSS"],
      url: null,
      image: ndofImg,
    },
    {
      title: "MANI Microfinance",
      key: "mani",
      category: "web",
      status: "pending",
      technologies: ["React", "Node.js", "PostgreSQL", "Prisma"],
      url: null,
      image: maniImg,
    },

    // ============ HUMANITAIRE ============
    {
      title: "Plateforme Antidiscrimination",
      key: "antidiscrimination",
      category: "humanitarian",
      status: "online",
      technologies: ["React", "Node.js", "MySQL", "Tailwind CSS"],
      url: "https://www.antidiscrimination.td/",
      icon: HandHeart,
    },
    {
      title: "M&E Performance Dashboard",
      key: "meDashboard",
      category: "humanitarian",
      status: "concept",
      technologies: ["React", "Node.js", "Power BI", "PostgreSQL"],
      url: null,
      icon: HandHeart,
    },
    {
      title: "Beneficiary Management System",
      key: "beneficiarySystem",
      category: "humanitarian",
      status: "concept",
      technologies: ["React", "Node.js", "PostgreSQL", "Power BI"],
      url: null,
      icon: HandHeart,
    },
    {
      title: "Humanitarian Data Platform",
      key: "humanitarianPlatform",
      category: "humanitarian",
      status: "concept",
      technologies: ["Power BI", "Python", "SQL Server"],
      url: null,
      icon: HandHeart,
    },

    // ============ DATA ============
    {
      key: "dataLendoRh",
      category: "data",
      language: "SQL",
      icon: Database,
      badgeClass:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
      url: "https://github.com/VincentDobingar/DataLendo-RH",
    },
    {
      key: "afriMarket",
      category: "data",
      language: "Python",
      icon: Code2,
      badgeClass:
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",
      url: "https://afrimarketprojects.streamlit.app/",
    },
    {
      key: "rDashboard",
      category: "data",
      language: "R",
      icon: LineChart,
      badgeClass:
        "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
      url: "https://019f9499-d98d-4398-5222-9875193ce2dd.share.connect.posit.cloud/",
    },
  ];

  const categoryOrder = ["all", "web", "data", "humanitarian", "other"];

  const categoryTabs = categoryOrder
    .map((category) => ({
      value: category,
      label: t(`portfolioPage.categories.${category}`),
      count:
        category === "all"
          ? portfolioProjects.length
          : portfolioProjects.filter((p) => p.category === category).length,
    }))
    .filter((tab) => tab.value === "all" || tab.count > 0);

  const visibleProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory
        );

  const stats = [
    {
      value: "50+",
      label: t("portfolioPage.stats.projects"),
      icon: <Briefcase size={30} />,
    },
    {
      value: "10+",
      label: t("portfolioPage.stats.experience"),
      icon: <BadgeCheck size={30} />,
    },
    {
      value: "5+",
      label: t("portfolioPage.stats.countries"),
      icon: <Globe2 size={30} />,
    },
    {
      value: "10+",
      label: t("portfolioPage.stats.technologies"),
      icon: <Layers size={30} />,
    },
  ];

  return (
    <div>
      <Seo
        title={t("portfolioPage.title")}
        description={t("portfolioPage.subtitle")}
      />

      <HeroSection
        badge={t("portfolioPage.label")}
        title={t("portfolioPage.title")}
        description={t("portfolioPage.subtitle")}
        image={portfolioBg}
      >
        <Link
          to="/contact"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white hover:bg-orange-600 transition"
        >
          {t("portfolioPage.ctaContact")}
        </Link>

        <Link
          to="/quote"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white hover:text-dbsDark transition"
        >
          {t("portfolioPage.ctaQuote")}
        </Link>
      </HeroSection>

      <section className="py-12 bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-dbsLight border border-gray-100 p-6 flex items-center gap-5 dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="h-14 w-14 rounded-2xl bg-orange-100 text-dbsOrange flex items-center justify-center dark:bg-orange-500/15">
                {item.icon}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-dbsDark dark:text-white">
                  {item.value}
                </h3>
                <p className="text-gray-600 font-medium dark:text-gray-300">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-dbsLight dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-dbsOrange font-semibold uppercase">
              {t("portfolioPage.projectsGrid.label")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold dark:text-white">
              {t("portfolioPage.projectsGrid.title")}
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed dark:text-gray-300">
              {t("portfolioPage.projectsGrid.subtitle")}
            </p>
          </div>

          {/* FILTRES PAR CATÉGORIE */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveCategory(tab.value)}
                className={[
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition",
                  activeCategory === tab.value
                    ? "bg-dbsOrange text-white shadow-sm shadow-orange-200"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300",
                ].join(" ")}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* GRILLE FILTRÉE */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleProjects.map((project) => {
              const isData = project.category === "data";
              const FallbackIcon = project.icon;

              const cardTitle = isData
                ? t(`portfolioPage.dataProjects.${project.key}.title`)
                : t(`portfolioPage.webProjects.${project.key}.title`, {
                    defaultValue: project.title,
                  });

              const cardDescription = isData
                ? t(`portfolioPage.dataProjects.${project.key}.description`)
                : t(`portfolioPage.webProjects.${project.key}.description`);

              const overlayLabel = isData
                ? project.language
                : t(`portfolioPage.webProjects.${project.key}.category`);

              return (
                <motion.div
                  key={project.key}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="relative h-56 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={cardTitle}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dbsDark to-orange-950">
                        {FallbackIcon && (
                          <FallbackIcon size={48} className="text-white/70" />
                        )}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute top-4 right-4">
                      {isData && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${project.badgeClass}`}
                        >
                          {project.language}
                        </span>
                      )}

                      {!isData && project.status === "online" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 px-3 py-1.5 text-xs font-semibold">
                          <CheckCircle2 size={14} />
                          {t("portfolioPage.webProjects.online")}
                        </span>
                      )}

                      {!isData && project.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-700 px-3 py-1.5 text-xs font-semibold">
                          <Clock3 size={14} />
                          {t("portfolioPage.webProjects.pending")}
                        </span>
                      )}

                      {!isData && project.status === "concept" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-700 px-3 py-1.5 text-xs font-semibold">
                          <Lightbulb size={14} />
                          {t("portfolioPage.webProjects.concept")}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-dbsOrange font-semibold text-sm uppercase">
                        {overlayLabel}
                      </p>

                      <h3 className="text-2xl font-bold text-white mt-2">
                        {cardTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                      {cardDescription}
                    </p>

                    {!isData && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-orange-50 text-dbsOrange px-3 py-1 text-sm font-medium dark:bg-orange-500/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-6">
                      {isData && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-semibold text-dbsOrange hover:underline"
                        >
                          {t("portfolioPage.dataProjects.viewProject")}
                          <ExternalLink size={18} />
                        </a>
                      )}

                      {!isData && project.status === "online" && project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-semibold text-dbsOrange hover:underline"
                        >
                          {t("portfolioPage.webProjects.visitSite")}
                          <ExternalLink size={18} />
                        </a>
                      )}

                      {!isData && project.status === "pending" && (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                          {t("portfolioPage.webProjects.pendingMessage")}
                        </span>
                      )}

                      {!isData && project.status === "concept" && (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                          {t("portfolioPage.webProjects.conceptMessage")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-dbsDark to-orange-950 text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            {t("portfolioPage.finalCtaTitle")}
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            {t("portfolioPage.finalCtaText")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white hover:bg-orange-600 transition"
            >
              {t("portfolioPage.ctaContact")}
            </Link>

            <Link
              to="/quote"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold hover:bg-white hover:text-dbsDark transition"
            >
              {t("portfolioPage.ctaQuote")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}