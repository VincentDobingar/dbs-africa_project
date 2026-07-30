import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Briefcase } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import Seo from "../../shared/components/Seo";
import { teamMembers, getInitials } from "../../data/teamData";

export default function TeamMemberProfile() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const member = teamMembers.find((item) => item.slug === slug);

  if (!member) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-24 dark:bg-gray-950">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-dbsDark dark:text-white md:text-4xl">
            {t("teamProfile.notFound.title", {
              defaultValue: "Membre introuvable",
            })}
          </h1>

          <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
            {t("teamProfile.notFound.description", {
              defaultValue:
                "Ce profil n'existe pas ou a été déplacé.",
            })}
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            <ArrowLeft size={18} />
            {t("teamProfile.backToTeam", {
              defaultValue: "Retour à l'équipe",
            })}
          </Link>
        </div>
      </div>
    );
  }

  const role = t(member.roleKey, { defaultValue: member.roleDefault });
  const description = t(member.descriptionKey, {
    defaultValue: member.descriptionDefault,
  });

  return (
    <div>
      <Seo title={`${member.name} — ${role}`} description={description} />

      <section className="bg-dbsDark py-16 text-white md:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-dbsOrange"
          >
            <ArrowLeft size={16} />
            {t("teamProfile.backToTeam", {
              defaultValue: "Retour à l'équipe",
            })}
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto h-56 w-56 overflow-hidden rounded-3xl bg-black shadow-2xl md:mx-0 md:h-72 md:w-72"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`Portrait de ${member.name}`}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dbsDark to-orange-950">
                  <span className="text-5xl font-bold text-white/70">
                    {getInitials(member.name)}
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h1 className="font-heading text-3xl font-bold md:text-5xl">
                {member.name}
              </h1>

              <p className="mt-3 text-lg font-semibold text-dbsOrange">
                {role}
              </p>

              {(member.email || member.linkedin) && (
                <div className="mt-6 flex justify-center gap-3 md:justify-start">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Contacter ${member.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-dbsOrange hover:bg-dbsOrange"
                    >
                      <Mail size={18} />
                    </a>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-dbsOrange hover:bg-dbsOrange"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-950 md:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase text-dbsOrange">
              {t("teamProfile.aboutLabel", { defaultValue: "Profil" })}
            </p>

            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>

          <div className="mt-16 border-t border-gray-100 pt-12 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Briefcase className="text-dbsOrange" size={22} />

              <h2 className="font-heading text-2xl font-bold text-dbsDark dark:text-white">
                {t("teamProfile.portfolioTitle", {
                  defaultValue: "Réalisations",
                })}
              </h2>
            </div>

            <div className="mt-6 rounded-3xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                {t("teamProfile.portfolioEmpty", {
                  defaultValue:
                    "Les réalisations de ce membre seront bientôt disponibles.",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
