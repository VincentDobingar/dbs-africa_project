import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProcessCard from "./ProcessCard";

import processBg from "../../assets/process/process-bg.jpg";

export default function ProcessSection() {
  const { t } = useTranslation();

  const processSteps = [
    t("process.step1"),
    t("process.step2"),
    t("process.step3"),
    t("process.step4"),
  ];

  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${processBg})`,
        }}
      />

      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/95 via-black/70 to-gray-950/95" />

      <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 rounded-full bg-dbsOrange/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-blue-500/15 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-dbsOrange font-semibold uppercase">
            {t("process.label")}
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold">
            {t("process.title")}
          </h2>

          <p className="mt-5 text-gray-300">
            {t("process.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProcessCard
                number={`0${index + 1}`}
                title={step}
                description={t("process.stepDescription")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
