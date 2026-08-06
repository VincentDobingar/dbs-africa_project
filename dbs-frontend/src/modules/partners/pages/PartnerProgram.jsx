import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Coins,
  GraduationCap,
  Smartphone,
  Unlock,
  Users,
  UserPlus,
  Building2,
  Rocket,
  FileSignature,
  CheckCircle2,
  Megaphone,
  Code2,
  BarChart3,
  Database,
  Radio,
  ClipboardList,
  Workflow,
  Download,
  ArrowRight,
} from "lucide-react";

import HeroSection from "../../../shared/components/HeroSection";
import Seo from "../../../shared/components/Seo";
import pricingMoneyBg from "../../../assets/images/pricing-money-bg.jpg";

const stats = [
  { value: "7", label: "Pôles d'expertise digitale" },
  { value: "100%", label: "Solutions sur-mesure" },
  { value: "B2B", label: "Entreprises & institutions" },
  { value: "Vous", label: "Notre prochain partenaire" },
];

const benefits = [
  {
    icon: Coins,
    title: "Revenus attractifs",
    text: "Jusqu'à 18% de commission par souscription, plus des primes de performance mensuelles pouvant atteindre +6 points supplémentaires.",
  },
  {
    icon: GraduationCap,
    title: "Formation complète et gratuite",
    text: "Un parcours de formation initiale et continue pour maîtriser nos produits et techniques de vente, sans frais pour vous.",
  },
  {
    icon: Smartphone,
    title: "Outils digitaux clé en main",
    text: "Portail Partenaire, application mobile terrain, supports marketing prêts à l'emploi : tout est fourni.",
  },
  {
    icon: Unlock,
    title: "Liberté et flexibilité",
    text: "Exercez votre activité en toute indépendance, à votre rythme, en complément ou en activité principale.",
  },
];

const commissions = [
  {
    pole: "Marketing Digital",
    apport: "Réseaux sociaux, campagnes Ads, SEO — contrats récurrents",
    rate: "18 %",
  },
  {
    pole: "Développement Web",
    apport: "Sites vitrines, applications, plateformes sur-mesure",
    rate: "15 %",
  },
  {
    pole: "Business Intelligence / Data Analytics",
    apport: "Dashboards, reporting, analyse de données",
    rate: "12 %",
  },
  {
    pole: "Transformation Digitale / Gestion de Projet / Télécom & Mobile Money",
    apport: "Audit, automatisation, PMO, expertise télécom",
    rate: "10 %",
  },
];

const categories = [
  {
    icon: UserPlus,
    name: "Agent Commercial",
    profile: "Personne physique souhaitant exercer une activité commerciale régulière",
    engagement: "Objectifs mensuels convenus, formation obligatoire",
  },
  {
    icon: Users,
    name: "Apporteur d'Affaires",
    profile: "Professionnel en réseau (assureur, comptable, notable local...) orientant des clients ponctuellement",
    engagement: "Aucun volume minimal",
  },
  {
    icon: Building2,
    name: "Distributeur Agréé",
    profile: "Structure disposant de sa propre force de vente",
    engagement: "Volume minimal contractualisé, équipe dédiée",
  },
];

const steps = [
  {
    icon: FileSignature,
    title: "Candidature",
    text: "Remplissez le formulaire d'inscription des partenaires et transmettez vos pièces justificatives.",
  },
  {
    icon: CheckCircle2,
    title: "Validation",
    text: "Notre équipe Partenariats étudie votre dossier sous 5 jours ouvrés.",
  },
  {
    icon: FileSignature,
    title: "Signature",
    text: "Signature du Contrat de Partenariat Commercial et de ses annexes.",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    text: "Parcours de formation initiale sur nos produits, procédures et outils.",
  },
  {
    icon: Rocket,
    title: "Activation",
    text: "Accès au Portail Partenaire et démarrage de votre activité, commissions versées chaque mois.",
  },
];

const services = [
  {
    icon: Workflow,
    title: "Transformation Digitale",
    text: "Audit digital, automatisation des tâches et optimisation des opérations métiers.",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    text: "Réseaux sociaux, campagnes Ads, SEO et création de contenus.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    text: "Dashboards Power BI, reporting automatisé, suivi des KPI.",
  },
  {
    icon: Database,
    title: "Data Analytics",
    text: "Analyse SQL/Excel avancée, contrôle qualité et visualisation des données.",
  },
  {
    icon: Code2,
    title: "Développement Web",
    text: "Sites vitrines, applications React/Node.js, solutions WordPress et API.",
  },
  {
    icon: Radio,
    title: "Télécom & Mobile Money",
    text: "Reporting télécom, analyse des services VAS/MFS, environnements IN.",
  },
  {
    icon: ClipboardList,
    title: "Gestion de Projet",
    text: "PMO, gouvernance projet, suivi des risques et reporting exécutif.",
  },
];

