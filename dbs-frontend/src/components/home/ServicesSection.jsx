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
          <div>
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
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.titleKey}
                icon={service.icon}
                title={t(service.titleKey)}
                text={t(service.textKey)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}