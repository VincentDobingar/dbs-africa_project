import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from "../../assets/dbs-logo1.png";

const socialLinks = [
  {
    href: "https://linkedin.com/in/dobingarvincent",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://wa.me/25762500305",
    label: "WhatsApp",
    Icon: FaWhatsapp,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    Icon: FaInstagram,
  },
];

const navLinksLeft = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/expertise", key: "nav.expertise" },
  { to: "/industries", key: "nav.industries" },
  { to: "/solutions", key: "nav.solutions" },
  { to: "/technologies", key: "nav.technologies" },
];

const navLinksRight = [
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/certifications", key: "nav.certifications" },
  { to: "/insights", key: "nav.insights" },
  { to: "/careers", key: "nav.careers" },
  { to: "/contact", key: "nav.contact" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Ligne d'accent en haut */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-dbsOrange/60 to-transparent" />

      {/* Halos décoratifs */}
      <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-dbsOrange/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* MARQUE */}
          <div className="md:col-span-5">
            <img
              src={logo}
              alt="DBS Africa"
              className="h-14 md:h-16 w-auto object-contain"
            />

            <p className="mt-6 max-w-md text-gray-400 leading-relaxed">
              {t("footer.aboutDescription")}
            </p>

            <p className="mt-5 font-semibold text-dbsOrange">
              {t("footer.slogan1")}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-dbsOrange hover:bg-dbsOrange hover:text-white hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="md:col-span-4">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
              {t("footer.navigation")}
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex flex-col gap-3">
                {navLinksLeft.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="inline-block w-fit text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-dbsOrange"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {navLinksRight.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="inline-block w-fit text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-dbsOrange"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-3">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
              {t("nav.contact")}
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:contact@dbs-africa.org"
                className="group flex items-center gap-3 text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-dbsOrange transition-colors duration-300 group-hover:border-dbsOrange/40 group-hover:bg-dbsOrange/10">
                  <Mail size={16} />
                </span>
                contact@dbs-africa.org
              </a>

              <a
                href="tel:+25762500305"
                className="group flex items-center gap-3 text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-dbsOrange transition-colors duration-300 group-hover:border-dbsOrange/40 group-hover:bg-dbsOrange/10">
                  <Phone size={16} />
                </span>
                +257 62 500 305
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} DBS Africa. {t("footer.rights")}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/legal-notice"
              className="transition-colors duration-300 hover:text-white"
            >
              {t("footer.legalNotice")}
            </Link>

            <Link
              to="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              {t("footer.terms")}
            </Link>

            <p>{t("footer.designed")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
