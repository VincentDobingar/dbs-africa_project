import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { portfolioProjects } from "../../data/homeData.jsx";

export default function PortfolioSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-dbsOrange font-semibold uppercase">
              {t("portfolio.label")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold dark:text-white">
              {t("portfolio.title")}
            </h2>

            <p className="mt-5 max-w-2xl text-gray-600 leading-relaxed dark:text-gray-300">
              {t("portfolio.description")}
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-dbsOrange font-semibold hover:underline"
          >
            {t("portfolio.viewAll")} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-dbsLight shadow-sm transition hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="h-56 bg-white flex items-center justify-center p-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-32 max-w-full object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-7">
                <p className="text-sm font-semibold uppercase text-dbsOrange">
                  {project.category}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-dbsDark dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-300">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-950 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to="/portfolio"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-dbsOrange"
                >
                  {t("portfolio.discover")} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}