import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeroSection from "../../shared/components/HeroSection";
import Seo from "../../shared/components/Seo";
import blogBg from "../../assets/images/blog-bg.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE_URL = API_URL.replace(/\/api$/, "");

export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/blog-posts`)
      .then((res) => res.json())
      .then((data) => {
        const published = (data.data || []).filter(
          (post) => post.status === "published"
        );
        setPosts(published);
      })
      .catch(console.error);
  }, []);

  const getImage = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

  return (
    <div>
      <Seo
        title={t("blogPage.title")}
        description={t("blogPage.subtitle")}
      />

      <HeroSection
        badge={t("blogPage.label")}
        title={t("blogPage.title")}
        description={t("blogPage.subtitle")}
        image={blogBg}
      >
        <Link
          to="/contact"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white hover:bg-orange-600 transition"
        >
          {t("blogPage.ctaContact")}
        </Link>

        <Link
          to="/quote"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white hover:text-dbsDark transition"
        >
          {t("nav.quote")}
        </Link>
      </HeroSection>

      <section className="py-20 bg-dbsLight dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-dbsOrange font-semibold uppercase">
              {t("blogPage.latestLabel")}
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-heading font-bold dark:text-white">
              {t("blogPage.latestTitle")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="h-56 bg-dbsDark overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={getImage(post.image_url)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-dbsOrange font-bold">
                      DBS Africa
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <User size={15} />
                      {post.author || "DBS Africa"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={15} />
                      {new Date(post.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold dark:text-white">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-300">
                    {post.excerpt || `${post.content?.slice(0, 140)}...`}
                  </p>

                  <Link
                    to={`/insights/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-dbsOrange font-semibold hover:underline"
                  >
                    {t("blogPage.readMore")}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.article>
            ))}

            {posts.length === 0 && (
              <div className="col-span-full rounded-3xl bg-white p-10 text-center text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                {t("blogPage.noPosts")}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}