const faqs = [
  {
    question: "Dois-je créer une entreprise pour devenir partenaire ?",
    answer:
      "Non, vous pouvez démarrer en tant que personne physique (catégorie Agent Commercial ou Apporteur d'Affaires). La création d'une structure devient pertinente pour la catégorie Distributeur Agréé.",
  },
  {
    question: "Quand suis-je payé ?",
    answer:
      "Vos commissions sont calculées mensuellement et versées sous 30 jours suivant la clôture du mois, par virement bancaire ou mobile money.",
  },
  {
    question: "Puis-je vendre des produits d'un concurrent en parallèle ?",
    answer:
      "Non, sauf accord écrit préalable de DBS Africa, conformément à la clause de non-concurrence de votre contrat.",
  },
  {
    question: "Que faire en cas de réclamation d'un client ?",
    answer:
      "Contactez immédiatement le Support Partenaires, qui prendra le relais pour le traitement de la réclamation dans les meilleurs délais.",
  },
];

export default function PartnerProgram() {
  const { i18n } = useTranslation();
  const docLang = i18n.language?.startsWith("en") ? "en" : "fr";

  return (
    <div>
      <Seo
        title="Devenez partenaire DBS Africa"
        description="Générez des revenus en distribuant les solutions digitales qui transforment l'Afrique. Découvrez le programme partenaires DBS Africa."
      />

      <HeroSection
        badge="Rejoignez le réseau"
        title="Devenez partenaire DBS Africa"
        description="Générez des revenus en distribuant les solutions digitales qui transforment l'Afrique."
        image={pricingMoneyBg}
      >
        <Link
          to="/partner/register"
          className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          Devenir partenaire
        </Link>

        <Link
          to="/partner/login"
          className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
        >
          Espace partenaire
        </Link>
      </HeroSection>

      {/* STATS */}
      <section className="bg-white py-14 dark:bg-gray-950">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-gray-100 bg-dbsLight p-6 text-center dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="font-heading text-3xl font-bold text-dbsOrange">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS REJOINDRE */}
      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              Pourquoi nous rejoindre
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              Un programme pensé pour votre réussite
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMISSIONS */}
      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              Des produits qui ont de l'impact
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              Nos pôles de service et vos commissions
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left">
              <thead className="bg-dbsOrange text-white">
                <tr>
                  <th className="p-4 font-semibold">Pôle de service</th>
                  <th className="p-4 font-semibold">Ce que vous apportez</th>
                  <th className="p-4 font-semibold">Commission jusqu'à</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((row, index) => (
                  <tr
                    key={row.pole}
                    className={
                      index % 2 === 0
                        ? "bg-dbsLight dark:bg-gray-900"
                        : "bg-white dark:bg-gray-950"
                    }
                  >
                    <td className="p-4 font-semibold text-dbsDark dark:text-white">
                      {row.pole}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {row.apport}
                    </td>
                    <td className="p-4 font-bold text-dbsOrange">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              Le programme partenaires
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              Quelle catégorie de partenaire êtes-vous ?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {category.profile}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-dbsOrange">
                    {category.engagement}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="relative overflow-hidden bg-black py-20 text-white">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-dbsOrange/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              Le parcours
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-dbsOrange/30 bg-dbsOrange/10 text-dbsOrange">
                    <Icon size={20} />
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-dbsOrange">
                    Étape {index + 1}
                  </p>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOS 7 PÔLES */}
      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              Ce que vous allez vendre
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              Nos 7 pôles d'expertise
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-gray-100 bg-dbsLight p-6 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {service.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dbsLight py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-wide text-dbsOrange">
              Questions fréquentes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-5xl dark:text-white">
              Vous avez des questions ?
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
              >
                <summary className="cursor-pointer list-none font-semibold text-dbsDark dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RESSOURCES TÉLÉCHARGEABLES */}
      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <a
              href={`/documents/dbs-africa-brochure-partenaire-${docLang}.pdf`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-dbsLight p-6 transition hover:border-dbsOrange dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                <Download size={22} />
              </div>
              <div>
                <p className="font-bold dark:text-white">
                  {docLang === "fr"
                    ? "Brochure Partenaires"
                    : "Partner Brochure"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {docLang === "fr"
                    ? "Présentation rapide du programme (PDF, FR)"
                    : "Quick program overview (PDF, EN)"}
                </p>
              </div>
            </a>

            <a
              href={`/documents/dbs-africa-guide-partenaire-${docLang}.pdf`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-dbsLight p-6 transition hover:border-dbsOrange dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-dbsOrange dark:bg-orange-500/15">
                <Download size={22} />
              </div>
              <div>
                <p className="font-bold dark:text-white">
                  {docLang === "fr"
                    ? "Guide du Partenaire"
                    : "Partner Guide"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {docLang === "fr"
                    ? "Le guide complet (13 pages, PDF, FR)"
                    : "The complete guide (13 pages, PDF, EN)"}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-dbsDark py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Prêt à démarrer ?
          </h2>
          <p className="mt-5 text-lg text-gray-300">
            Rejoignez le réseau des Partenaires Commerciaux DBS Africa dès
            aujourd'hui.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/partner/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              Devenir partenaire
              <ArrowRight size={18} />
            </Link>

            <a
              href="mailto:partenaires@dbs-africa.org"
              className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-dbsDark"
            >
              partenaires@dbs-africa.org
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
