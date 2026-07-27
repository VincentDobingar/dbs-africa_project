import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/dbs-logo1.png";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dbsDark text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="DBS Africa"
              className="h-16 md:h-24 w-auto bg-black rounded-xl p-3 shadow-lg border border-black/10"
            />

            <p className="text-gray-300 max-w-xl">
              {t("footer.text")}
            </p>

            <p className="mt-4 text-dbsOrange font-semibold">
              {t("footer.slogan1")}
            </p>

            <p className="text-gray-300">
              {t("footer.slogan2")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {t("footer.navigation")}
            </h3>

            <div className="flex flex-col gap-2 text-gray-300">
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/about">{t("nav.about")}</Link>
              <Link to="/expertise">{t("nav.expertise")}</Link>
              <Link to="/industries">{t("nav.industries")}</Link>
              <Link to="/solutions">{t("nav.solutions")}</Link>
              <Link to="/technologies">{t("nav.technologies")}</Link>
              <Link to="/portfolio">{t("nav.portfolio")}</Link>
              <Link to="/certifications">{t("nav.certifications")}</Link>
              <Link to="/insights">{t("nav.insights")}</Link>
              <Link to="/careers">{t("nav.careers")}</Link>
              <Link to="/contact">{t("nav.contact")}</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {t("nav.contact")}
            </h3>

            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <Mail size={18} /> contact@dbs-africa.org
              </p>

              <p className="flex items-center gap-2">
                <Phone size={18} /> +257 62 500 305
              </p>

              <div className="flex gap-4 pt-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-dbsOrange"
                >
                  LinkedIn
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-dbsOrange"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between gap-3">
          <p>
            © {new Date().getFullYear()} DBS Africa.{" "}
            {t("footer.rights")}
          </p>

          <p>{t("footer.designed")}</p>
        </div>
      </div>
    </footer>
  );
}