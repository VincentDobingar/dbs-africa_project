import { useTranslation } from "react-i18next";
import PartnerCard from "./PartnerCard";

import snrcLogo from "../../assets/clients/snrc-logo.png";
import harvestLogo from "../../assets/clients/harvest-logo.png";
import ndofLogo from "../../assets/clients/ndof-logo.png";
import edenLogo from "../../assets/clients/eden-logo.png";
import maniLogo from "../../assets/clients/mani-logo.png";
import cdoLogo from "../../assets/clients/cdo-logo.png";

export default function PartnersSection() {
  const { t } = useTranslation();

  const partners = [
    {
      name: "SNRC",
      logo: snrcLogo,
      description: "Société Nationale de Recouvrement des Créances",
    },
    {
      name: "Harvest Center",
      logo: harvestLogo,
      description: "Language • Culture • Education",
    },
    {
      name: "NDOF Consulting",
      logo: ndofLogo,
      description: "Études • Conseils • Contrôle",
    },
    {
      name: "Eden Business Center",
      logo: edenLogo,
      description: "Fabrication de tricots",
    },
    {
      name: "MANI Financial Group",
      logo: maniLogo,
      description: "Solutions financières innovantes",
    },
    {
      name: "CDO Tchad",
      logo: cdoLogo,
      description: "Que de l'innovation",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-dbsOrange font-semibold uppercase tracking-wide">
            {t("homePartners.label")}
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold dark:text-white">
            {t("homePartners.title")}
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            {t("homePartners.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.name}
              logo={partner.logo}
              name={partner.name}
              description={partner.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}