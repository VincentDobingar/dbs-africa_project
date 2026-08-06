import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { services } from "../../data/homeData.jsx";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-dbsOrange font-semibold uppercase">
              {t("services.sectionLabel")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold dark:text-white">
              {t("services.title")}
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed dark:text-gray-300">
              {t("services.subtitle")}
            </p>

            <Link
              to="/expertise"
              className="mt-8 inline-flex items-center font-semibold text-dbsOrange hover:underline"
            >
              {t("services.viewAll")} →
            </Link>
          </motion.div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={t(service.titleKey)}
                  text={t(service.textKey)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
