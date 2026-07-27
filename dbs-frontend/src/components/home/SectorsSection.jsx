import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SectorCard from "./SectorCard";

export default function SectorsSection() {
  const { t } = useTranslation();

  const sectors = [
    t("sectors.telecom"),
    t("sectors.finance"),
    t("sectors.ngo"),
    t("sectors.public"),
    t("sectors.education"),
    t("sectors.microfinance"),
    t("sectors.startup"),
    t("sectors.consulting"),
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-dbsOrange font-semibold uppercase">
            {t("sectors.label")}
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold dark:text-white">
            {t("sectors.title")}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sectors.map((sector) => (
            <SectorCard key={sector} sector={sector} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/industries"
            className="inline-flex items-center font-semibold text-dbsOrange hover:underline"
          >
            {t("sectors.viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}