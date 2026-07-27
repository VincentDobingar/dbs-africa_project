import { motion } from "framer-motion";
import {
  BarChart3,
  Code2,
  Database,
  Rocket,
  Briefcase,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Cpu,
  LineChart,
  Globe2,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import servicesBg from "../../assets/images/services-bg.jpg";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Rocket size={32} />,
      title: t("servicesPage.items.digital.title"),
      text: t("servicesPage.items.digital.text"),
      bullets: [
        t("servicesPage.items.digital.b1"),
        t("servicesPage.items.digital.b2"),
        t("servicesPage.items.digital.b3"),
      ],
    },
    {
      key: "marketing",
      icon: <Megaphone size={30} />,
      title: t("servicesPage.items.marketing.title"),
      text: t("servicesPage.items.marketing.text"),
      bullets: [
        t("servicesPage.items.marketing.b1"),
        t("servicesPage.items.marketing.b2"),
        t("servicesPage.items.marketing.b3"),
      ],
    },
    {
      icon: <BarChart3 size={32} />,
      title: t("servicesPage.items.bi.title"),
      text: t("servicesPage.items.bi.text"),
      bullets: [
        t("servicesPage.items.bi.b1"),
        t("servicesPage.items.bi.b2"),
        t("servicesPage.items.bi.b3"),
      ],
    },
    {
      icon: <Database size={32} />,
      title: t("servicesPage.items.data.title"),
      text: t("servicesPage.items.data.text"),
      bullets: [
        t("servicesPage.items.data.b1"),
        t("servicesPage.items.data.b2"),
        t("servicesPage.items.data.b3"),
      ],
    },
    {
      icon: <Code2 size={32} />,
      title: t("servicesPage.items.web.title"),
      text: t("servicesPage.items.web.text"),
      bullets: [
        t("servicesPage.items.web.b1"),
        t("servicesPage.items.web.b2"),
        t("servicesPage.items.web.b3"),
      ],
    },
    {
      icon: <Smartphone size={32} />,
      title: t("servicesPage.items.telecom.title"),
      text: t("servicesPage.items.telecom.text"),
      bullets: [
        t("servicesPage.items.telecom.b1"),
        t("servicesPage.items.telecom.b2"),
        t("servicesPage.items.telecom.b3"),
      ],
    },
    {
      icon: <Briefcase size={32} />,
      title: t("servicesPage.items.pm.title"),
      text: t("servicesPage.items.pm.text"),
      bullets: [
        t("servicesPage.items.pm.b1"),
        t("servicesPage.items.pm.b2"),
        t("servicesPage.items.pm.b3"),
      ],
    },
  ];

  const process = [
    t("servicesPage.process.step1"),
    t("servicesPage.process.step2"),
    t("servicesPage.process.step3"),
    t("servicesPage.process.step4"),
  ];

  const technologies = [
    "React",
    "Node.js",
    "WordPress",
    "Power BI",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "Excel",
    "SSRS",
    "API REST",
    "Tailwind CSS",
    "JavaScript",
  ];

  const highlights = [
    {
      icon: <Cpu size={30} />,
      title: t("servicesPage.highlights.tech.title"),
      text: t("servicesPage.highlights.tech.text"),
    },
    {
      icon: <LineChart size={30} />,
      title: t("servicesPage.highlights.data.title"),
      text: t("servicesPage.highlights.data.text"),
    },
    {
      icon: <Globe2 size={30} />,
      title: t("servicesPage.highlights.business.title"),
      text: t("servicesPage.highlights.business.text"),
    },
  ];

  return (
    <div>
      <HeroSection
        badge={t("servicesPage.label")}
        title={t("servicesPage.title")}
        description={t("servicesPage.subtitle")}
        image={servicesBg}
      >
        <Link
          to="/quote"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white hover:bg-orange-600 transition"
        >
          {t("servicesPage.ctaQuote")}
        </Link>

        <Link
          to="/contact"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white hover:text-dbsDark transition"
        >
          {t("servicesPage.ctaContact")}
        </Link>
      </HeroSection>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-dbsOrange font-semibold uppercase">
              {t("servicesPage.expertiseLabel")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold">
              {t("servicesPage.expertiseTitle")}
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed">
              {t("servicesPage.expertiseText")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="h-16 w-16 rounded-2xl bg-orange-100 text-dbsOrange flex items-center justify-center mb-6">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-5">
                  {service.text}
                </p>

                <div className="space-y-3">
                  {service.bullets.map((bullet) => (
                    <p
                      key={bullet}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <CheckCircle2
                        size={19}
                        className="text-dbsOrange shrink-0 mt-1"
                      />
                      <span>{bullet}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dbsLight">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-dbsOrange font-semibold uppercase">
              {t("servicesPage.approachLabel")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold">
              {t("servicesPage.approachTitle")}
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed">
              {t("servicesPage.approachText")}
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {process.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm"
                >
                  <div className="text-3xl font-bold text-dbsOrange mb-3">
                    0{index + 1}
                  </div>
                  <p className="font-semibold text-gray-800">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-7 border border-gray-100 shadow-sm flex gap-5"
              >
                <div className="h-14 w-14 rounded-2xl bg-orange-100 text-dbsOrange flex items-center justify-center shrink-0">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dbsDark text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-dbsOrange font-semibold uppercase">
              {t("servicesPage.techLabel")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold">
              {t("servicesPage.techTitle")}
            </h2>

            <p className="mt-5 text-gray-300 leading-relaxed">
              {t("servicesPage.techText")}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-gray-200 hover:border-dbsOrange hover:text-dbsOrange transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-dbsDark to-orange-950 text-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            {t("servicesPage.finalCtaTitle")}
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            {t("servicesPage.finalCtaText")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/quote"
              className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white hover:bg-orange-600 transition"
            >
              {t("servicesPage.ctaQuote")}
            </Link>

            <Link
              to="/portfolio"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold hover:bg-white hover:text-dbsDark transition"
            >
              {t("servicesPage.viewPortfolio")}
              <ArrowRight className="inline ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}