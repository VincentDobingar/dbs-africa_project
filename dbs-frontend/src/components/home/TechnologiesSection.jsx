import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { technologies } from "../../data/homeData.jsx";

import techBg from "../../assets/technologies/technologies-bg.jpg";

export default function TechnologiesSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${techBg})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-dbsOrange font-semibold uppercase tracking-wide">
            {t("technologies.label")}
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold">
            {t("technologies.title")}
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            {t("technologies.description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.08,
              }}
              className="
                px-7
                py-4
                rounded-full
                border
                border-white/20
                bg-white/10
                backdrop-blur-md
                text-gray-100
                font-medium
                transition-all
                duration-300
                hover:border-dbsOrange
                hover:bg-dbsOrange/20
                hover:text-white
                hover:shadow-lg
                hover:shadow-orange-500/20
              "
            >
              {tech}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/technologies"
            className="inline-flex items-center font-semibold text-dbsOrange hover:underline"
          >
            {t("technologies.viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}