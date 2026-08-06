import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { portfolioProjects } from "../../data/homeData.jsx";

export default function PortfolioSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24">
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-dbsOrange/10 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-dbsOrange font-semibold uppercase">
              {t("portfolio.label")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold text-white">
              {t("portfolio.title")}
            </h2>

            <p className="mt-5 max-w-2xl text-gray-400 leading-relaxed">
              {t("portfolio.description")}
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-dbsOrange font-semibold transition hover:gap-3"
          >
            {t("portfolio.viewAll")} <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-dbsOrange/40 hover:shadow-2xl hover:shadow-orange-500/10"
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

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to="/portfolio"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-dbsOrange transition hover:gap-3"
                >
                  {t("portfolio.discover")} <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
