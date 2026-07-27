import { useTranslation } from "react-i18next";

import Seo from "../../shared/components/Seo";
import HeroSection from "../../components/home/HeroSection";
import ServicesSection from "../../components/home/ServicesSection";
import TechnologiesSection from "../../components/home/TechnologiesSection";
import WhyChooseUsSection from "../../components/home/WhyChooseUsSection";
import PortfolioSection from "../../components/home/PortfolioSection";
import ProcessSection from "../../components/home/ProcessSection";
import SectorsSection from "../../components/home/SectorsSection";
import PartnersSection from "../../components/home/PartnersSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import CTASection from "../../components/home/CTASection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("hero.title")} description={t("hero.description")} />
      <HeroSection />
      <ServicesSection />
      <TechnologiesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <ProcessSection />
      <SectorsSection />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}