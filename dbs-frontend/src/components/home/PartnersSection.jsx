import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PartnerCard from "./PartnerCard";

import snrcLogo from "../../assets/clients/snrc-logo.png";
import harvestLogo from "../../assets/clients/harvest-logo.png";
import ndofLogo from "../../assets/clients/ndof-logo.png";
import edenLogo from "../../assets/clients/eden-logo.png";
import maniLogo from "../../assets/clients/mani-logo.png";
import cdoLogo from "../../assets/clients/cdo-logo.png";
import tobemalkoLogo from "../../assets/clients/2bemalko.jpg";
import antidiscriminationLogo from "../../assets/clients/antidiscrimination-logo.png";

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
    {
      name: "Agence TOBEMALKO",
      logo: tobemalkoLogo,
      description: "Communication digitale • Web • Marketing • Événementiel",
    },
    {
      name: "Plateforme Antidiscrimination",
      logo: antidiscriminationLogo,
      description: "ONG • Droits humains • Sensibilisation",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <p className="text-dbsOrange font-semibold uppercase tracking-wide">
            {t("homePartners.label")}
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-white">
            {t("homePartners.title")}
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            {t("homePartners.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <PartnerCard
                logo={partner.logo}
                name={partner.name}
                description={partner.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
