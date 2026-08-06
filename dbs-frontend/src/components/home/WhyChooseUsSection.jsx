import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { whyItems } from "../../data/homeData.jsx";
import WhyChooseCard from "./WhyChooseCard";

export default function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-dbsLight dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-dbsOrange font-semibold uppercase">
            {t("why.label")}
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold dark:text-white">
            {t("why.title")}
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-300">
            {t("why.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {whyItems.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WhyChooseCard
                icon={item.icon}
                title={t(item.titleKey)}
                text={t(item.textKey)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
