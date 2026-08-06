import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Link2,
  User,
} from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import Seo from "../../shared/components/Seo";
import HeroSection from "../../shared/components/HeroSection";
import blogBg from "../../assets/images/blog-bg.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace("/api", "");

export default function BlogPostDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch(`${API_URL}/blog-posts`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;

        const published = (data.data || []).filter(
          (item) => item.status === "published"
        );

        setPosts(published);

        if (!published.some((item) => item.slug === slug)) {
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

  const post = useMemo(
    () => posts.find((item) => item.slug === slug) || null,
    [posts, slug]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  }, [posts, post]);

  const paragraphs = useMemo(() => {
    if (!post?.content) return [];
    return post.content.split(/\n{2,}/).filter(Boolean);
  }, [post]);

  const readingTime = useMemo(() => {
    if (!post?.content) return 1;
    const words = post.content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }, [post]);

  const getImage = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silencieux : le clic reste sans effet si le presse-papiers est indisponible.
    }
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
  const postDate = new Date(post.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <Seo
        title={post.title}
        description={post.summary || post.content?.slice(0, 160)}
      />

      <HeroSection badge={t("blogPage.label")} title={post.title} image={image} />

      <div className="relative z-10 mx-auto -mt-10 max-w-4xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                <User size={15} />
              </span>
              {post.author || "DBS Africa"}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                <Calendar size={15} />
              </span>
              {postDate}
            </span>

            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                <Clock size={15} />
              </span>
              {t("blogPage.readingTime", {
                defaultValue: "{{count}} min de lecture",
                count: readingTime,
              })}
            </span>
          </div>

          <nav className="hidden items-center gap-1.5 text-xs text-gray-400 sm:flex">
            <Link to="/" className="hover:text-dbsOrange">
              {t("nav.home", { defaultValue: "Accueil" })}
            </Link>
            <ChevronRight size={13} />
            <Link to="/insights" className="hover:text-dbsOrange">
              {t("blogPage.label")}
            </Link>
          </nav>
        </div>
      </div>

      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_300px] lg:px-8">
          {/* ARTICLE */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-0"
          >
            <Link
              to="/insights"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-dbsOrange hover:underline"
            >
              <ArrowLeft size={16} />
              {t("blogPage.backToList", {
                defaultValue: "Retour aux actualités",
              })}
            </Link>

            <div className="space-y-6 text-lg leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:font-bold first-letter:text-dbsOrange dark:text-gray-300">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-3 border-t border-gray-100 pt-8 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {t("blogPage.share", { defaultValue: "Partager :" })}
              </span>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " — " + shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-dbsOrange hover:bg-dbsOrange hover:text-white dark:border-gray-700 dark:text-gray-400"
              >
                <FaWhatsapp size={15} />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-dbsOrange hover:bg-dbsOrange hover:text-white dark:border-gray-700 dark:text-gray-400"
              >
                <FaLinkedinIn size={15} />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-dbsOrange hover:bg-dbsOrange hover:text-white dark:border-gray-700 dark:text-gray-400"
              >
                <FaFacebookF size={15} />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                aria-label={t("blogPage.copyLink", {
                  defaultValue: "Copier le lien",
                })}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-dbsOrange hover:bg-dbsOrange hover:text-white dark:border-gray-700 dark:text-gray-400"
              >
                {copied ? <Check size={15} /> : <Link2 size={15} />}
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-dbsLight p-7 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900">
              <p className="font-semibold text-dbsDark dark:text-white">
                {t("blogPage.ctaText", {
                  defaultValue: "Une question sur cet article ?",
                })}
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-dbsOrange px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                {t("blogPage.ctaContact", { defaultValue: "Contactez-nous" })}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>

          {/* SIDEBAR */}
          {relatedPosts.length > 0 && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t("blogPage.related", { defaultValue: "À lire aussi" })}
              </p>

              <div className="space-y-4">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/insights/${item.slug}`}
                    className="group block rounded-2xl border border-gray-100 bg-white p-4 transition hover:border-dbsOrange hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="mb-3 h-24 overflow-hidden rounded-xl bg-dbsDark">
                      {item.image_url ? (
                        <img
                          src={getImage(item.image_url)}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-bold text-dbsOrange">
                          DBS Africa
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm font-bold leading-snug text-dbsDark transition group-hover:text-dbsOrange dark:text-white">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
}
