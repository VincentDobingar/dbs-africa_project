import { Link } from "react-router-dom";
import { Home, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import Seo from "../../shared/components/Seo";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-24 dark:bg-gray-950">
      <Seo
        title={t("notFoundPage.title")}
        description={t("notFoundPage.description")}
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-heading text-8xl font-extrabold text-dbsOrange">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-dbsDark dark:text-white md:text-4xl">
          {t("notFoundPage.title")}
        </h1>

        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          {t("notFoundPage.description")}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            <Home size={18} />
            {t("notFoundPage.backHome")}
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-8 py-4 font-semibold text-dbsDark transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:text-white"
          >
            <Mail size={18} />
            {t("notFoundPage.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
