import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  Menu,
  X,
  Globe2,
  Handshake,
  ChevronDown,
  Rocket,
  MapPin,
  Code2,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/dbs-logo.png";
import logoDark from "../../assets/dbs-logo1.png";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setExpertiseOpen(false);
  }, [location.pathname]);

  const currentLanguage =
    i18n.resolvedLanguage ||
    i18n.language ||
    "fr";

  const changeLanguage = async () => {
    const nextLanguage =
      currentLanguage.startsWith("fr")
        ? "en"
        : "fr";

    await i18n.changeLanguage(nextLanguage);
    setOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const expertiseLinks = [
    {
      icon: Rocket,
      label: t("nav.expertise", { defaultValue: "Expertise" }),
      subtitle: t("navMenu.expertise", {
        defaultValue: "Nos domaines d'expertise",
      }),
      path: "/expertise",
    },
    {
      icon: MapPin,
      label: t("nav.industries", { defaultValue: "Secteurs" }),
      subtitle: t("navMenu.industries", {
        defaultValue: "Secteurs que nous accompagnons",
      }),
      path: "/industries",
    },
    {
      icon: Code2,
      label: t("nav.technologies", { defaultValue: "Technologies" }),
      subtitle: t("navMenu.technologies", {
        defaultValue: "Notre stack technologique",
      }),
      path: "/technologies",
    },
    {
      icon: ShieldCheck,
      label: t("nav.certifications", { defaultValue: "Certifications" }),
      subtitle: t("navMenu.certifications", {
        defaultValue: "Référentiels & standards",
      }),
      path: "/certifications",
    },
  ];

  const navLinks = [
    {
      label: t("nav.home", {
        defaultValue: "Accueil",
      }),
      path: "/",
    },
    {
      label: t("nav.about", {
        defaultValue: "À propos",
      }),
      path: "/about",
    },
    {
      label: t("nav.solutions", {
        defaultValue: "Solutions",
      }),
      path: "/solutions",
    },
    {
      label: t("nav.portfolio", {
        defaultValue: "Réalisations",
      }),
      path: "/portfolio",
    },
    {
      label: t("nav.insights", {
        defaultValue: "Actualités",
      }),
      path: "/insights",
    },
    {
      label: t("nav.careers", {
        defaultValue: "Carrières",
      }),
      path: "/careers",
    },
    {
      label: t("nav.pricing", {
        defaultValue: "Tarifs",
      }),
      path: "/pricing",
    },
    {
      label: t("nav.contact", {
        defaultValue: "Contact",
      }),
      path: "/contact",
    },
  ];

  const isExpertiseRoute = expertiseLinks.some(
    (item) => location.pathname === item.path
  );

  const getNavLinkClass = ({ isActive }) => {
    return [
      "relative whitespace-nowrap py-2 text-sm font-medium transition-colors duration-300",
      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-dbsOrange",
      "after:transition-all after:duration-300",
      isActive
        ? "text-dbsOrange after:w-full"
        : "text-gray-700 after:w-0 hover:text-dbsOrange hover:after:w-full dark:text-gray-300",
    ].join(" ");
  };

  const isPartnerRoute =
    location.pathname.startsWith("/partner");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="w-full px-3 sm:px-5 lg:px-7 xl:px-8 2xl:px-10">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* LOGO ET LANGUE */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex shrink-0 items-center dark:rounded-xl dark:bg-black dark:p-1.5"
              aria-label="Retour à l’accueil"
            >
              <img
                src={theme === "dark" ? logoDark : logo}
                alt="DBS Africa"
                className="h-14 w-auto object-contain sm:h-16"
              />
            </Link>

            {/* SÉLECTEUR DE LANGUE DESKTOP */}
            <button
              type="button"
              onClick={changeLanguage}
              aria-label={
                currentLanguage.startsWith("fr")
                  ? "Afficher le site en anglais"
                  : "Afficher le site en français"
              }
              className="hidden shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:inline-flex"
            >
              <Globe2 size={17} />

              <span>
                {currentLanguage.startsWith("fr")
                  ? "EN"
                  : "FR"}
              </span>
            </button>

            {/* BASCULE THÈME DESKTOP */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? t("a11y.switchToLight", {
                      defaultValue: "Activer le mode clair",
                    })
                  : t("a11y.switchToDark", {
                      defaultValue: "Activer le mode sombre",
                    })
              }
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:inline-flex"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          {/* PARTIE DROITE DESKTOP */}
          <div className="ml-auto hidden min-w-0 items-center justify-end gap-5 xl:flex 2xl:gap-7">
            <nav
              className="flex min-w-0 items-center justify-end gap-4 2xl:gap-7"
              aria-label="Navigation principale"
            >
              {navLinks.slice(0, 2).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={getNavLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setExpertiseOpen((previous) => !previous)
                  }
                  aria-expanded={expertiseOpen}
                  aria-haspopup="true"
                  className={[
                    "flex items-center gap-1 whitespace-nowrap py-2 text-sm font-medium transition-colors duration-300",
                    isExpertiseRoute
                      ? "text-dbsOrange"
                      : "text-gray-700 hover:text-dbsOrange dark:text-gray-300",
                  ].join(" ")}
                >
                  {t("nav.expertise", { defaultValue: "Expertise" })}
                  <ChevronDown
                    size={16}
                    className={
                      expertiseOpen ? "rotate-180 transition" : "transition"
                    }
                  />
                </button>

                {expertiseOpen && (
                  <div className="absolute left-0 top-full mt-3 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                    {expertiseLinks.map((item) => {
                      const ItemIcon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setExpertiseOpen(false)}
                          className={({ isActive }) =>
                            [
                              "flex items-start gap-3 rounded-xl px-3 py-3 transition",
                              isActive
                                ? "bg-orange-50 dark:bg-orange-500/10"
                                : "hover:bg-orange-50 dark:hover:bg-orange-500/10",
                            ].join(" ")
                          }
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                            <ItemIcon size={18} />
                          </span>

                          <span>
                            <span className="block text-sm font-semibold text-dbsDark dark:text-white">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                              {item.subtitle}
                            </span>
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>

              {navLinks.slice(2).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={getNavLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <NavLink
                to="/partner"
                className={[
                  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5",
                  "text-sm font-semibold transition duration-300",
                  isPartnerRoute
                    ? "bg-orange-50 text-dbsOrange dark:bg-orange-500/10"
                    : "text-dbsDark hover:bg-orange-50 hover:text-dbsOrange dark:text-white dark:hover:bg-orange-500/10",
                ].join(" ")}
              >
                <Handshake size={18} />

                <span>
                  {t("nav.partnerSpace", {
                    defaultValue:
                      "Espace partenaire",
                  })}
                </span>
              </NavLink>

              <Link
                to="/quote"
                className="inline-flex whitespace-nowrap rounded-full bg-dbsOrange px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md"
              >
                {t("nav.quote", {
                  defaultValue:
                    "Demander un devis",
                })}
              </Link>
            </div>
          </div>

          {/* ACTIONS MOBILE ET TABLETTE */}
          <div className="ml-auto flex items-center gap-2 xl:hidden">
            {/* LANGUE SUR PETIT MOBILE */}
            <button
              type="button"
              onClick={changeLanguage}
              aria-label={
                currentLanguage.startsWith("fr")
                  ? "Afficher le site en anglais"
                  : "Afficher le site en français"
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:text-gray-300 sm:hidden"
            >
              <Globe2 size={17} />

              {currentLanguage.startsWith("fr")
                ? "EN"
                : "FR"}
            </button>

            {/* BASCULE THÈME MOBILE */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? t("a11y.switchToLight", {
                      defaultValue: "Activer le mode clair",
                    })
                  : t("a11y.switchToDark", {
                      defaultValue: "Activer le mode sombre",
                    })
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:text-gray-300"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              onClick={() =>
                setOpen((previous) => !previous)
              }
              aria-label={
                open
                  ? "Fermer le menu"
                  : "Ouvrir le menu"
              }
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:text-gray-300"
            >
              {open ? (
                <X size={26} />
              ) : (
                <Menu size={26} />
              )}
            </button>
          </div>
        </div>

        {/* MENU MOBILE ET TABLETTE */}
        {open && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 py-5 dark:border-gray-800 xl:hidden"
          >
            <nav
              className="flex flex-col"
              aria-label="Navigation mobile"
            >
              {navLinks.slice(0, 2).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-orange-50 text-dbsOrange dark:bg-orange-500/10"
                        : "text-gray-700 hover:bg-gray-50 hover:text-dbsOrange dark:text-gray-300 dark:hover:bg-gray-800",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <p className="mt-2 px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {t("nav.expertise", { defaultValue: "Expertise" })}
              </p>

              {expertiseLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-orange-50 text-dbsOrange dark:bg-orange-500/10"
                        : "text-gray-700 hover:bg-gray-50 hover:text-dbsOrange dark:text-gray-300 dark:hover:bg-gray-800",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {navLinks.slice(2).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-orange-50 text-dbsOrange dark:bg-orange-500/10"
                        : "text-gray-700 hover:bg-gray-50 hover:text-dbsOrange dark:text-gray-300 dark:hover:bg-gray-800",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-4 grid gap-3 border-t border-gray-100 pt-5 dark:border-gray-800 sm:grid-cols-2">
                <Link
                  to="/partner"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-dbsOrange px-5 py-3 text-sm font-semibold text-dbsOrange transition hover:bg-orange-50 dark:hover:bg-orange-500/10"
                >
                  <Handshake size={18} />

                  {t("nav.partnerSpace", {
                    defaultValue:
                      "Espace partenaire",
                  })}
                </Link>

                <Link
                  to="/quote"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-full bg-dbsOrange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {t("nav.quote", {
                    defaultValue:
                      "Demander un devis",
                  })}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}