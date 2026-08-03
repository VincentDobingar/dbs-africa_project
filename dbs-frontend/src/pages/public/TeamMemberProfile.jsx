import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Award,
  Languages,
  FolderKanban,
} from "lucide-react";
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

              {(member.email ||
                member.phone ||
                member.linkedin ||
                member.portfolioUrl) && (
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

                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      aria-label={`Appeler ${member.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-dbsOrange hover:bg-dbsOrange"
                    >
                      <Phone size={18} />
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

                  {member.portfolioUrl && (
                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition hover:border-dbsOrange hover:bg-dbsOrange"
                    >
                      {t("teamProfile.viewPortfolio", {
                        defaultValue: "Voir le portfolio",
                      })}
                      <ExternalLink size={16} />
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

            {member.portfolioUrl && !member.resume && (
              <a
                href={member.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-10 text-center transition hover:border-dbsOrange dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:text-left"
              >
                <div>
                  <p className="font-semibold text-dbsDark dark:text-white">
                    {t("teamProfile.portfolioCta.title", {
                      defaultValue: "Portfolio complet en ligne",
                    })}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t("teamProfile.portfolioCta.description", {
                      defaultValue:
                        "Expériences détaillées, projets et compétences sur le portfolio personnel.",
                    })}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-dbsOrange px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-orange-600">
                  {t("teamProfile.viewPortfolio", {
                    defaultValue: "Voir le portfolio",
                  })}
                  <ExternalLink size={16} />
                </span>
              </a>
            )}

            {!member.portfolioUrl && !member.resume && (
              <div className="mt-6 rounded-3xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  {t("teamProfile.portfolioEmpty", {
                    defaultValue:
                      "Les réalisations de ce membre seront bientôt disponibles.",
                  })}
                </p>
              </div>
            )}

            {member.resume && (
              <div className="mt-8 space-y-14">
                {member.resume.experience?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-dbsDark dark:text-white">
                      <Briefcase size={18} className="text-dbsOrange" />
                      {t("teamProfile.experienceTitle", {
                        defaultValue: "Expérience professionnelle",
                      })}
                    </h3>

                    <div className="mt-6 space-y-8 border-l-2 border-gray-100 pl-6 dark:border-gray-800">
                      {member.resume.experience.map((job, index) => (
                        <div key={index} className="relative">
                          <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-dbsOrange" />

                          <p className="text-sm font-semibold text-dbsOrange">
                            {job.period}
                          </p>
                          <p className="mt-1 font-bold text-dbsDark dark:text-white">
                            {job.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {[job.company, job.location]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>

                          {job.bullets?.length > 0 && (
                            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                              {job.bullets.map((bullet, bulletIndex) => (
                                <li key={bulletIndex} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {member.resume.projects?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-dbsDark dark:text-white">
                      <FolderKanban size={18} className="text-dbsOrange" />
                      {t("teamProfile.projectsTitle", {
                        defaultValue: "Projets clés",
                      })}
                    </h3>

                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {member.resume.projects.map((project, index) => (
                        <li
                          key={index}
                          className="rounded-2xl border border-gray-100 p-4 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {member.resume.skills?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-dbsDark dark:text-white">
                      {t("teamProfile.skillsTitle", {
                        defaultValue: "Compétences clés",
                      })}
                    </h3>

                    <div className="mt-4 space-y-5">
                      {member.resume.skills.map((group, index) => (
                        <div key={index}>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {group.category}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {group.items.map((item, itemIndex) => (
                              <span
                                key={itemIndex}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(member.resume.certifications?.length > 0 ||
                  member.resume.education?.length > 0) && (
                  <div className="grid gap-10 sm:grid-cols-2">
                    {member.resume.certifications?.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-dbsDark dark:text-white">
                          <Award size={18} className="text-dbsOrange" />
                          {t("teamProfile.certificationsTitle", {
                            defaultValue: "Certifications",
                          })}
                        </h3>

                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          {member.resume.certifications.map((cert, index) => (
                            <li key={index} className="flex justify-between gap-4">
                              <span>{cert.name}</span>
                              <span className="whitespace-nowrap text-gray-400 dark:text-gray-500">
                                {cert.year}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {member.resume.education?.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-dbsDark dark:text-white">
                          <GraduationCap size={18} className="text-dbsOrange" />
                          {t("teamProfile.educationTitle", {
                            defaultValue: "Formation",
                          })}
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                          {member.resume.education.map((item, index) => (
                            <li key={index}>
                              <p className="font-semibold text-dbsDark dark:text-white">
                                {item.degree}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400">
                                {item.school} · {item.period}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {member.resume.languages?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-dbsDark dark:text-white">
                      <Languages size={18} className="text-dbsOrange" />
                      {t("teamProfile.languagesTitle", {
                        defaultValue: "Langues",
                      })}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {member.resume.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300"
                        >
                          <span className="font-semibold text-dbsDark dark:text-white">
                            {lang.name}
                          </span>{" "}
                          · {lang.level}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
