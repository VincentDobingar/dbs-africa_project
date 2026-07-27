  import {
    useState,
  } from "react";

  import {
    motion,
  } from "framer-motion";

  import {
    BarChart3,
    Briefcase,
    CheckCircle2,
    Code2,
    Database,
    FileSpreadsheet,
    Globe2,
    Handshake,
    Lightbulb,
    Mail,
    Rocket,
    ShieldCheck,
    Target,
    Users,
  } from "lucide-react";

  import {
    SiExpress,
    SiGithub,
    SiJavascript,
    SiMysql,
    SiNodedotjs,
    SiPostgresql,
    SiPython,
    SiR,
    SiReact,
    SiTailwindcss,
    SiWordpress,
  } from "react-icons/si";

  import {
    FaLinkedinIn,
  } from "react-icons/fa";

  import {
    Link,
  } from "react-router-dom";

  import {
    useTranslation,
  } from "react-i18next";

  import promoterPhoto from "../../assets/promoter/promoter.jpg";
  import aboutBg from "../../assets/images/about-bg.jpg";

  import HeroSection from "../../shared/components/HeroSection";
  import Seo from "../../shared/components/Seo";

  import aminaPhoto from "../../assets/team/amina-ngarambe.png";
  import alainPhoto from "../../assets/team/alain-mahamat.png";
  import nadegePhoto from "../../assets/team/nadege-kabore.png";
  import abdoulayePhoto from "../../assets/team/abdoulaye-barthelemy.png";

  export default function About() {
    const {
      t,
    } = useTranslation();

    const [
      showAllTech,
      setShowAllTech,
    ] = useState(false);

    // ============================================================
    // STATISTIQUES
    // ============================================================

    const stats = [
      {
        value: "10+",
        label: t(
          "about.stats.experience"
        ),
      },
      {
        value: "50+",
        label: t(
          "about.stats.projects"
        ),
      },
      {
        value: "10+",
        label: t(
          "about.stats.technologies"
        ),
      },
      {
        value: "5+",
        label: t(
          "about.stats.countries"
        ),
      },
    ];

    // ============================================================
    // VALEURS
    // ============================================================

    const values = [
      {
        icon: (
          <ShieldCheck size={30} />
        ),
        title: t(
          "about.values.excellence"
        ),
        text: t(
          "about.values.excellenceText"
        ),
      },
      {
        icon: (
          <Lightbulb size={30} />
        ),
        title: t(
          "about.values.innovation"
        ),
        text: t(
          "about.values.innovationText"
        ),
      },
      {
        icon: (
          <Handshake size={30} />
        ),
        title: t(
          "about.values.integrity"
        ),
        text: t(
          "about.values.integrityText"
        ),
      },
      {
        icon: (
          <Target size={30} />
        ),
        title: t(
          "about.values.impact"
        ),
        text: t(
          "about.values.impactText"
        ),
      },
    ];

    // ============================================================
    // EXPERTISES
    // ============================================================

    const expertise = [
      {
        icon: (
          <BarChart3 size={30} />
        ),
        title: t(
          "about.expertise.bi"
        ),
        text: t(
          "about.expertise.biText"
        ),
      },
      {
        icon: (
          <Database size={30} />
        ),
        title: t(
          "about.expertise.data"
        ),
        text: t(
          "about.expertise.dataText"
        ),
      },
      {
        icon: (
          <Code2 size={30} />
        ),
        title: t(
          "about.expertise.web"
        ),
        text: t(
          "about.expertise.webText"
        ),
      },
      {
        icon: (
          <Rocket size={30} />
        ),
        title: t(
          "about.expertise.digital"
        ),
        text: t(
          "about.expertise.digitalText"
        ),
      },
      {
        icon: (
          <Globe2 size={30} />
        ),
        title: t(
          "about.expertise.telecom"
        ),
        text: t(
          "about.expertise.telecomText"
        ),
      },
      {
        icon: (
          <Briefcase size={30} />
        ),
        title: t(
          "about.expertise.pm"
        ),
        text: t(
          "about.expertise.pmText"
        ),
      },
    ];

    // ============================================================
    // POURQUOI DBS AFRICA
    // ============================================================

    const reasons = [
      t("about.reasons.experience"),
      t("about.reasons.multisector"),
      t("about.reasons.results"),
      t("about.reasons.custom"),
      t("about.reasons.support"),
      t("about.reasons.tech"),
    ];

    // ============================================================
    // SECTEURS
    // ============================================================

    const sectors = [
      t("about.sectors.telecom"),
      t("about.sectors.mobileMoney"),
      t("about.sectors.finance"),
      t("about.sectors.microfinance"),
      t("about.sectors.ngo"),
      t("about.sectors.education"),
      t("about.sectors.public"),
      t("about.sectors.sme"),
    ];

    // ============================================================
    // TECHNOLOGIES
    // ============================================================

    const technologies = [
      {
        icon: <SiReact />,
        name: "React",
        description: t(
          "technologies.react"
        ),
      },
      {
        icon: <SiNodedotjs />,
        name: "Node.js",
        description: t(
          "technologies.node"
        ),
      },
      {
        icon: <SiExpress />,
        name: "Express",
        description: t(
          "technologies.express"
        ),
      },
      {
        icon: <SiJavascript />,
        name: "JavaScript",
        description: t(
          "technologies.javascript"
        ),
      },
      {
        icon: <SiMysql />,
        name: "MySQL",
        description: t(
          "technologies.mysql"
        ),
      },
      {
        icon: <SiPostgresql />,
        name: "PostgreSQL",
        description: t(
          "technologies.postgres"
        ),
      },
      {
        icon: (
          <BarChart3 size={28} />
        ),
        name: "Power BI",
        description: t(
          "technologies.powerbi"
        ),
      },
      {
        icon: (
          <Database size={28} />
        ),
        name: "SQL",
        description: t(
          "technologies.sql"
        ),
      },
      {
        icon: <SiWordpress />,
        name: "WordPress",
        description: t(
          "technologies.wordpress"
        ),
      },
      {
        icon: <SiTailwindcss />,
        name: "Tailwind CSS",
        description: t(
          "technologies.tailwind"
        ),
      },
      {
        icon: (
          <Rocket size={28} />
        ),
        name: "REST API",
        description: t(
          "technologies.api"
        ),
      },
      {
        icon: (
          <Database size={28} />
        ),
        name: "SQL Server",
        description: t(
          "technologies.sqlserver"
        ),
      },
      {
        icon: (
          <Database size={28} />
        ),
        name: "Oracle",
        description: t(
          "technologies.oracle"
        ),
      },
      {
        icon: (
          <BarChart3 size={28} />
        ),
        name: "Tableau",
        description: t(
          "technologies.tableau"
        ),
      },
      {
        icon: (
          <FileSpreadsheet
            size={28}
          />
        ),
        name: "SSRS",
        description: t(
          "technologies.ssrs"
        ),
      },
      {
        icon: <SiGithub />,
        name: "Git & GitHub",
        description: t(
          "technologies.github"
        ),
      },
      {
        icon: <SiPython />,
        name: "Python",
        description: t(
          "technologies.python"
        ),
      },
      {
        icon: <SiR />,
        name: "R",
        description: t(
          "technologies.r"
        ),
      },
      {
        icon: (
          <BarChart3 size={28} />
        ),
        name: "SPSS",
        description: t(
          "technologies.spss"
        ),
      },
    ];

    const visibleTechnologies =
      showAllTech
        ? technologies
        : technologies.slice(0, 6);

    // ============================================================
    // ÉQUIPE 
    // ============================================================

    const teamMembers = [
      {
        id: 1,
        name: "Abdoulaye Barthelemy",
        role: t("about.team.members.abdoulaye.role", {
          defaultValue:
            "Consultant – Directeur des Systèmes d'Information (DSI)",
        }),
        description: t(
          "about.team.members.abdoulaye.description",
          {
            defaultValue:
              "Professionnel de l'information et de la donnée avec plus de 16 ans d'expérience en contextes humanitaires et développement : gouvernance des données, analyse avancée et conception de solutions digitales au service de la décision et de l'impact terrain.",
          }
        ),
        photo: abdoulayePhoto,
        email: null,
        linkedin: null,
      },
      {
        id: 2,
        name: "Amina Ngarambe",
        role: t("about.team.members.amina.role", {
          defaultValue:
            "Responsable Data Analytics & Business Intelligence",
        }),
        description: t(
          "about.team.members.amina.description",
          {
            defaultValue:
              "Spécialiste en analyse de données, conception de tableaux de bord, automatisation du reporting et accompagnement à la prise de décision.",
          }
        ),
        photo: aminaPhoto,
        email: null,
        linkedin: null,
      },
      {
        id: 3,
        name: "Alain Mahamat",
        role: t("about.team.members.alain.role", {
          defaultValue:
            "Lead Développement Web & Applications",
        }),
        description: t(
          "about.team.members.alain.description",
          {
            defaultValue:
              "Développeur full-stack spécialisé dans la conception de plateformes web, d’applications métiers, d’API sécurisées et de solutions digitales évolutives.",
          }
        ),
        photo: alainPhoto,
        email: null,
        linkedin: null,
      },
      {
        id: 4,
        name: "Nadège Kaboré",
        role: t("about.team.members.nadege.role", {
          defaultValue:
            "Responsable Marketing Digital & Partenariats",
        }),
        description: t(
          "about.team.members.nadege.description",
          {
            defaultValue:
              "Professionnelle du marketing digital, de la prospection commerciale, de l’acquisition client et du développement de partenariats stratégiques.",
          }
        ),
        photo: nadegePhoto,
        email: null,
        linkedin: null,
      },
    ];

    const getInitials = (name) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
    };

    return (
      <div>
        <Seo
          title={t("about.title")}
          description={t("about.subtitle")}
        />

        {/* ====================================================== */}
        {/* HERO                                                   */}
        {/* ====================================================== */}

        <HeroSection
          badge={t("about.label")}
          title={t("about.title")}
          description={t(
            "about.subtitle"
          )}
          image={aboutBg}
        >
          <Link
            to="/expertise"
            className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            {t(
              "about.ctaServices"
            )}
          </Link>

          <Link
            to="/contact"
            className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
          >
            {t(
              "about.ctaContact"
            )}
          </Link>
        </HeroSection>

        {/* ====================================================== */}
        {/* PRÉSENTATION DE DBS AFRICA — PREMIÈRE SECTION           */}
        {/* ====================================================== */}

        <section className="bg-white py-20 dark:bg-gray-950">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2 lg:px-8">
            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
            >
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "about.whoLabel"
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-5xl dark:text-white">
                {t(
                  "about.whoTitle"
                )}
              </h2>

              <p className="mt-6 leading-relaxed text-gray-600 dark:text-gray-300">
                {t(
                  "about.whoText1"
                )}
              </p>

              <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                {t(
                  "about.whoText2"
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              className="rounded-3xl border border-gray-100 bg-dbsLight p-8 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-950">
                  <Target
                    className="mb-4 text-dbsOrange"
                    size={34}
                  />

                  <h3 className="mb-3 text-xl font-bold dark:text-white">
                    {t(
                      "about.visionTitle"
                    )}
                  </h3>

                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {t(
                      "about.visionText"
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-950">
                  <Rocket
                    className="mb-4 text-dbsOrange"
                    size={34}
                  />

                  <h3 className="mb-3 text-xl font-bold dark:text-white">
                    {t(
                      "about.missionTitle"
                    )}
                  </h3>

                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {t(
                      "about.missionText"
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* STATISTIQUES                                           */}
        {/* ====================================================== */}

        <section className="bg-dbsLight py-20 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
                >
                  <h3 className="text-5xl font-extrabold text-dbsOrange">
                    {item.value}
                  </h3>

                  <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* VALEURS                                                */}
        {/* ====================================================== */}

        <section className="bg-white py-20 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "about.valuesLabel"
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
                {t(
                  "about.valuesTitle"
                )}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {values.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    {item.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-bold dark:text-white">
                    {item.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* EXPERTISES                                             */}
        {/* ====================================================== */}

        <section className="bg-dbsLight py-20 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-14 max-w-3xl">
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "about.expertiseLabel"
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
                {t(
                  "about.expertiseTitle"
                )}
              </h2>

              <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-300">
                {t(
                  "about.expertiseDescription"
                )}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {expertise.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    {item.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-bold dark:text-white">
                    {item.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* POURQUOI DBS AFRICA                                    */}
        {/* ====================================================== */}

        <section className="bg-dbsDark py-20 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "about.whyLabel"
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
                {t(
                  "about.whyTitle"
                )}
              </h2>

              <p className="mt-5 leading-relaxed text-gray-300">
                {t(
                  "about.whyDescription"
                )}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <CheckCircle2
                    size={22}
                    className="mt-1 shrink-0 text-dbsOrange"
                  />

                  <p className="text-gray-200">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTEURS                                               */}
        {/* ====================================================== */}

        <section className="bg-white py-20 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "about.sectorsLabel"
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
                {t(
                  "about.sectorsTitle"
                )}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className="rounded-2xl border border-gray-100 bg-white p-6 text-center font-semibold transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                >
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* TECHNOLOGIES                                           */}
        {/* ====================================================== */}

        <section className="bg-dbsDark py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "technologies.label"
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
                {t(
                  "technologies.title"
                )}
              </h2>

              <p className="mt-5 leading-relaxed text-gray-300">
                {t(
                  "technologies.description"
                )}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleTechnologies.map(
                (tech) => (
                  <motion.div
                    key={tech.name}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:border-dbsOrange hover:bg-white/10"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-dbsOrange/20 text-3xl text-dbsOrange">
                      {tech.icon}
                    </div>

                    <h3 className="mb-3 text-xl font-bold">
                      {tech.name}
                    </h3>

                    <p className="leading-relaxed text-gray-300">
                      {tech.description}
                    </p>
                  </motion.div>
                )
              )}
            </div>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() =>
                  setShowAllTech(
                    (current) =>
                      !current
                  )
                }
                className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                {showAllTech
                  ? t(
                      "technologies.showLess"
                    )
                  : t(
                      "technologies.showMore"
                    )}
              </button>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* ÉQUIPE                                                 */}
        {/* ====================================================== */}

        <section className="bg-white py-20 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="font-semibold uppercase text-dbsOrange">
                {t(
                  "about.teamLabel",
                  {
                    defaultValue:
                      "Les talents derrière DBS Africa",
                  }
                )}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
                {t(
                  "about.teamTitle",
                  {
                    defaultValue:
                      "Notre équipe",
                  }
                )}
              </h2>

              <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-300">
                {t(
                  "about.teamDescription",
                  {
                    defaultValue:
                      "Une équipe multidisciplinaire réunissant expertise technologique, connaissance métier et engagement au service de la transformation digitale en Afrique.",
                  }
                )}
              </p>

            </div>

            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map(
                (member) => (
                  <motion.article
                    key={member.id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                  >

                  <div className="relative h-72 overflow-hidden bg-dbsDark">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`Portrait de ${member.name}`}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dbsDark to-orange-950">
                        <span className="text-5xl font-bold text-white/70">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-dbsOrange">
                        {member.role}
                      </p>
                    </div>
                  </div>

                    <div className="p-6">
                      <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                        {
                          member.description
                        }
                      </p>

                      {(member.email ||
                        member.linkedin) && (
                        <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              aria-label={`Contacter ${member.name}`}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-dbsOrange transition hover:bg-dbsOrange hover:text-white"
                            >
                              <Mail
                                size={
                                  18
                                }
                              />
                            </a>
                          )}

                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`LinkedIn de ${member.name}`}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition hover:bg-blue-700 hover:text-white"
                            >
                              <FaLinkedinIn size={18} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.article>
                )
              )}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* PROMOTEUR                                               */}
        {/* ====================================================== */}

        <section className="bg-dbsLight py-20 dark:bg-gray-900">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2 lg:px-8">
            {/* PHOTO DU PROMOTEUR */}
            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="mx-auto max-w-md overflow-hidden rounded-3xl bg-white p-3 shadow-2xl lg:mx-0">
                <img
                  src={promoterPhoto}
                  alt={t("about.promoter.name")}
                  className="h-[420px] w-full rounded-2xl object-cover object-top"
                />
              </div>
            </motion.div>

            {/* INFORMATIONS DU PROMOTEUR */}
            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
            >
              <p className="font-semibold uppercase tracking-wide text-dbsOrange">
                {t("about.promoter.label")}
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-dbsDark md:text-5xl dark:text-white">
                {t("about.promoter.title")}
              </h2>

              {/* CARTE PROFESSIONNELLE */}
              <div className="relative mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-950">
                {/* BARRE DÉCORATIVE */}
                <div className="h-2 bg-gradient-to-r from-dbsOrange via-orange-500 to-dbsDark" />

                <div className="p-6 md:p-8">
                  {/* IDENTITÉ */}
                  <div className="border-b border-gray-100 pb-6 dark:border-gray-800">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                      {t("about.promoter.expertiseLabel", {
                        defaultValue:
                          "Profil et expertise",
                      })}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-dbsOrange md:text-3xl">
                      {t("about.promoter.name")}
                    </h3>

                    <p className="mt-3 font-semibold leading-relaxed text-dbsDark dark:text-white">
                      {t("about.promoter.role")}
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mt-6 space-y-4">
                    <p className="leading-7 text-gray-600 dark:text-gray-300">
                      {t("about.promoter.description1")}
                    </p>

                    <p className="leading-7 text-gray-600 dark:text-gray-300">
                      {t("about.promoter.description2")}
                    </p>
                  </div>

                  {/* LIENS PROFESSIONNELS */}
                  <div className="mt-7 border-t border-gray-100 pt-6 dark:border-gray-800">
                    <p className="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {t("about.promoter.socialLabel", {
                        defaultValue:
                          "Retrouvez-moi également sur",
                      })}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://www.linkedin.com/in/dobingarvincent"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn - Vincent Dobingar"
                        className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#084f96] hover:shadow-md"
                      >
                        <FaLinkedinIn size={18} />
                        <span>LinkedIn</span>
                      </a>

                      <a
                        href="https://github.com/VincentDobingar"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub - Vincent Dobingar"
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-md"
                      >
                        <SiGithub size={18} />
                        <span>GitHub</span>
                      </a>

                      <a
                        href="https://portfolio-blond-tau-23.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Portfolio - Vincent Dobingar"
                        className="inline-flex items-center gap-2 rounded-full bg-dbsOrange px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-md"
                      >
                        <Globe2 size={18} />
                        <span>Portfolio</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* APPEL À L’ACTION                                       */}
        {/* ====================================================== */}

        <section className="bg-gradient-to-r from-dbsDark to-orange-950 py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center lg:px-8">
            <Users
              className="mx-auto mb-5 text-dbsOrange"
              size={44}
            />

            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              {t(
                "about.finalCtaTitle"
              )}
            </h2>

            <p className="mt-6 text-lg text-gray-300">
              {t(
                "about.finalCtaText"
              )}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                {t(
                  "about.ctaContact"
                )}
              </Link>

              <Link
                to="/quote"
                className="rounded-full border border-white/40 px-8 py-4 font-semibold transition hover:bg-white hover:text-dbsDark"
              >
                {t(
                  "about.ctaQuote"
                )}
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }