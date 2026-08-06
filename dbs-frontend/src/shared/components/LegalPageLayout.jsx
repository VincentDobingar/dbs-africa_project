import { motion } from "framer-motion";
import Seo from "./Seo";
import HeroSection from "./HeroSection";

/**
 * Mise en page commune aux pages légales (mentions légales, CGU) :
 * sommaire ancré en barre latérale + sections en cartes numérotées,
 * pour un rendu cohérent avec le reste du site plutôt que du texte brut.
 */
export default function LegalPageLayout({
  seoTitle,
  seoDescription,
  badge,
  title,
  description,
  image,
  updatedLabel,
  tocLabel,
  sections,
}) {
  return (
    <div>
      <Seo title={seoTitle} description={seoDescription} />

      <HeroSection
        badge={badge}
        title={title}
        description={description}
        image={image}
      />

      <section className="relative overflow-hidden bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {updatedLabel && (
            <p className="mb-10 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {updatedLabel}
            </p>
          )}

          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* SOMMAIRE */}
            <nav className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-gray-100 bg-dbsLight p-6 dark:border-gray-800 dark:bg-gray-900">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {tocLabel}
                </p>

                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-dbsOrange dark:text-gray-300 dark:hover:bg-orange-500/10"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* SECTIONS */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(index * 0.05, 0.3),
                    }}
                    className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                        <Icon size={22} />
                      </div>

                      <h2 className="font-heading text-lg font-bold text-dbsDark dark:text-white">
                        {section.title}
                      </h2>
                    </div>

                    <div className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {section.body}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
