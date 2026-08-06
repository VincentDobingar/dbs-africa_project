import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import Seo from "../../shared/components/Seo";
import HeroSection from "../../shared/components/HeroSection";
import blogBg from "../../assets/images/blog-bg.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace("/api", "");

export default function BlogPostDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch(`${API_URL}/blog-posts`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;

        const found = (data.data || []).find(
          (item) => item.slug === slug && item.status === "published"
        );

        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (mounted) setNotFound(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const getImage = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          {t("blogPage.loading", { defaultValue: "Chargement..." })}
        </p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
        <h1 className="font-heading text-2xl font-bold text-dbsDark dark:text-white">
          {t("blogPage.notFound", {
            defaultValue: "Cet article est introuvable.",
          })}
        </h1>

        <Link
          to="/insights"
          className="inline-flex items-center gap-2 rounded-full bg-dbsOrange px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          <ArrowLeft size={18} />
          {t("blogPage.backToList", {
            defaultValue: "Retour aux actualités",
          })}
        </Link>
      </div>
    );
  }

  const image = getImage(post.image_url) || blogBg;

  return (
    <div>
      <Seo
        title={post.title}
        description={post.summary || post.content?.slice(0, 160)}
      />

      <HeroSection
        badge={t("blogPage.label")}
        title={post.title}
        image={image}
      />

      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            to="/insights"
            className="mb-8 inline-flex items-center gap-2 font-semibold text-dbsOrange hover:underline"
          >
            <ArrowLeft size={18} />
            {t("blogPage.backToList", {
              defaultValue: "Retour aux actualités",
            })}
          </Link>

          <div className="mb-8 flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <User size={16} />
              {post.author || "DBS Africa"}
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {new Date(post.created_at).toLocaleDateString("fr-FR")}
            </span>
          </div>

          <div className="space-y-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {(post.content || "")
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-dbsLight p-7 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900">
            <p className="font-semibold text-dbsDark dark:text-white">
              {t("blogPage.ctaText", {
                defaultValue: "Une question sur cet article ?",
              })}
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-dbsOrange px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              {t("blogPage.ctaContact", {
                defaultValue: "Contactez-nous",
              })}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
