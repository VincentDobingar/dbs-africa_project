import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import hero1 from "../../assets/hero/hero-1.jpg";
import hero2 from "../../assets/hero/hero-2.jpg";
import hero3 from "../../assets/hero/hero-3.jpg";
import hero4 from "../../assets/hero/hero-4.jpg";

import StatsSection from "./StatsSection";

export default function HeroSection() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [hero1, hero2, hero3, hero4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <section className="relative min-h-[860px] overflow-hidden bg-black text-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide]}
            alt="DBS Africa"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur hover:bg-dbsOrange md:flex"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur hover:bg-dbsOrange md:flex"
        >
          <ChevronRight />
        </button>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-8 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 font-semibold uppercase tracking-wide text-dbsOrange"
            >
              {t("brand.name")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-heading font-bold leading-tight drop-shadow-lg md:text-6xl"
            >
              {t("hero.title")}
            </motion.h1>

            <div className="mt-5 h-1 w-16 rounded-full bg-dbsOrange" />

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-2xl font-semibold text-white drop-shadow md:text-3xl"
            >
              {t("hero.subtitle")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-100 drop-shadow"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/expertise"
                className="rounded-full bg-dbsOrange px-7 py-4 text-center font-semibold text-white transition hover:bg-orange-600"
              >
                {t("hero.ctaServices")}
              </Link>

              <Link
                to="/quote"
                className="rounded-full border border-white/60 bg-black/15 px-7 py-4 text-center font-semibold text-white backdrop-blur transition hover:bg-white hover:text-dbsDark"
              >
                {t("hero.ctaQuote")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex justify-center gap-4 sm:justify-start"
            >
              <a
                href="https://linkedin.com/in/dobingarvincent"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:border-dbsOrange hover:bg-dbsOrange"
              >
                <FaLinkedinIn size={22} />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:border-dbsOrange hover:bg-dbsOrange"
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:border-dbsOrange hover:bg-dbsOrange"
              >
                <FaFacebookF size={22} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:border-dbsOrange hover:bg-dbsOrange"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://wa.me/25762500305"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur transition hover:border-dbsOrange hover:bg-dbsOrange"
              >
                <FaWhatsapp size={22} />
              </a>
            </motion.div>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full transition ${
                  currentSlide === index ? "bg-dbsOrange" : "bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="pb-16">
          <StatsSection />
        </div>

      </section>
    </>
  );
}