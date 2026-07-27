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

      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-dbsOrange font-semibold uppercase">
            {t("process.label")}
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold">
            {t("process.title")}
          </h2>

          <p className="mt-5 text-gray-300">
            {t("process.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step}
              number={`0${index + 1}`}
              title={step}
              description={t("process.stepDescription")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}