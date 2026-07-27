import { useTranslation } from "react-i18next";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Harvest Center",
      role: t("testimonials.harvest.role"),
      text: t("testimonials.harvest.text"),
    },
    {
      name: "SNRC",
      role: t("testimonials.snrc.role"),
      text: t("testimonials.snrc.text"),
    },
    {
      name: "NDOF Consulting",
      role: t("testimonials.ndof.role"),
      text: t("testimonials.ndof.text"),
    },
  ];

  return (
    <section className="py-24 bg-dbsLight dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-dbsOrange font-semibold uppercase tracking-wide">
            {t("testimonials.label")}
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold dark:text-white">
            {t("testimonials.title")}
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              role={item.role}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}